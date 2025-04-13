
import User from '../models/user.model.js'
import { sendEmailConfirmation } from '../helpers/emails.js'


const loginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Inicia sesión',
    })
}

const registerPage = (req, res) => {
    res.render('auth/register', {
        title: 'Crea tu cuenta',
        csrfToken: req.csrfToken(),
    })
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    sendEmailConfirmation({
        email: user.email,
        name: user.name,
        token: user.token
    })
    res.render('auth/confirm-email', {
        title: `¡Bienvenido ${user.name}!`,
        msg: 'Confirma tu cuenta para poder iniciar sesión, sigue los pasos del correo.'
    })
}

const confirmEmail = async (req, res) => {
    const { token } = req.params
    const user = await User.tryConfirmUser(token)
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
}

const forgotPasswordPage = (req, res) => {
    res.render('auth/forgot-password', {
        title: 'Recupera tu contraseña',
    })
}

export {
    loginPage,
    registerPage,
    register,
    confirmEmail,
    forgotPasswordPage,
}