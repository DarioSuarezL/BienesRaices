
import { createUser, confirmUser, generatePasswordToken, userByToken, updatePassword } from '../services/auth.service.js'


const loginPage = (req, res) => {
    return res.render('auth/login', {
        title: 'Inicia sesión',
    })
}

const registerPage = (req, res) => {
    return res.render('auth/register', {
        title: 'Crea tu cuenta',
        csrfToken: req.csrfToken(),
    })
}

const register = async (req, res) => {
    try{
        const user = await createUser(req.body)
        return res.render('auth/confirm-email', {
            title: `¡Bienvenido ${user.name}!`,
            msg: 'Confirma tu cuenta para poder iniciar sesión, sigue los pasos del correo.'
        })
    }catch (error) {
        return res.render('auth/register', {
            title: 'Crea tu cuenta',
            errors: [{msg:'¡UPS! Algo salió mal.'}, { msg: error }],
            old: {
                name: req.body.name,
                email: req.body.email,
            },
            csrfToken: req.csrfToken(),
        })
    }

}

const confirmEmail = async (req, res) => {
    try{
        const { token } = req.params
        const user = await confirmUser(token)
        if (!user) {
            return res.render('auth/confirm-email', {
                title: 'Error al confirmar tu cuenta',
                msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
            })
        }
    
        return res.render('auth/confirm-email', {
            title: `¡Bienvenido ${user.name}!`,
            msg: 'Tu cuenta ha sido confirmada, ya puedes iniciar sesión.',
        })
    }catch (error) {
        return res.render('auth/confirm-email', {
            title: 'Error al confirmar tu cuenta',
            msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
        })
    }
}

const forgotPasswordPage = (req, res) => {
    return res.render('auth/forgot-password', {
        title: 'Recupera tu contraseña',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async (req, res) => {
    const user = await generatePasswordToken(req.body.email)
    return res.render('auth/confirm-email', {
        title: 'Reestablece tu contraseña',
        msg: 'Sigue los pasos del correo que te hemos enviado para reestablecer tu contraseña.',
    })
}

const checkToken = async (req, res) => {
    const { token } = req.params
    const user = await userByToken(token)
    if (!user) {
        return res.render('auth/confirm-email', {
            title: 'Error al reestablecer tu contraseña',
            msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
        })
    }

    return res.render('auth/reset-password', {
        title: 'Reestablece tu contraseña',
        csrfToken: req.csrfToken(),
        // token,
    })

}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    await updatePassword(token, password)

    return res.render('auth/confirm-email', {
        title: 'Reestablece tu contraseña',
        msg: 'Tu contraseña ha sido reestablecida, ya puedes iniciar sesión.',
    })

}

export {
    loginPage,
    registerPage,
    register,
    confirmEmail,
    forgotPasswordPage,
    resetPassword,
    checkToken,
    newPassword
}