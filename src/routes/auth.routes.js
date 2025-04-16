import { Router } from 'express'

import { loginPage, login, registerPage, register, confirmEmail, forgotPasswordPage, forgotPassword, checkToken, resetPassword } from '../controllers/auth.controller.js'
import { validateLogin, validateRegister, validateForgotPassword, validateResetPassword } from '../validators/auth.validator.js'

const router = Router()

router.get('/login', loginPage)
router.post('/login', validateLogin, login)

router.get('/register', registerPage)
router.post('/register', validateRegister, register)
router.get('/confirm-email/:token', confirmEmail)

router.get('/forgot-password', forgotPasswordPage)
router.post('/forgot-password', validateForgotPassword, forgotPassword)
router.get('/forgot-password/:token', checkToken)
router.post('/forgot-password/:token', validateResetPassword, resetPassword)



// router.get('/test', (req, res) => res.render('auth/confirm-email'))

export default router