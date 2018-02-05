import GymController from '../controllers/GymController'

const baseUrl = '/api/gyms'

class GymRouter {
  static init(app) {
    app.post(baseUrl, GymController.post)
    app.get(baseUrl, GymController.get)
    app.get(`${baseUrl}/:id`, GymController.getById)
    app.put(`${baseUrl}/:id`, GymController.put)
  }
}

module.exports = GymRouter
