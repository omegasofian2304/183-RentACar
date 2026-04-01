/*
Author : Sofian Hussein
Date : 01.04.2026
Title : authController.js
Desc : File containing all controllers for auth
*/
import { getAllOrdersService } from '../services/adminService.js'

export async function getAllOrdersController(req, res, next) {
    try {
        const orders = await getAllOrdersService()
        res.json({ orders })
    } catch (error) {
        next(error)
    }
}