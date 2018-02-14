let Promise = require('bluebird')
import Logger from '../utils/Logger'

let connectToDatabase = () => {
  let def = Promise.pending()
  let mongoose = require('mongoose')
  mongoose.set('debug', process.env.MONGOOSE_DEBUG)
  mongoose.Promise = Promise

  const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/gym2go'
  mongoose.connect(MONGO_URL)
  let db = mongoose.connection
  db.on('error', err => {
    def.reject(err)
  })
  db.once('open', () => {
    Logger.info('Connected to database:', MONGO_URL)
    def.resolve()
  })
  return def.promise
}

const init = () => {
  return [connectToDatabase()]
}

export default init
