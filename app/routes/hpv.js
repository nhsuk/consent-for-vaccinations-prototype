import { hpvWizard } from '../wizards/hpv.js'

export const hpvRoutes = router => {
  router.all([
    '/hpv',
    '/hpv/:view',
    '/hpv/consent/:view'
  ], (req, res, next) => {
    res.locals.vaccine = 'HPV'
    res.locals.sessionSchool = 'Hele’s Secondary School'
    res.locals.paths = hpvWizard(req)

    // Change answer
    if (req.query.change) {
      res.locals.paths.next = '/hpv/consent/check-answers'
    }

    next()
  })

  router.get('/hpv/consent/:view', (req, res) => {
    res.render(`consent/${req.params.view}`)
  })

  router.post([
    '/hpv/:view',
    '/hpv/consent/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
