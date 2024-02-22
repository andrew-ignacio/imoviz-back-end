import { PrismaClient } from '@prisma/client';
import express from 'express';
import { body, validationResult } from 'express-validator';

const propertiesRouter = express.Router();
const prisma = new PrismaClient();

propertiesRouter.get('/', async (req, res) => {
	const properties = await prisma.property.findMany();
	res.json(properties);
});

propertiesRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const property = await prisma.property.findUnique({
		where: {
			id: id,
		},
	});

	if (!property) {
		res.status(404);
		res.json({
			error: 'Nenhum imóvel encontrado com o ID fornecido.',
		});
		return;
	}

	res.json(property);
});

propertiesRouter.post(
	'/',
	[
		body('name').notEmpty().withMessage('Campo nome é obrigatório.'),
		body('url').notEmpty().withMessage('Campo url é obrigatório.'),
		body('latitude').notEmpty().withMessage('Campo latitude é obrigatório.'),
		body('longitude').notEmpty().withMessage('Campo longitude é obrigatório.'),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		const { name, url, value, image, latitude, longitude } = req.body;

		const property = await prisma.property.create({
			data: {
				name,
				url,
				value,
				image,
				latitude,
				longitude,
			},
		});

		res.status(201);
		res.json(property);
	}
);

propertiesRouter.put('/:id',
	[
		body('name').optional().notEmpty().optional()
			.withMessage('Campo nome não pode ser vazio.'),
		body('url').optional().notEmpty()
			.withMessage('Campo url não pode ser vazio.'),
		body('latitude').optional().notEmpty()
			.withMessage('Campo latitude não pode ser vazio.'),
		body('longitude').optional().notEmpty()
			.withMessage('Campo longitude não pode ser vazio.'),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}

		const { id } = req.params;
		const { name, url, value, image, latitude, longitude } = req.body;

		const propertyExists = await prisma.property.findUnique({
			where: {
				id: id,
			},
		});

		if (!propertyExists) {
			res.status(404);
			res.json({
				error: 'Nenhum imóvel encontrado com o ID fornecido.',
			});
			return;
		}

		const property = await prisma.property.update({
			where: { id: id },
			data: {
				name,
				url,
				value,
				image,
				latitude,
				longitude,
			},
		});

		res.json(property);
	});

propertiesRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;

	const propertyExists = await prisma.property.findUnique({
		where: {
			id: id,
		},
	});

	if (!propertyExists) {
		res.status(404);
		res.json({
			error: 'Nenhum imóvel encontrado com o ID fornecido.',
		});
		return;
	}

	const property = await prisma.property.delete({
		where: { id: id },
	});

	res.json(property);
});

export default propertiesRouter;
