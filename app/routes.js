import express from 'express'
import { consentRoutes } from './routes/consent.js'

const router = express.Router()
consentRoutes(router)

export default router
