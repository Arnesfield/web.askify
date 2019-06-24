export default function(n, singular, plural) {
  if (typeof n === 'object' && n.constructor.name === 'Array') {
    n = n.length
  }

  return n === 1 ? singular : plural
}
