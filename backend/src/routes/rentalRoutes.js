/*
Author : Sofian Hussein
Date : 29.03.2026
Title : rentalRoutes.js
Desc : File containing all route for rentals
*/

import { Router } from "express";
import {createRentalController, getRentalByCustomerIdController} from "../controllers/rentalController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createRentalController);

router.get("/my", authMiddleware, getRentalByCustomerIdController);

export default router;