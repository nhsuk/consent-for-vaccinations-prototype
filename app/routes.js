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
    res.locals.childName = 'Jamie Doe'
    res.locals.knownAs = ' (known as Jay)'
  }

  res.locals.deadlineDate = '2023-11-24'
  res.locals.sessionDate = '2023-11-27'

  next()
})

router.all('/emails/flu/*', (req, res, next) => {
  res.locals.primary = true
  res.locals.sessionSchool = 'St Mary’s Primary School'

  next()
})

router.all('/emails/hpv/*', (req, res, next) => {
  res.locals.primary = false
  res.locals.sessionSchool = 'Hele’s Secondary School'

  next()
})

fluRoutes(router)
hpvRoutes(router)
dptRoutes(router)
schoolRoutes(router)
saisRoutes(router)

export default router
