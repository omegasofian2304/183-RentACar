/*
Author : Sofian Hussein
Date : 29.03.2026
Title : rentalRepository.js
Desc : Database queries for rentals
*/


import pool from "../config/db.js";

export async function createRentalRepository(customerId, carId, startDate, endDate, totalPrice, paymentId) {
    const [result] = await pool.query(
        `INSERT INTO rentals (customers_Id, cars_Id, start_date, end_date, total_price, rental_status, payments_Id)
         VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
        [customerId, carId, startDate, endDate, totalPrice, paymentId]
    )
    return result.insertId
}

export async function isCarAvailableRepository(carId, startDate, endDate) {
    // returns true if no conflicting rentals exist for the given dates
    const [result] = await pool.query(
        `SELECT * FROM rentals 
         WHERE cars_Id = ? 
         AND rental_status != 'cancelled'
         AND start_date < ? 
         AND end_date > ?`,
        [carId, endDate, startDate]
    )
    return result.length === 0
}

export async function getRentalByCustomerIdRepository(customerId) {
    const [result] = await pool.query(`Select * from rentals
    INNER JOIN cars ON cars.id = cars_Id
    where customers_Id = ?;`,
    [customerId]);
    return result ?? null;
}