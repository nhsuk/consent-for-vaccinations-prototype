import express from 'express'
import { fluRoutes } from './routes/flu.js'
import { hpvRoutes } from './routes/hpv.js'
import { dptRoutes } from './routes/dpt.js'
import { schoolRoutes } from './routes/school.js'
import { saisRoutes } from './routes/sais.js'

const router = express.Router()
fluRoutes(router)
hpvRoutes(router)
dptRoutes(router)
schoolRoutes(router)
saisRoutes(router)

export default router
