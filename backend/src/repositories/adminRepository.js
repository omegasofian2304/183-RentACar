/*
Author : Sofian Hussein
Date : 01.04.2026
Title : adminRepository.js
Desc : Database queries for auth
*/
import pool from '../config/db.js'

export async function getAllOrdersRepository() {
    const [result] = await pool.query(
        `SELECT rentals.*, cars.brand, cars.model, cars.max_speed, cars.license_plate, customers.id AS client_id
     FROM rentals
     JOIN cars ON rentals.cars_id = cars.id
     JOIN customers ON rentals.customers_id = customers.id`
    )
    return result
}