let Promise = require('bluebird')
import Logger from '../utils/Logger'

let connectToDatabase = () => {
  let def = Promise.pending()
  let mongoose = require('mongoose')
  mongoose.set('debug', process.env.MONGOOSE_DEBUG)
  mongoose.Promise = Promise

  mongoose.connect(process.env.MONGO_URL || process.env.MONGODB_URI)
  let db = mongoose.connection
  db.on('error', err => {
    def.reject(err)
  })
  db.once('open', () => {
    Logger.info('Connected to database:', process.env.MONGO_URL || process.env.MONGODB_URI)
    def.resolve()
  })
  return def.promise
}

const init = () => {
  return [connectToDatabase()]
}

export default init
