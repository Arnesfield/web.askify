export default function(item) {
  const { if: ifVal } = item || {}
  const isBool = typeof ifVal === 'boolean'
  const isFunction = typeof ifVal === 'function'

  return isBool ? ifVal : (isFunction ? ifVal() : true)
}
