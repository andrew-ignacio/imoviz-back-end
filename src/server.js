import express from 'express';
import propertiesRouter from './routes/properties.js';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/properties', propertiesRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});
