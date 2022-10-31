import { consentWizard } from '../wizards/consent.js'

export const consentRoutes = router => {
  router.all([
    '/consent',
    '/consent/:view'
  ], (req, res, next) => {
    res.locals.paths = consentWizard(req)
    next()
  })

  router.post('/consent/:view', (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
