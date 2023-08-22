import morgan, { type StreamOptions } from 'morgan'
import logger from 'helpers/logger'

const stream: StreamOptions = {
  write: message => logger.http(message),
}

const morganMiddleware = morgan(':method :url :status - :response-time ms', {
  stream,
})

export default morganMiddleware
