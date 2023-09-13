import express from 'express'
import { fluRoutes } from './routes/flu.js'
import { hpvRoutes } from './routes/hpv.js'
import { dptRoutes } from './routes/dpt.js'
import { schoolRoutes } from './routes/school.js'
import { saisRoutes } from './routes/sais.js'

const router = express.Router()

router.all('*', (req, res, next) => {
  if (req.session.data?.child?.['first-name']) {
    res.locals.childName = `${req.session.data.child['first-name']} ${req.session.data.child['last-name']}`
  } else {
    res.locals.childName = 'Bobby Doe'
  }

  res.locals.deadlineDate = '2023-11-24'
  res.locals.sessionDate = '2023-11-27'
  res.locals.sessionSchool = res.locals.secondary ? 'Hele’s Secondary School' : 'St Mary’s Primary School'

  next()
})

fluRoutes(router)
hpvRoutes(router)
dptRoutes(router)
schoolRoutes(router)
saisRoutes(router)

export default router
