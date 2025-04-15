import bcrypt from 'bcrypt'

import User from '../models/user.model.js'
import { sendEmailConfirmation, sendEmailPasswordReset } from '../helpers/emails.js'
import { generateToken } from '../helpers/tokens.js'

const userByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const userByToken = async (token) => {
    return await User.findOne({ where: { token } })
}

const createUser = async (data) => {
    const user =  await User.create(data)
    await sendEmailConfirmation({
        email: user.email,
        name: user.name,
        token: user.token
    })
    return user;

}

const confirmUser = async (token) => {
    const user = await User.findOne({ where: { token } })
    if (user) user.update({ confirmed: true, token: null })
    return user;
}

const generatePasswordToken = async (email) => {
    const user = await User.findOne({ where: { email } })
    user.update({token: generateToken()})
    await sendEmailPasswordReset({
        email: user.email,
        name: user.name,
        token: user.token
    })
    return user;
}

const updatePassword = async (token, password) => {
    const user = await User.findOne({ where: { token } })
    if (user){
        const salt = await bcrypt.genSaltSync(10);
        const hashed_password = await bcrypt.hash(password, salt);
        user.update({ password: hashed_password, token: null })
    }
    return user;
}

export {
    userByEmail,
    userByToken,
    createUser,
    confirmUser,
    generatePasswordToken,
    updatePassword
}