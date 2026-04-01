/*
Author : Sofian Hussein
Date : 27.03.2026
Title : authRoutes.js
Desc : File containing all route for auth
*/
import { Router } from "express";
import {
    loginCustomerController, logoutCustomerController,
    refreshTokenController,
    registerCustomerController
} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginCustomerController);

router.post("/refresh", refreshTokenController);

router.post("/register", registerCustomerController);

router.post("/logout", logoutCustomerController);

export default router;