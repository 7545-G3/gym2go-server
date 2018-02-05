import App from './App'
import Logger from './app/utils/Logger'
import Config from './app/config/Config'

Promise.all(App.initialization)
  .then(() => {
    let port = Config.PORT
    App.listen(port, () => {
      Logger.info(`App listening on port ${port}!`)
    })
  })
  .catch(err => {
    Logger.error('Failed initializing app', err)
  })
