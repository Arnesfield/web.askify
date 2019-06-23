const MSG_KEYS = ['msg', 'message', '_msg']

const getFromKeys = data => {
  if (!data) {
    return undefined
  }

  for (var i = 0; i < MSG_KEYS.length; i++) {
    // get msg using keys
    if (typeof data[MSG_KEYS[i]] === 'string') {
      return data[MSG_KEYS[i]]
    }
  }

  return undefined
}

export default function(res, message, ...code) {
  // true if no code or code exists
  if (res && (code.length === 0 || code.includes(res.status))) {
    if (typeof res.data === 'string') {
      message = res.data
    } else {
      message = getFromKeys(res.data)
    }
  }

  // fallback
  if (!res || typeof message === 'undefined' || message === null) {
    message = 'The service is unavailable.'
  }

  return message
}
