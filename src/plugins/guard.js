// import store from '@/store'
import router from '@/router'
import { setDocTitle } from '@/utils'
import { app, isAuth, local, snackbar } from '@/helpers'

router.beforeEach((to, from, next) => {
  // remove custom title always when changing routes
  app.title()

  // show snackbar
  const { msg } = to.query
  msg ? snackbar(msg) : undefined

  // redirect to some path
  const { savedPath } = local
  if (savedPath) {
    return next({ path: savedPath, replace: true })
  }

  // reload and get user info
  // store.dispatch('auth/me')

  const routeAuth =
    to && to.meta && typeof to.meta.auth !== 'undefined' ? to.meta.auth : 0

  const auth = [1, 2, 3, 4]
  const USER_EXISTS = isAuth(auth)
  const ROUTE_ACCESSIBLE = isAuth(routeAuth, [-1])
  const ROUTE_GUEST = isAuth(routeAuth, [0], false)

  // what a nightmare
  // console.warn(to.path)
  // console.warn(routeAuth)
  // console.warn(USER_EXISTS)
  // console.warn(ROUTE_ACCESSIBLE)
  // console.warn(ROUTE_GUEST)
  // return;

  if (ROUTE_ACCESSIBLE) {
    setDocTitle(to)
    next()
    return
  }

  // prompt that the user should be logged in if auth
  // else, just go to its dashboard

  // check if to has to query
  const fallbackRoutes = [
    {
      path: '/login',
      query: {
        to: to.query.to ? to.path : to.fullPath
      }
    },
    '/dashboard'
  ]

  // stop loading here
  const findPath = r => {
    const path = typeof r === 'string' ? r : r.path
    return path == from.path
  }
  if (from && fallbackRoutes.findIndex(findPath) > -1) {
    // store.commit('loadRoute', false)
  }

  // whatever lol
  setDocTitle(from)

  if (USER_EXISTS) {
    next(fallbackRoutes[1])

    // if route is not for guests
    if (!ROUTE_GUEST) {
      snackbar('You are not permitted to access that page.')
    }
  } else {
    next(fallbackRoutes[0])
    snackbar('You must be logged in first.')
  }
})
