import { body, validationResult } from 'express-validator'

import { userByEmail } from '../services/auth.service.js';

const validateLogin =[
    body('email')
        .notEmpty()
        .withMessage('El correo eléctronico es obligatorio.')
        .isEmail()
        .withMessage('El correo eléctronico no es válido.')
        .custom(async (value) => {
            const user = await userByEmail(value)
            if (!user) throw new Error('No hay cuentas con este correo.');
            if (!user.confirmed) throw new Error('El correo eléctronico no ha sido confirmado.');
        }),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.'),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/login', {
                page: 'Inicia sesión',
                errors: errors.array(),
                old: {
                    email: req.body.email,
                },
                csrfToken: req.csrfToken(),
            })
        }
        next()
    }
]

const validateRegister = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio.')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres.'),
    body('email')
        .notEmpty()
        .withMessage('El correo eléctronico es obligatorio.')
        .isEmail()
        .withMessage('El correo eléctronico no es válido.')
        .custom(async (value) => {
            const user = await userByEmail(value)
            if (user) throw new Error('El correo eléctronico ya está en uso.');
        }),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('confirm_password')
        .notEmpty()
        .withMessage('La confirmación de la contraseña es obligatoria.')
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage('Las contraseñas no coinciden.'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/register', {
                page: 'Crea tu cuenta',
                errors: errors.array(),
                old: {
                    name: req.body.name,
                    email: req.body.email,
                },
                csrfToken: req.csrfToken(),
            })
        }
        next()
    }

]

const validateForgotPassword = [
    body('email')
        .notEmpty()
        .withMessage('El correo eléctronico es obligatorio.')
        .isEmail()
        .withMessage('El correo eléctronico no es válido.')
        .custom(async (value) => {
            const user = await userByEmail(value)
            if (!user) throw new Error('No hay cuentas con este correo.');
        }),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/forgot-password', {
                page: 'Recupera tu contraseña',
                errors: errors.array(),
                csrfToken: req.csrfToken(),
            })
        }
        next()
    }
]

const validateResetPassword = [
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
    
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('auth/reset-password', {
                page: 'Recupera tu contraseña',
                errors: errors.array(),
                csrfToken: req.csrfToken(),
            })
        }
        next()
    }


]

export {
    validateLogin,
    validateRegister,
    validateForgotPassword,
    validateResetPassword
}