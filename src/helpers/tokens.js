import jwt from "jsonwebtoken";

const generateJWT = (data) => {
    const { id, name } = data
    const JWT_SECRET = process.env.JWT_SECRET || 'secret'
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'
    return jwt.sign({ id, name }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);

export {
    generateJWT,
    generateToken
}
