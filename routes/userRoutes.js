import express from "express";
import { loginForm, registerForm, PasswordForm } from "../controller/userController.js";

const router = express.Router();

router.get("/login", loginForm);
router.get("/register", registerForm);
router.get("/password-recovery", PasswordForm);


export default router;