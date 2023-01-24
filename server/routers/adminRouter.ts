import { Router, Request, Response } from 'express';
const authMiddleware = require('../auth/middleware');
const Users = require('../models/').users;
const Filters = require('../models/').filters;

const router = new Router();

router.post(
    '/postFilter',
    authMiddleware,
    async (req: Request, res: Response, next) => {
        try {
            const { filter } = req.body;
            const foundFilter = Filters.findOne({ where: { name: filter } });
            if (foundFilter) {
                return res
                    .status(400)
                    .send({ message: 'Filter is already in use' });
            }
            const newFilter = Filters.create({ name: filter });
            return res.status(200).send({
                message: 'Succesfully added filter',
                filter: newFilter,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .send({ message: 'Something went wrong, sorry' });
        }
    },
);

router.delete(
    '/deleteFilter',
    authMiddleware,
    async (req: Request, res: Response, next) => {
        try {
            const { filter } = req.body;
            const foundFilter = Filters.findOne({ where: { name: filter } });
            if (!foundFilter) {
                return res
                    .status(400)
                    .send({ message: 'Filter does not exist' });
            }
            await foundFilter.destroy();
            return res
                .status(200)
                .send({ message: 'Succesfully deleted filter' });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .send({ message: 'Something went wrong, sorry' });
        }
    },
);

module.exports = router;
