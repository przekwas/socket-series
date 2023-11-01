import { Router } from 'express';
import { io } from '../../server';
import { db } from '../../db';

const matchesRouter = Router();

matchesRouter.get('/', async (req, res, next) => {
	try {
		const result = await db.matches.getAll();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

matchesRouter.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const updates = req.body;
	try {
		const updatedMatch = await db.matches.update(Number(id), {
			...updates,
			status: 'finished'
		});
		io.emit('match-update', updatedMatch);
		res.json({ msg: 'Match updated successfully', updatedMatch });
	} catch (error) {
		next(error);
	}
});

export { matchesRouter };
