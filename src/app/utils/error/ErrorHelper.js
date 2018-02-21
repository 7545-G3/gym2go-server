'use strict'

let Config = require('../../config/Config')
let Strings = require('../../config/Strings')
const ErrorResponse = require('./ErrorResponse')
let ErrorCodes = require('./ErrorCodes')
let Logger = require('../Logger')
let HttpStatus = require('http-status-codes')

class ErrorHelper {
  constructor() {
  }

  static unknownExceptionResponse(err, res) {
    let response = {
      'message': Strings.UnknownException,
    }
    return ErrorHelper._sendErrorResponse(res, 500, err, response)
  }

  static _sendErrorResponse(res, code, err, jsonResponse) {
    jsonResponse.stacktrace = err.stack.toString()
    return res.status(code).json(jsonResponse)
  }

  static validationErrorResponse(errors) {
    return ErrorResponse.getErrorResponseFromReqValidation(errors)
  }

  static getErrorResponseFromDBValidation(errors) {
    return ErrorResponse.getErrorResponseFromDBValidation(errors)
  }

  static getErrorForNotFoundGym(gymId) {
    return {
      code: ErrorCodes.INVALID_PARAMS,
      errors: [{gymId: `Gym does not exist for id: ${gymId}`}]
    }
  }

  static getErrorForNotFoundUser(userId) {
    return {
      code: ErrorCodes.INVALID_PARAMS,
      errors: [{userId: `User does not exist for id: ${userId}`}]
    }
  }

  static internalServerError(res, err) {
    Logger.error(err)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorHelper._serverErrorToJson(err))
  }

  static _serverErrorToJson(err) {
    return {error: err.toString(), stack: err.stack.toString()}
  }

}

module.exports = ErrorHelper
