import Logger from '../utils/Logger'

class ErrorHandler {
  static handle(err, req, res, next) {
    switch (err.name) {
      case 'UnauthorizedError':
        res.status(401).json({message: 'Invalid auth token'})
        break
      case 'UserNotFoundError':
        res.status(401).json({message: 'Invalid auth token'})
        break
      case 'InvalidPermissionsError':
        res.status(403).json({message: 'Unauthorized'})
        break
      default:
        Logger.error('Unknown error', err)
        res.status(500).send(err.stack)
        break
    }
  }

  static globalHandler(err, req, res, next) {
    Logger.error(err)
    ErrorHandler.handle(err, req, res, next)
  }

  static initGlobalHandler(app) {
    app.use(ErrorHandler.globalHandler)
  }

}

export default ErrorHandler
