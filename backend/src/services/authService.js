/*
Author : Sofian Hussein
Date : 27.03.2026
Title : authService.js
Desc : Business logic for auth
*/
import {
    createCustomerRepository, deleteRefreshTokenRepository,
    findCustomerByEmailRepository,
    findRefreshTokenRepository,
    saveRefreshTokenRepository
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginCustomerService(email, password) {
    const customer = await findCustomerByEmailRepository(email)

    if (!customer) {
        const error = new Error('invalid credentials')
        error.status = 401
        throw error
    }

    const match = await bcrypt.compare(password, customer.password)
    if (!match) {
        const error = new Error('invalid credentials')
        error.status = 401
        throw error
    }

    const accessToken = jwt.sign(
        { id: customer.id, role: customer.role },
        process.env.JWT_ACCESS,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { id: customer.id, role: customer.role },
        process.env.JWT_REFRESH,
        { expiresIn: '7d' }
    )

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await saveRefreshTokenRepository(customer.id, refreshToken, expiresAt)

    return { accessToken, refreshToken }
}


export async function refreshTokenService(token) {
    if (!token) {
        const error = new Error('missing refresh token')
        error.status = 401
        throw error
    }

    let payload
    try {
        payload = jwt.verify(token, process.env.JWT_REFRESH)
    } catch {
        const error = new Error('invalid or expired refresh token')
        error.status = 401
        throw error
    }

    const storedToken = await findRefreshTokenRepository(token)
    if (!storedToken) {
        const error = new Error('refresh token not found')
        error.status = 401
        throw error
    }

    return jwt.sign(
        { id: payload.id, role: payload.role },
        process.env.JWT_ACCESS,
        { expiresIn: '15m' }
    )
}

export async function registerCustomerService(firstname, lastname, email, password, birthdate, phone, address) {
    const existing = await findCustomerByEmailRepository(email)
    if (existing) {
        const error = new Error('email already in use')
        error.status = 409
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await createCustomerRepository(firstname, lastname, email, hashedPassword, birthdate, phone, address)
}

export async function logoutCustomerService(token) {
    if (!token) {
        const error = new Error('missing refresh token')
        error.status = 401
        throw error
    }
    await deleteRefreshTokenRepository(token)
}