require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

type payload = {
    userId: number
}
export const toJWT = (payload: payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '72h' });
}

export const toData = (token: string): payload => {
    return jwt.verify(token, jwtSecret);
}