import { Router } from 'express';
import { io } from '../../server';
import { db } from '../../db';

const messagesRouter = Router();

messagesRouter.get('/', async (req, res, next) => {
	try {
		const result = await db.messages.getAll();
		// sort newest messages to top
		result.sort((a, b) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		});
		res.json(result);
	} catch (error) {
		next(error);
	}
});

messagesRouter.post('/', async (req, res, next) => {
	try {
		const messageDTO = { ...req.body };
		const insertedData = await db.messages.insert(messageDTO);
		io.emit('new-message', insertedData);
		res.json({ msg: 'insert successful', insertedData });
	} catch (error) {
		next(error);
	}
});

export { messagesRouter };
