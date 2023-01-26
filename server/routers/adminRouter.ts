import { Router, Request, Response } from 'express';
import { auth as authMiddleware } from '../middleware/auth';
import { admin as adminMiddleware } from '../middleware/admin';
import { capitaliseFirstLetter } from '../utility/functions';
const Filters = require('../models/').filters;

const router = new Router();

router.post(
    '/postFilter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const filter = capitaliseFirstLetter(req.body.filter);
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
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { filterId } = req.body;
            const foundFilter = Filters.findOne({ where: { id: filterId } });
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

router.patch(
    '/updateFilter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { filterId } = req.body;
            const filter = capitaliseFirstLetter(req.body.filter);
            const foundFilterByName = Filters.findOne({
                where: { name: filter },
            });
            if (foundFilterByName) {
                return res
                    .status(400)
                    .send({ message: 'Filter is already in use' });
            }
            const foundFilterById = Filters.findOne({
                where: { id: filterId },
            });
            if (!foundFilterById) {
                return res
                    .status(400)
                    .send({ message: 'Filter does not exist' });
            }
            foundFilterById.name = filter;
            await foundFilterById.save();
            return res
                .status(200)
                .send({ message: 'Succesfully updated filter' });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .send({ message: 'Something went wrong, sorry' });
        }
    },
);

module.exports = router;
