import { Request, Response, Router } from 'express';

import { Filter } from '../../types/types';
import { admin as adminMiddleware } from '../middleware/admin';
import { auth as authMiddleware } from '../middleware/auth';
import { capitaliseFirstLetter } from '../utility/functions';
import { messages } from '../utility/messages';

const Painters = require('../models/').painters;
const Paintings = require('../models/').paintings;
const PaintingFilters = require('../models/').paintingfilters;
const Filters = require('../models/').filters;
const Favorites = require('../models/').favorites;
const Images = require('../models/').paintingimages;
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
                    { model: Images, attributes: ['id', 'url'] },
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
router.patch(
    '/editPaintingById/:id',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { id } = req.params;
            const { painting } = req.body.data;
            const foundPainting = await Paintings.findOne({
                where: { id },
            });
            console.log(painting);
            const newPainting = await foundPainting.update({
                name: painting.name,
                painterId: painting.painterId,
                width: painting.width,
                height: painting.height,
                price: painting.price,
                isApproved: painting.isApproved,
                isPurchaseable: painting.isPurchaseable,
                isSold: painting.isSold,
            });
            return res.status(200).send({
                message: `Succesfully found painting with id ${id}`,
                painting: newPainting,
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
                painterId: 15,
                width: painting.width,
                height: painting.height,
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
            const allPaintings = await Paintings.findAll({
                include: [
                    { model: Painters, attributes: ['name', 'id'] },
                    { model: PaintingFilters, include: { model: Filters } },
                ],
            });
            const allFavorites = await Favorites.findAll();
            return res.status(200).send({
                message: 'Succesfully sent all paintings to admin',
                paintings: allPaintings,
                favorites: allFavorites,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

//---Painter related---//
router.post(
    '/postPainter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { name } = data;
            console.log('NAME', name);
            const newPainter = await Painters.create({ name });
            console.log(newPainter);
            return res
                .status(200)
                .send({ message: 'Succesfully created new painter' });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.post(
    '/getPainters',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const allPainters = await Painters.findAll();
            return res.status(200).send({
                message: 'Succesfully created new painter',
                painters: allPainters,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.post(
    '/deletePainter',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { id } = req.body.data;
            const foundPainter = await Painters.findOne({ where: { id } });
            await foundPainter.delete();
            return res.status(200).send({
                message: 'Succesfully deleted painter',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

//---Favorites related---//
router.post(
    '/toggleFavorite',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { paintingId } = data;
            const foundFavorite = await Favorites.findOne({
                where: { id: paintingId },
            });
            if (!foundFavorite) {
                const newFavorite = await Favorites.create({ paintingId });
                return res.status(200).send({
                    message: 'Schilderij verschijnt nu op voorpagina!',
                    favorite: newFavorite,
                });
            }
            if (foundFavorite) {
                await foundFavorite.destroy();
                return res
                    .status(200)
                    .send({ message: 'Schilderij niet langer op voorpagina!' });
            }
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
