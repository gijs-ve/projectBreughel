const Users = require('../models').users;
import { toData } from './jwt';
import { messages } from '../utility/messages';

export async function auth(req, res, next) {
    const auth =
        req.headers.authorization && req.headers.authorization.split(' ');

    if (!auth || !(auth[0] === 'Bearer') || !auth[1]) {
        return res.status(401).send({
            message:
                'This endpoint requires an Authorization header with a valid token',
        });
    }
    try {
        const payload = toData(auth[1]);
        const user = await Users.findByPk(payload.userId);
        if (!user) {
            return res
                .status(404)
                .send({ message: 'Opgegeven gebruiker bestaat niet' });
        }
        req.user = user;
        return next();
    } catch (error) {
        console.log('ERROR IN AUTH MIDDLEWARE', error);

        switch (error.name) {
            case 'TokenExpiredError':
                return res
                    .status(401)
                    .send({ error: error.name, message: error.message });

            case 'JsonWebTokenError':
                return res
                    .status(400)
                    .send({ error: error.name, message: error.message });

            default:
                return res.status(400).send({
                    message: messages.serverError,
                });
        }
    }
}
