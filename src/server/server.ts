import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { allRoutes } from './routes';
import type { Request, Response, NextFunction } from 'express';
import type { HTTPError } from './types';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketIOServer(httpServer, {
	cors: {
		origin: 'http://localhost:8000',
		methods: ['GET', 'POST']
	}
});

if (isDevelopment) {
	app.use(cors());
}

if (isProduction) {
	app.use(express.static('public'));
}

app.use(express.json());
app.use(morgan('dev'));
app.use(allRoutes);

// 404 fallback for client side routing
if (isProduction) {
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: 'public' });
	});
}

// 404 error handler
app.use((req, res, next) => {
	const error = new Error(`path ${req.originalUrl} not found`) as HTTPError;
	error['status'] = 404;
	next(error);
});

// global error handler
app.use((error: HTTPError, req: Request, res: Response, next: NextFunction) => {
	console.log(error.message);
	res.status(error['status'] || 500);
	res.json({ error: { message: error.message } });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };