/*
Auteur : Sofian Hussein
Date : 12.03.2026
Project : RentACar
*/

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import authRouter from "./routes/authRoutes.js";
import cookieParser from 'cookie-parser'
import {deleteExpiredRefreshTokensRepository} from "./repositories/authRepository.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
}));

// Max 100 requests every 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// use cookie parser to collect the cookies
app.use(cookieParser())

app.use("/auth", authRouter);

// delete the expired refresh tokens every 24h
setInterval(async () => {
    await deleteExpiredRefreshTokensRepository()
}, 24 * 60 * 60 * 1000)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});