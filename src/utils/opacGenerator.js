const OPACITY = [20, 14, 10, '08', '7F']

export default function(prepend, color) {
  return OPACITY.reduce((res, opac, i) => {
    res[`${prepend}${i + 1}`] = {
      'background-color': `${color}${opac} !important`
    }
    return res
  }, {})
}
