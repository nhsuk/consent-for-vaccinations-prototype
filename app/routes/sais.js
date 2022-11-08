export const saisRoutes = router => {
  router.all([
    '/sais',
    '/sais/*'
  ], (req, res, next) => {
    res.locals.serviceName = 'Prepare for school vaccination campaigns'
    next()
  })
}
