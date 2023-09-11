import { fluWizard } from '../wizards/flu.js'

export const fluRoutes = router => {
  router.all([
    '/flu',
    '/flu/:view',
    '/flu/consent/:view'
  ], (req, res, next) => {
    res.locals.vaccine = 'flu'
    res.locals.secondary = false
    res.locals.paths = fluWizard(req)

    // Change answer
    if (req.query.change) {
      res.locals.paths.next = '/flu/consent/check-answers'
    }

    next()
  })

  router.get('/flu/consent/:view', (req, res) => {
    res.render(`consent/${req.params.view}`)
  })

  router.post([
    '/flu/:view',
    '/flu/consent/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
