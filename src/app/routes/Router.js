import ImportUtils from '../utils/ImportUtils'
import ErrorHandler from '../middlewares/ErrorHandler'
import Config from '../config/Config'

class Router {
  initializeApp(app) {

    ImportUtils.importAllFromDirectory(__dirname, /.*Routes.js/)
      .then(routes => {
        routes.forEach(route => {
          route.init(app)
        })
      })

    app.use(ErrorHandler.handle)
  }
}

export default new Router()
