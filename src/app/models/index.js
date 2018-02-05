'use strict'

let _ = require('lodash')
let Promise = require('bluebird')
let Logger = require('../utils/Logger')
let Database = require('../utils/Database')
let ImportUtils = require('../utils/ImportUtils')
let DatabaseSeeder = require('../utils/DatabaseSeeder')

class ModelInitializer {
  constructor() {}
  static init() {
    return ImportUtils.importAllFromDirectory(__dirname)
      /*.then(models => {
        _.each(models, model => {
          Database.models[model.getTableName()] = model
          Logger.info(`Registered model ${model.getTableName()}`)
        })
      })*/
      .then(() => {
        Object.keys(Database.models).forEach(function (modelName) {
          if ("associate" in Database.models[modelName]) {
            Database.models[modelName].associate(Database.models)
          }
        })
        Logger.info('Syncing database')
        return Database.sync()
      })
      .then(DatabaseSeeder.seed)

  }
}


export default ModelInitializer
