'use strict'

let Promise = require("bluebird")
let Logger = require('./Logger')
let fs = require('fs')
let path = require('path')
let _ = require('lodash')

class ImportUtils {
  constructor() {}
  static importAllFromDirectory(dirname, regex=/^(?!index).*.js/) {
    return Promise.promisify(fs.readdir)(dirname)
      .then(files => {
        let promises = []
        _.each(files, filePath => {
          if (filePath.match(regex)) {
            let module = require(dirname + path.sep + filePath)
            promises.push(module)
          } else {
            Logger.warn(`Ignoring import ${filePath}`)
          }
        })
        return promises
      })
  }
}

module.exports = ImportUtils
