/*
Author : Sofian Hussein
Date : 29.03.2026
Title : carService.js
Desc : Business logic for cars
*/

import { getAvailableCarsRepository } from "../repositories/carRepository.js";

export async function getAvailableCarsService() {
    return await getAvailableCarsRepository()
}