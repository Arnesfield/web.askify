export default function(val, list, format) {
  // make sure list is an array
  const isArray = typeof list === 'object' && list.constructor.name === 'Array'
  if (!isArray) {
    list = [list]
  }

  const exists = list.findIndex(e => e == val) > -1
  const res = exists ? val : list[0]
  // format res
  return typeof format === 'function' ? format(res) : res
}
