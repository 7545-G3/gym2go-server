import User from '../models/User'
import SupplementPurchase from '../models/SupplementPurchase'
import GymPass from '../models/GymPass'
let ValidationError = require('mongoose').Error.ValidationError
let ErrorHelper = require('../utils/error/ErrorHelper')
import UserNotFoundException from '../utils/error/Exceptions'
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
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static login(req, res) {
    const { email, password } = req.body
    User.findOne({ email, password })
      .deepPopulate('supplements.supplement gymPasses.clothes gymPasses.activity gymPasses.trainer')
      .then(user => {
        if (!user) {
          throw new UserNotFoundException()
        }
        return res.json(user)
      })
      .catch(UserNotFoundException, () => {
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
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static purchaseSupplement(req, res) {
    let userFound = null
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          throw new UserNotFoundException()
        }
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
      .catch(UserNotFoundException, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundUser(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static purchaseGymPass(req, res) {
    let userFound = null
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          throw new UserNotFoundException()
        }
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
      .catch(UserNotFoundException, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundUser(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }
}

export default UserController
