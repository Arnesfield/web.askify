export default function(log, type = 'log') {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  if (typeof type !== 'string') {
    type = 'log'
  }

  let logger = console[type]
  if (typeof logger !== 'function') {
    logger = console.log
  }

  logger(log)
}
