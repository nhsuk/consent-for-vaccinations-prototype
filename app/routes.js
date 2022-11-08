import express from 'express'
import { consentRoutes } from './routes/consent.js'
import { schoolRoutes } from './routes/school.js'
import { saisRoutes } from './routes/sais.js'

const router = express.Router()
consentRoutes(router)
schoolRoutes(router)
saisRoutes(router)

export default router
