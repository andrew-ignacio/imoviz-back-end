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

  if (!property) {
    res.json({
      error: true,
      message: "Nenhum imóvel encontrado para o ID informado."
    });

    return;
  }

  res.json(property);
});

propertiesRouter.post('/', (req, res) => {
  res.send('Hello world!');
});

propertiesRouter.put('/', (req, res) => {
  res.send('Hello world!');
});

propertiesRouter.delete('/', (req, res) => {
  res.send('Hello world!');
});

export default propertiesRouter;
