import { authenticateUser, createUser, confirmUser, generatePasswordToken, userByToken, updatePassword } from '../services/auth.service.js'
import { generateJWT } from '../helpers/tokens.js'


const loginPage = (req, res) => {
    return res.render('auth/login', {
        page: 'Inicia sesión',
        csrfToken: req.csrfToken(),
    })
}

const login = async (req, res) => {
    const user = await authenticateUser(req.body)
    if (!user) {
        return res.render('auth/login', {
            page: 'Inicia sesión',
            errors: [{msg:'Contraseña incorrecta.'}],
            old: {
                email: req.body.email,
            },
            csrfToken: req.csrfToken(),
        })
    }

    const token = generateJWT({
        id: user.id,
        name: user.name,
    })

    return res.cookie('_token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    }).redirect('/estates')

}

const registerPage = (req, res) => {
    return res.render('auth/register', {
        page: 'Crea tu cuenta',
        csrfToken: req.csrfToken(),
    })
}

const register = async (req, res) => {
    try{
        const user = await createUser(req.body)
        return res.render('auth/message', {
            page: `¡Bienvenido ${user.name}!`,
            msg: 'Confirma tu cuenta para poder iniciar sesión, sigue los pasos del correo.'
        })
    }catch (error) {
        return res.render('auth/register', {
            page: 'Crea tu cuenta',
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
            return res.render('auth/message', {
                page: 'Error al confirmar tu cuenta',
                msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
            })
        }
    
        return res.render('auth/message', {
            page: `¡Bienvenido ${user.name}!`,
            msg: 'Tu cuenta ha sido confirmada, ya puedes iniciar sesión.',
        })
    }catch (error) {
        return res.render('auth/message', {
            page: 'Error al confirmar tu cuenta',
            msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
        })
    }
}

const forgotPasswordPage = (req, res) => {
    return res.render('auth/forgot-password', {
        page: 'Recupera tu contraseña',
        csrfToken: req.csrfToken(),
    })
}

const forgotPassword = async (req, res) => {
    await generatePasswordToken(req.body.email)
    return res.render('auth/message', {
        page: 'Reestablece tu contraseña',
        msg: 'Sigue los pasos del correo que te hemos enviado para reestablecer tu contraseña.',
    })
}

const checkToken = async (req, res) => {
    try {
        const { token } = req.params
        const user = await userByToken(token)
        if (!user) {
            return res.render('auth/message', {
                page: 'Error al reestablecer tu contraseña',
                msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
            })
        }
    
        return res.render('auth/reset-password', {
            page: 'Reestablece tu contraseña',
            csrfToken: req.csrfToken(),
        })
    } catch (error) {
        return res.render('auth/message', {
            page: 'Error al reestablecer tu contraseña',
            msg: 'Token no válido o expirado, si crees que se trata de un error, contáctanos.',
        })
    }
}

const resetPassword = async (req, res) => {
    try{
        const { token } = req.params
        const { password } = req.body
        await updatePassword(token, password)
        return res.render('auth/message', {
            page: 'Reestablece tu contraseña',
            msg: 'Tu contraseña ha sido reestablecida, ya puedes iniciar sesión.',
        })
    }catch(error) {
        return res.render('auth/reset-password', {
            page: 'Reestablece tu contraseña',
            errors: [{msg:'¡UPS! Algo salió mal.'}, { msg: error }],
            csrfToken: req.csrfToken(),
        })
    }

}

export {
    loginPage,
    login,
    registerPage,
    register,
    confirmEmail,
    forgotPasswordPage,
    forgotPassword,
    checkToken,
    resetPassword
}