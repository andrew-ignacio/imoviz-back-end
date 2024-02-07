import express from 'express';
import propertiesRouter from './routes/properties';

const app = express();
const port = process.env.PORT;

app.use('/properties', propertiesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
