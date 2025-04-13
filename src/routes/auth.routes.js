import { Router } from 'express'

import { loginPage, registerPage, register, confirmEmail, forgotPasswordPage } from '../controllers/auth.controller.js'
import { validateRegister } from '../validators/auth.validator.js'

const router = Router()

router.get('/login', loginPage)
router.get('/register', registerPage)
router.post('/register', validateRegister, register)
router.get('/forgot-password', forgotPasswordPage)
router.get('/confirm-email/:token', confirmEmail)

// router.get('/test', (req, res) => res.render('auth/confirm-email'))

export default router