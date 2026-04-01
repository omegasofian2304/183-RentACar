/*
Author : Sofian Hussein
Date : 29.03.2026
Title : payementRepository.js
Desc : Database queries for payements
*/

import pool from "../config/db.js";

export async function createPaymentRepository(customerId, agencyId, amount) {
    const [result] = await pool.query(
        `INSERT INTO payments (amount, payment_date, payment_method, payment_status, agencies_Id, customers_Id) 
         VALUES (?, NOW(), 'card', 'paid', ?, ?)`,
        [amount, agencyId, customerId]
    )
    return result.insertId
}