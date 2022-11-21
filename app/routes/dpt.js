import { dptWizard } from '../wizards/dpt.js'

export const dptRoutes = router => {
  router.all([
    '/dpt',
    '/dpt/:view',
    '/dpt/consent/:view'
  ], (req, res, next) => {
    res.locals.vaccine = 'DPT'
    res.locals.secondary = true
    res.locals.paths = dptWizard(req)
    next()
  })

  router.get('/dpt/consent/:view', (req, res) => {
    res.render(`consent/${req.params.view}`)
  })

  router.post([
    '/dpt/:view',
    '/dpt/consent/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
