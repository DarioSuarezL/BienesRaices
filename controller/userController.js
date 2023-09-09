

const loginForm = (req, res) => {
    res.render("auth/login",{
        title: "Iniciar sesión"
    });
};

const registerForm = (req, res) => {
    res.render("auth/register",{
        title: "Crear cuenta"
    });
};

const PasswordForm = (req, res) => { //Olvidé mi contraseña
    res.render("auth/password-recovery",{
        title: "Olvidé mi contraseña"
    });
};

export {
    loginForm,
    registerForm,
    PasswordForm
}