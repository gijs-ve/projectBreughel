import { messages } from '../utility/messages';
import { Router, Request, Response } from 'express';
import { auth as authMiddleware } from '../middleware/auth';
import { admin as adminMiddleware } from '../middleware/admin';
import { capitaliseFirstLetter } from '../utility/functions';
const Paintings = require('../models/').paintings;
const Filters = require('../models/').filters;

const router = new Router();

//---Painting related---//
router.post(
    '/postPainting',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { painting } = data;
            const newPainting = await Paintings.create({
                name: painting.name,
                painterId: 1,
                width: painting.width,
                height: painting.length,
                price: painting.price,
                isApproved: false,
                isPurchaseable: false,
                isSold: false,
            });
            return res.status(200).send({
                message: 'Succesfully added painting',
                painting: newPainting,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.post(
    '/getAllPaintings',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const allPaintings = Paintings.findAll();
            return res.status(200).send({
                message: 'Succesfully sent all paintings to admin',
                paintings: allPaintings,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

//---Filter related---//
router.post(
    '/postFilter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const filter = capitaliseFirstLetter(req.body.data.filter);
            console.log(filter);
            const foundFilter = await Filters.findOne({
                where: { name: filter },
            });
            if (foundFilter) {
                return res
                    .status(400)
                    .send({ message: 'Filter is already in use' });
            }
            const newFilter = await Filters.create({ name: filter });
            return res.status(200).send({
                message: 'Succesfully added filter',
                filter: newFilter,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.delete(
    '/deleteFilter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { filterId } = req.body;
            const foundFilter = await Filters.findOne({
                where: { id: filterId },
            });
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
            return res.status(400).send({ message: messages.serverError });
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
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

module.exports = router;
