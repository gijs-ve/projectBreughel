import { Router, Request, Response } from 'express';
import { messages } from '../utility/messages';
import { Filter } from '../../types/types';
const Painters = require('../models/').painters;
const Paintings = require('../models/').paintings;
const PaintingFilters = require('../models/').paintingfilters;
const Filters = require('../models/').filters;
const Favorites = require('../models/').favorites;
const { Op } = require('sequelize');
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

router.get('/getPaintings/:page', async (req: Request, res: Response, next) => {
    try {
        const { page } = req.params;
        const offset = Number(page) * 10 - 10;
        const paintings = await Paintings.findAll({
            where: { isApproved: true },
            offset,
        });
        return res.status(200).send({
            message: 'Schilderijen en filters opgehaald',
            paintings: paintings,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: messages.serverError });
    }
});

router.post(
    '/getPaintings/filter',
    async (req: Request, res: Response, next) => {
        try {
            const { data } = req.body;
            const { filters, offset } = data;
            const paintings = await Paintings.findAll({
                where: { isApproved: true },
                offset,
                include: [
                    { model: Painters, attributes: ['name', 'id'] },
                    {
                        model: PaintingFilters,
                        include: {
                            model: Filters,
                            where: { id: { [Op.and]: filters } },
                        },
                    },
                ],
            });
            return res.status(200).send({
                message: 'Schilderijen op basis van filterse opgehaald',
                paintings: paintings,
            });
        } catch (error) {}
    },
);

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
                message: `Schilderij gevonden met het volgende id ${id}`,
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
