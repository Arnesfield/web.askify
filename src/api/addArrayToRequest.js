export default function(body, key, arr) {
  // make sure arr is array
  const isArray = typeof arr === 'object' && arr.constructor.name === 'Array'
  arr = isArray && arr.length > 0 ? arr : ['']

  if (body instanceof FormData) {
    arr.forEach(c => {
      body.append(`${key}[]`, c)
    })
  } else {
    body[key] = arr
  }

  return body
}
