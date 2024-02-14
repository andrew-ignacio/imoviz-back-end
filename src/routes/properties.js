import { PrismaClient } from '@prisma/client';
import express from 'express';

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
      id: id
    }
  });

  res.json(property);
});

propertiesRouter.post('/', async (req, res) => {
  const { name, url, value, image, latitude, longitude } = req.body;

  const property = await prisma.property.create({
    data: {
      name, url, value, image, latitude, longitude
    }
  });

  res.json(property);
});

propertiesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, url, value, image, latitude, longitude } = req.body;

  const property = await prisma.property.update({
    where: { id: id },
    data: {
      name, url, value, image, latitude, longitude
    }
  })

  res.json(property);
});

propertiesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const property = await prisma.property.delete({
    where: { id: id }
  });

  res.json(property);
});

export default propertiesRouter;
