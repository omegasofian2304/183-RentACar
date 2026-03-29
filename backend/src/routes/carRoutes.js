/*
Author : Sofian Hussein
Date : 29.03.2026
Title : carsRoutes.js
Desc : File containing all route for cars
*/

import { Router } from "express";
import { getAvailableCarsController } from "../controllers/carController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAvailableCarsController);

export default router;