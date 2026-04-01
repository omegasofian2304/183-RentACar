/*
Author : Sofian Hussein
Date : 29.03.2026
Title : carRepository.js
Desc : Database queries for cars
*/

import pool from "../config/db.js";

export async function getAvailableCarsRepository() {
    const [result] = await pool.query(
        `SELECT * FROM cars WHERE available = 1`
    )
    return result
}

export async function getCarPrice(id) {
    const [result] = await pool.query(
        `SELECT price_per_day, agencies_Id FROM cars WHERE id = ?`, [id]
    )
    return result
}