import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import carroRoutes from './routes/carroRoutes.js';

const app = express();

// --- Criar __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir front-end estático

app.use('/frontend', express.static(path.join(__dirname, '../../frontend')));


// Rota raiz
app.get('/', (req, res) => {
    res.redirect('/frontend/login.html');
  });

// Rotas API
app.use('/carros', carroRoutes);

export default app;
