import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import carroRoutes from './routes/carroRoutes.js';

const app = express()

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/carros', carroRoutes);

export default app;