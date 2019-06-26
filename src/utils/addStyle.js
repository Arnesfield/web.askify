const propertyValuePair = function(css) {
  return Object.keys(css).reduce(
    (res, prop) => res + `${prop}: ${css[prop]}; `,
    ''
  )
}

const classValuePair = function(className) {
  return Object.keys(className).reduce(
    (res, key) => res + `${key} { ${className[key]} } `,
    ''
  )
}

const attachStyle = function(id, c) {
  let elem = document.querySelector(`#${id}`)

  // if e does not exist, make element
  if (elem === null) {
    elem = document.createElement('style')
    elem.setAttribute('id', id)
    elem.setAttribute('type', 'text/css')
    document.querySelector('head').appendChild(elem)
  }

  // rewrite to empty if boolean
  elem.innerHTML = typeof c === 'boolean' ? '' : c
}

const addStyle = function(id, className, property, value) {
  if (typeof property === 'string') {
    property = { [property]: value }
  }

  if (typeof className === 'string') {
    className = {
      [className]: property
    }
  }

  // assert className as object
  // turn className to be className: string
  Object.keys(className).forEach(key => {
    className[key] = propertyValuePair(className[key])
  })
  const classStr = classValuePair(className)

  // make string prop: value;
  // assert that property is an obj
  attachStyle(id, classStr)
}

export default addStyle
export { addStyle, attachStyle, propertyValuePair, classValuePair }
