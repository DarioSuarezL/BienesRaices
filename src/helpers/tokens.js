const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);

export {
    generateToken
}
