export default function(item) {
  const hasIf = typeof item === 'object' && typeof item.if === 'function'
  return hasIf ? item.if() : true
}
