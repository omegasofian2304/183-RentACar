/*
Author : Sofian Hussein
Date : 29.03.2026
Title : carController.js
Desc : File containing all controllers for cars
*/

import { getAvailableCarsService } from "../services/carService.js";

export async function getAvailableCarsController(req, res, next) {
    try {
        const cars = await getAvailableCarsService()
        return res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}