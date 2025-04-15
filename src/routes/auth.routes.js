import { Router } from 'express'

import { loginPage, registerPage, register, confirmEmail, forgotPasswordPage, resetPassword, checkToken, newPassword } from '../controllers/auth.controller.js'
import { validateRegister, validateForgotPassword, validateResetPassword } from '../validators/auth.validator.js'

const router = Router()

router.get('/login', loginPage)
router.get('/register', registerPage)
router.post('/register', validateRegister, register)
router.get('/confirm-email/:token', confirmEmail)

router.get('/forgot-password', forgotPasswordPage)
router.post('/forgot-password', validateForgotPassword, resetPassword)
router.get('/forgot-password/:token', checkToken)
router.post('/forgot-password/:token', validateResetPassword, newPassword)



// router.get('/test', (req, res) => res.render('auth/confirm-email'))

export default router