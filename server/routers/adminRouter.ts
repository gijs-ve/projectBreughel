import { Filter } from '../../types/types';
import { messages } from '../utility/messages';
import { Router, Request, Response } from 'express';
import { auth as authMiddleware } from '../middleware/auth';
import { admin as adminMiddleware } from '../middleware/admin';
import { capitaliseFirstLetter } from '../utility/functions';
const Painters = require('../models/').painters;
const Paintings = require('../models/').paintings;
const PaintingFilters = require('../models/').paintingfilters;
const Filters = require('../models/').filters;

const router = new Router();

//---Painting related---//

router.get(
    '/getPaintingById/:id',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { id } = req.params;
            const foundPainting = await Paintings.findOne({
                where: { id },
                include: [
                    { model: Painters, attributes: ['name', 'id'] },
                    { model: PaintingFilters, include: { model: Filters } },
                ],
            });
            const painters = await Painters.findAll({
                attributes: ['name', 'id'],
            });
            const filters = await Filters.findAll({
                attributes: ['name', 'id'],
            });
            return res.status(200).send({
                message: `Succesfully found painting with id ${id}`,
                painting: foundPainting,
                painters: painters,
                filters: filters,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);
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
    '/postFilterPainting',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { paintingId, filters } = data;
            const rawFilters = await PaintingFilters.findAll({
                where: { paintingId },
            });
            const foundFilters = rawFilters.map((i: any) => {
                return i.dataValues.filterId;
            });
            const bulkArray = filters
                .filter((i: Filter) => {
                    if (!foundFilters.includes(i.id)) {
                        return true;
                    }
                    return false;
                })
                .map((i: Filter) => {
                    return { paintingId, filterId: i.id };
                });
            await PaintingFilters.bulkCreate(bulkArray);
            const newPainting = await Paintings.findOne({
                where: { id: paintingId },
                include: [
                    { model: Painters, attributes: ['name', 'id'] },
                    { model: PaintingFilters, include: { model: Filters } },
                ],
            });
            return res.status(200).send({
                message: 'Filter(s) toegevoegd aan schilderij',
                painting: newPainting,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);
router.post(
    '/changeApprovedStatus',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { paintingId } = data;
            const changedPainting = await Paintings.findOne({
                where: { id: paintingId },
            });
            changedPainting.isApproved = !changedPainting.isApproved;
            await changedPainting.save();
            return res.status(200).send({
                message: 'Succesfully updated painting',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.get(
    '/getAllPaintings',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const allPaintings = await Paintings.findAll();
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
    '/editFilter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { filterId, newFilterName } = data;

            console.log(filterId);
            console.log(newFilterName);
            const filter = capitaliseFirstLetter(newFilterName);
            const foundFilterByName = await Filters.findOne({
                where: { name: newFilterName },
            });
            if (foundFilterByName) {
                return res
                    .status(400)
                    .send({ message: 'Filter is already in use' });
            }
            const foundFilterById = await Filters.findOne({
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
