import { Router, Request, Response } from 'express';
import { auth as authMiddleware } from '../middleware/auth';
import { admin as adminMiddleware } from '../middleware/admin';
const Filters = require('../models/').filters;
const Paintings = require('../models').paintings;

const router = new Router();

router.get('/getFilters', async (req: Request, res: Response, next) => {
    try {
        const filters = await Filters.findAll();
        if (!filters) {
            return res.status(400).send({ message: 'No filters were found' });
        }
        return res.status(200).send({
            message: 'Succesfully received filters',
            filters: filters,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
});

router.post(
    '/postPainting',
    [authMiddleware, adminMiddleware],
    async (req: Request, res: Response, next) => {
        try {
            const { painting } = req.body;
            if (!painting) return;
            const newPainting = await Paintings.create({ painting });
            return res
                .status(200)
                .send({ message: 'Succesfully added painting' }, newPainting);
        } catch (error) {
            console.log(error);
        }
    },
);

module.exports = router;
