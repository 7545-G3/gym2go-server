import User from '../models/User'
import SupplementPurchase from '../models/SupplementPurchase'
import GymPass from '../models/GymPass'
let ValidationError = require('mongoose').Error.ValidationError
import { UserNotFoundException, UserInvalidCredentialsException } from '../utils/error/Exceptions'
let ErrorHelper = require('../utils/error/ErrorHelper')
let HttpStatus = require('http-status-codes')

class UserController {

  static post(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static login(req, res) {
    const { email, password } = req.body
    User.findOne({ email, password })
      .deepPopulate('supplements.supplement gymPasses.clothes gymPasses.activity gymPasses.trainer')
      .then(user => {
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
    User.find()
      .then((user) => {
        res.json(user)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static purchaseSupplement(req, res) {
    let userFound = null
    User.findById(req.params.id)
      .then(user => {
        userFound = user
        return SupplementPurchase.create(req.body)
      })
      .then(supplementPurchase => {
        userFound.supplements.push(supplementPurchase._id)
        return userFound.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static purchaseGymPass(req, res) {
    let userFound = null
    User.findById(req.params.id)
      .then(user => {
        userFound = user
        return GymPass.create(req.body)
      })
      .then(gymPass => {
        userFound.gymPasses.push(gymPass._id)
        return userFound.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }
}

export default UserController
