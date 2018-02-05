import UserController from '../controllers/UserController'

const baseUrl = '/api/users'

class UserRouter {
  static init(app) {
    app.post(baseUrl, UserController.post)
    app.get(baseUrl, UserController.get)
    app.post(`${baseUrl}/login`, UserController.login)
  }
}

module.exports = UserRouter
