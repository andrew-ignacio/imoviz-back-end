import express from 'express';
const propertiesRouter = express.Router();

router.get('/properties', (req, res) => {
  res.send('Hello world!');
});

router.post('/properties', (req, res) => {
  res.send('Hello world!');
});

router.put('/properties', (req, res) => {
  res.send('Hello world!');
});

router.delete('/properties', (req, res) => {
  res.send('Hello world!');
});

export default propertiesRouter;
