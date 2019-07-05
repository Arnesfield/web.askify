export default function(props, to, data = null) {
  // if no data, use new one
  data = !data ? new FormData : data
  props.forEach(prop =>
    data.append(
      prop,
      typeof to[prop] !== 'undefined' ? to[prop] : ''
    )
  )
  return data
}
