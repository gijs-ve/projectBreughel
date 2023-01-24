require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

export const toJWT = (data: string) => {
    return jwt.sign(data, jwtSecret, { expiresIn: '72h' });
}

export const toData = (token: string) => {
    return jwt.verify(token, jwtSecret);
}