/*
Author : Sofian Hussein
Date : 29.03.2026
Title : rentalController.js
Desc : File containing all controllers for rentals
*/

import { createRentalService, getRentalByCustomerIdService } from "../services/rentalService.js";

export async function createRentalController(req, res, next) {
    try {
        const { carId, startDate, endDate } = req.body
        const customerId = req.user.id

        if (!carId || !startDate || !endDate) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ error: 'End date must be after start date' })
        }

        const rentalId = await createRentalService(customerId, carId, startDate, endDate)
        return res.status(201).json({ message: 'Rental created', rentalId })

    } catch (error) {
        next(error)
    }
}

export async function getRentalByCustomerIdController(req, res, next) {
    try {
        const customerId = req.user.id

        const rentals = await getRentalByCustomerIdService(customerId)
        return res.status(200).json({ rentals })
    } catch (error) {
        next(error)
    }
}