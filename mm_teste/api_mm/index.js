

import express from 'express';
import cors from 'cors';
import pessoaRoutes from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', pessoaRoutes);

app.listen(8000);