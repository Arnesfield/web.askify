import store from '@/store'
import { hasSimilar, toNumberArray } from '@/utils'

const noAuth = [0, -1]

export default function(routeAuth = [], userAuth = [], append = true) {
  const hasUser = store.getters['auth/isAuth']
  if (hasUser && routeAuth.length === 0) {
    return true
  }

  // if append is false, then overwrite default userAuth (loggedAuth)
  // use auth coming from logged user
  if (append) {
    const user = store.state.auth.user
    const loggedAuth = user && user.auth ? user.auth : [0]
    userAuth.push(...loggedAuth)
  }

  // format to be sure?
  userAuth = toNumberArray(userAuth)
  routeAuth = toNumberArray(routeAuth)

  // check if some userAuth exists in routeAuth
  const yesAuth = hasSimilar(routeAuth, userAuth)
  const hasUserNoAuth = hasUser ? yesAuth : true
  const routeNoAuth = hasSimilar(routeAuth, noAuth)
  const userNoAuth = hasSimilar(routeAuth, noAuth)

  // check if has noAuth
  // if both have noAuth, then allow even if no user
  if (!hasUser && hasUserNoAuth && routeNoAuth && userNoAuth) {
    // logger('routeAuth:', 'w')
    // logger(routeAuth, 'w')
    // logger('userAuth:', 'w')
    // logger(userAuth, 'w')
    return true
  }

  return yesAuth
}
