import qs from 'qs'
import { jsonify, logger } from '@/utils'
import getMessage from './getMessage'
import instance from './instance'

const METHODS = ['patch', 'put', 'delete']

const callback = (fn, e) => typeof fn === 'function' ? fn(e) : undefined

const request = function(options = {}) {
  let { data, method, success, error, lastly } = options

  method = method || 'get'

  const isFormData = data instanceof FormData

  if (METHODS.includes(method.toLowerCase())) {
    // get uppercase of method before changing it
    const uMethod = method.toUpperCase()

    if (isFormData) {
      data.append('_method', uMethod)
    } else if (data !== null) {
      data._method = uMethod
    }

    // now change it
    method = 'post'
  }

  // use qs
  if (data && !isFormData) {
    data = qs.stringify(data)
  }

  // update options
  options = {
    ...options,
    data,
    method
  }

  // actual request
  return instance(options)
    .then(res => {
      logger(res)
      callback(success, res)
      callback(lastly)
    })
    .catch(e => {
      logger(e, 'error')
      logger(jsonify(e), 'error')
      callback(error, e)
      callback(lastly)
    })
}

request.getMessage = getMessage

export default request
export { request, callback, getMessage }
