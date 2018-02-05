'use strict'

let _ = require('lodash')
let ErrorCodes = require('./ErrorCodes')

class ErrorResponse {
  constructor() {
  }

  static getErrorResponseFromReqValidation(errors) {
    let errorObject = {}
    errorObject.code = ErrorCodes.INVALID_PARAMS
    errorObject.errors = _.map(errors, error => {
      let customError = {}
      customError[error.param] = error.msg + ': ' + error.value
      return customError
    })
    return errorObject
  }

  static getErrorResponseFromDBValidation(errors) {
    let errorObject = {}
    errorObject.code = ErrorCodes.INVALID_PARAMS
    errorObject.errors = _.map(_.each(errors), error => {
      let customError = {}
      customError[error.path] = error.message
      return customError
    })
    return errorObject
  }
}

module.exports = ErrorResponse
