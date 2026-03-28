/*
Author : Sofian Hussein
Date : 27.03.2026
Title : authController.js
Desc : File containing all controllers for auth
*/
import {
    loginCustomerService,
    logoutCustomerService,
    refreshTokenService,
    registerCustomerService
} from "../services/authService.js"

// Source : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function loginCustomerController(req, res, next) {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is invalid' })
        }

        const { accessToken, refreshToken } = await loginCustomerService(email, password)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // true in production (https)
            sameSite: 'Lax', // Allow cookies in cross-origin requests (dev)
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).json({ accessToken })

    } catch (error) {
        next(error)
    }
}

export async function refreshTokenController(req, res, next) {
    try {
        const token = req.cookies?.refreshToken

        const accessToken = await refreshTokenService(token)
        return res.status(200).json({ accessToken })

    } catch (error) {
        next(error)
    }
}

export async function registerCustomerController(req, res, next) {
    try {
        const { firstname, lastname, email, password, birthdate, phone, address } = req.body

        if (!firstname || !lastname || !email || !password || !birthdate || !phone || !address) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email is invalid' })
        }

        await registerCustomerService(firstname, lastname, email, password, birthdate, phone, address)
        return res.status(201).json({ message: 'Account created successfully' })

    } catch (error) {
        next(error)
    }
}

export async function logoutCustomerController(req, res, next) {
    try {
        const token = req.cookies?.refreshToken

        await logoutCustomerService(token)

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        })

        return res.status(200).json({ message: 'Logged out successfully' })

    } catch (error) {
        next(error)
    }
}