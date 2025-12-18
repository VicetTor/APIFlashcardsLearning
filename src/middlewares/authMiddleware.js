import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

/**
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
export const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		const token = authHeader && authHeader.split(' ')[1]

		if (!token) {
			return res.status(401).json({ error: 'Access token required' })
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decodedToken.id
		req.user = { userId }
		next()

	} catch (error) {
		console.error('Authentication error:', error)
		res.status(401).json({ error: 'Invalid or expired token' })
	}
}
