export default function(e, search) {
  return e && e.toString()
    .toLowerCase()
    .indexOf(search) > -1
}
