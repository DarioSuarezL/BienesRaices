import { Router } from 'express'

import { loginPage, registerPage, register, forgotPasswordPage } from '../controllers/auth.controller.js'

const router = Router()

router.get('/login', loginPage)
router.get('/register', registerPage)
router.post('/register', register)
router.get('/forgot-password', forgotPasswordPage)

export default router