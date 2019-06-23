export default function(a, b) {
  // let result = false
  // a.every(e => !(result = b.includes(e)))
  return a.some(e => b.includes(e))
}
