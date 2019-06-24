import store from '@/store'

export default function(route) {
  const { title } = route.meta || {}
  const stateTitle = store.state.title
  // prioritize stateTitle over route title
  return stateTitle || title || ''
}
