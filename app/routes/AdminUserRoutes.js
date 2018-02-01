import AdminUserController from '../controllers/AdminUserController'

const baseUrl = '/api/admin-users'

class AdminUserRouter {
  static init(app) {
    app.post(baseUrl, AdminUserController.post)
    app.get(baseUrl, AdminUserController.get)
    app.post(`${baseUrl}/login`, AdminUserController.login)
  }
}

module.exports = AdminUserRouter
