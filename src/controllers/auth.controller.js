import User from '../models/user.model.js'


const loginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Inicia sesión',
    })
}

const registerPage = (req, res) => {
    res.render('auth/register', {
        title: 'Crea tu cuenta',
    })
}

const register = async (req, res) => {
    const user = await User.create(req.body)
    // TODO: VALIDATORS O MIDDLEWARES
    res.json(user)
}

const forgotPasswordPage = (req, res) => {
    res.render('auth/forgot-password', {
        title: 'Recupera tu contraseña',
    })
}

export {
    loginPage,
    registerPage,
    forgotPasswordPage,
    register
}