import GymController from '../controllers/GymController'

const baseUrl = '/api/gyms'

class GymRouter {
  static init(app) {
    app.post(baseUrl, GymController.post)
    app.get(baseUrl, GymController.get)
    app.get(`${baseUrl}/:id`, GymController.getById)
    app.put(`${baseUrl}/:id`, GymController.put)
    app.put(`${baseUrl}/:id/trainers`, GymController.addTrainer)
    app.put(`${baseUrl}/:id/products`, GymController.addProduct)
    app.put(`${baseUrl}/:id/activities`, GymController.addActivity)
    app.delete(`${baseUrl}/:id/trainers/:trainerId`, GymController.removeTrainer)
    app.delete(`${baseUrl}/:id/products/:productId`, GymController.removeProduct)
    app.delete(`${baseUrl}/:id/activities/:activityId`, GymController.removeActivity)
  }
}

module.exports = GymRouter
