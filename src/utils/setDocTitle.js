const appTitle = process.env.VUE_APP_TITLE || ''

export default function(route) {
  const { title } = route.meta || {}
  const docTitle = title ? `${title} | ${appTitle}` : appTitle

  document.title = docTitle
}
