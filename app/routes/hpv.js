import { hpvWizard } from '../wizards/hpv.js'

export const hpvRoutes = router => {
  router.all([
    '/hpv',
    '/hpv/:view',
    '/hpv/consent/:view'
  ], (req, res, next) => {
    res.locals.vaccine = 'HPV'
    res.locals.secondary = true
    res.locals.paths = hpvWizard(req)
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
