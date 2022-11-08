export const schoolRoutes = router => {
  router.all([
    '/school',
    '/school/*'
  ], (req, res, next) => {
    res.locals.serviceName = 'Send consent requests for vaccinations'
    next()
  })
}
