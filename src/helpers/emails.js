import mail from '../config/mail.js';

const sendEmailConfirmation = async (data) => {
    const { email, name, token } = data;
    const APP_URL = process.env.APP_URL
    const APP_PORT = process.env.APP_PORT
    await mail.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices',
        text: '¡Bienvenido a BienesRaices!',
        html: `<p>Hola ${name}, confirma tu cuenta en BienesRaices.</p>
        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
        <a href="${APP_URL}:${APP_PORT ?? ''}/auth/confirm-email/${token}">Confirmar cuenta</a>
        <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `
    })
}

const sendEmailPasswordReset = async (data) => {
    const { email, name, token } = data;
    const APP_URL = process.env.APP_URL
    const APP_PORT = process.env.APP_PORT
    await mail.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Reestablece tu contraseña en BienesRaices',
        text: 'Pronto podrás iniciar sesión',
        html: `<p>Hola ${name}, sigue las instrucciones para reestablecer tu contraseña.</p>
        <p>Para reestablecer tu contraseña solo ingresa al siguiente enlace:</p>
        <a href="${APP_URL}:${APP_PORT ?? ''}/auth/forgot-password/${token}">Reestablecer contraseña</a>
        <p>Si no solicitaste este reestablecimiento, puedes ignorar este mensaje.</p>
        `
    })
}

export {
    sendEmailConfirmation,
    sendEmailPasswordReset
}