const Users = require('../models').users;
import { toData } from './jwt';

export async function admin(req, res, next) {
    try {
        if (!req.user.isAdmin)
            return res.status(403).send({
                message: 'No access.',
            });
        console.log('Admin authorized:', req.user.name);
        return next();
    } catch (error) {
        console.log('ERROR IN ADMIN MIDDLEWARE', error);
    }
}
