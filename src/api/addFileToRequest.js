// TODO: might make separate file
const setToBody = function(body, key, value) {
  if (body instanceof FormData) {
    body.append(key, value)
  } else {
    body[key] = value
  }

  return body
}

export default function(body, file, fileKey, colKey, required = false) {
  // colKey is the same as fileKey if not set
  colKey = !colKey ? fileKey : colKey

  // if file is falsy, append using colKey empty string
  if (!file) {
    // only add to body if required
    if (required) {
      setToBody(body, colKey, '')
    }
  } else {
    setToBody(body, fileKey, file)
  }

  return body
}
