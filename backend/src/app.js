/*
Auteur : Sofian Hussein
Date : 12.03.2026
Project : RentACar
*/

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// Max 100 requests every 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

export default app;