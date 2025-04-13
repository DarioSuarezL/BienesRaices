import { body, validationResult } from 'express-validator'

import User from '../models/user.model.js'

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
            const user = await User.findByEmail(value)
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
            res.render('auth/register', {
                title: 'Crea tu cuenta',
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


export {
    validateRegister
}