import { getRouteTitle } from './'

const appTitle = process.env.VUE_APP_TITLE || ''

export default function(route) {
  const title = getRouteTitle(route)
  const docTitle = title ? `${title} | ${appTitle}` : appTitle

  document.title = docTitle
}
