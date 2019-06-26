export default function(props = {}) {
  for (var prop in props) {
    this[prop] = props[prop]
  }
}
