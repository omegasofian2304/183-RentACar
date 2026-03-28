/*
Author : Sofian Hussein
Date : 27.03.2026
Title : authRepository.js
Desc : Database queries for auth
*/

import pool from "../config/db.js";

export async function findCustomerByEmailRepository(email) {
    const [result] = await pool.query(
        `SELECT * FROM customers WHERE email = ?`, [email]
    )
    return result[0] ?? null
}

export async function saveRefreshTokenRepository(customerId, token, expiresAt) {
    await pool.query(
        `INSERT INTO refresh_tokens (customers_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())`,
        [customerId, token, expiresAt]
    )
}

export async function findRefreshTokenRepository(token) {
    const [result] = await pool.query(
        `SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()`,
        [token]
    )
    return result[0] ?? null
}

export async function createCustomerRepository(firstname, lastname, email, hashedPassword, birthdate, phone, address) {
    const [result] = await pool.query(
        `INSERT INTO customers (first_name, last_name, email, password, birth_date, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'client')`,
        [firstname, lastname, email, hashedPassword, birthdate, phone, address]
    )
    return result.insertId
}

export async function deleteRefreshTokenRepository(token) {
    await pool.query(
        `DELETE FROM refresh_tokens WHERE token = ?`,
        [token]
    )
}

export async function deleteExpiredRefreshTokensRepository() {
    await pool.query(
        `DELETE FROM refresh_tokens WHERE expires_at < NOW()`
    )
}