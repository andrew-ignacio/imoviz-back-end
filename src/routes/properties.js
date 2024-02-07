import express from 'express';
const propertiesRouter = express.Router();

propertiesRouter.get('/', (req, res) => {
  res.send('Hello world!');
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
