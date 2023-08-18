

const loginForm = (req, res) => {
    res.render("auth/login.pug",{

    });
};

const registerForm = (req, res) => {
    res.render("auth/register.pug",{
        
    });
};

export {
    loginForm,
    registerForm
}