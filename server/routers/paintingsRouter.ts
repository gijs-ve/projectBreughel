import { Router, Request, Response } from 'express';
import { messages } from '../utility/messages';
const Painters = require('../models/').painters;
const Paintings = require('../models/').paintings;
const PaintingFilters = require('../models/').paintingfilters;
const Filters = require('../models/').filters;
const Favorites = require('../models/').favorites;
const router = new Router();

router.get('/getFilters', async (req: Request, res: Response, next) => {
    try {
        const filters = await Filters.findAll();
        if (!filters) {
            return res.status(400).send({ message: 'Geen filters gevonden' });
        }
        return res.status(200).send({
            message: 'Succesfully received filters',
            filters: filters,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.get('/getPaintings', async (req: Request, res: Response, next) => {
    try {
        const paintings = await Paintings.findAll({
            where: { isApproved: true },
        });
        const filters = await Filters.findAll();
        return res.status(200).send({
            message: 'Alle schilderijen opgehaald en filters opgehaald',
            paintings: paintings,
            filters: filters,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.get(
    '/getPaintingById/:id',
    async (req: Request, res: Response, next) => {
        try {
            const { id } = req.params;
            const foundPainting = await Paintings.findOne({
                where: { id, isApproved: true },
                attributes: [
                    'id',
                    'name',
                    'width',
                    'height',
                    'price',
                    'isSold',
                ],
                include: [
                    { model: Painters, attributes: ['name', 'id'] },
                    { model: PaintingFilters, include: { model: Filters } },
                ],
            });
            return res.status(200).send({
                message: `Succesfully found painting with id ${id}`,
                painting: foundPainting,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: messages.serverError });
        }
    },
);

router.get('/getFavorites', async (req: Request, res: Response, next) => {
    try {
        const favorites = await Favorites.findAll({
            include: [{ model: Paintings }],
        });
        return res.status(200).send({
            message: 'Alle schilderijen opgehaald',
            favorites: favorites,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

module.exports = router;
