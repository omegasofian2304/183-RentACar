/*
Author : Sofian Hussein
Date : 01.04.2026
Title : adminRoutes.js
Desc : File containing all route for adminRoutes
*/
import { Router } from 'express'
import { getAllOrdersController } from '../controllers/adminController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get('/orders', authMiddleware, requireRole('admin'), getAllOrdersController)

export default router