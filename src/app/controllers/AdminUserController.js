import AdminUser from '../models/AdminUser'
let ValidationError = require('mongoose').Error.ValidationError
import { UserNotFoundException, UserInvalidCredentialsException } from '../utils/error/Exceptions'
let ErrorHelper = require('../utils/error/ErrorHelper')
let HttpStatus = require('http-status-codes')

class AdminUserController {

  static post(req, res) {
    AdminUser.create(req.body)
      .then((user) => {
        res.json(user)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static login(req, res) {
    const { username, password } = req.body
    AdminUser.findOne({ username, password })
      .then(user => {
        console.log(user)
        return res.json(user)
      })
      .catch(UserNotFoundException, UserInvalidCredentialsException, () => {
        res.status(HttpStatus.BAD_REQUEST).json({msg: 'Invalid username or password'})
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static get(req, res) {
    AdminUser.find()
      .then((user) => {
        res.json(user)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }
}

export default AdminUserController
