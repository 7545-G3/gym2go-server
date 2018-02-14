import UserController from '../controllers/UserController'

const baseUrl = '/api/users'

class UserRouter {
  static init(app) {
    app.post(baseUrl, UserController.post)
    app.get(baseUrl, UserController.get)
    app.post(`${baseUrl}/login`, UserController.login)
    app.post(`${baseUrl}/:id/supplements`, UserController.purchaseSupplement)
  }
}

module.exports = UserRouter
