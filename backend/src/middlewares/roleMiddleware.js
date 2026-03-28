/*
Author : Sofian Hussein
Date : 27.03.2026
Title : roleMiddleware.js
Desc : role middleware
*/

export function requireRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({ error: 'Unauthorized access' })
        }
        next()
    }
}