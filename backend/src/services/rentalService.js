/*
Author : Sofian Hussein
Date : 29.03.2026
Title : rentalService.js
Desc : Business logic for rentals
*/

import {
    createRentalRepository,
    getRentalByCustomerIdRepository,
    isCarAvailableRepository
} from "../repositories/rentalRepository.js";
import {getCarPrice} from "../repositories/carRepository.js";
import {createPaymentRepository} from "../repositories/payementRepository.js";

export async function createRentalService(customerId, carId, startDate, endDate) {
    const available = await isCarAvailableRepository(carId, startDate, endDate)
    if (!available) {
        const error = new Error('Car is not available for these dates')
        error.status = 409
        throw error
    }

    const cars = await getCarPrice(carId)
    if (!cars.length) {
        const error = new Error('Car not found')
        error.status = 404
        throw error
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    const totalPrice = (days * cars[0].price_per_day).toFixed(2)

    const paymentId = await createPaymentRepository(customerId, cars[0].agencies_Id, totalPrice)

    return await createRentalRepository(customerId, carId, startDate, endDate, totalPrice, paymentId)
}

export async function getRentalByCustomerIdService(customerId) {
    const rentals = await getRentalByCustomerIdRepository(customerId);
    if (!rentals) {
        const error = new Error('No rental')
        error.status = 404
        throw error
    }
    return rentals;
}