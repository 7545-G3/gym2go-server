import AdminUser from '../models/AdminUser'
import Gym from '../models/Gym'
import GymPass from '../models/GymPass'
import SupplementPurchase from '../models/SupplementPurchase'
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
    const { email, password } = req.body
    AdminUser.findOne({ email, password })
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

  static getGym(req, res) {
    Gym.find({ownerUser: req.params.id})
      .populate('ownerUser products trainers activities')
      .then(gym => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static getGymPassesPurchased(req, res) {
    return Gym.find({ownerUser: req.params.id}, '_id')
      .then(gymIds => {
        return GymPass.find({gym: {$in :gymIds}}).populate('trainer clothes')
      })
      .then(gyms => {
        res.json(gyms)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static getSupplementsPurchased(req, res) {
    return Gym.find({ownerUser: req.params.id}, '_id')
      .then(gymIds => {
        return SupplementPurchase.find({gym: {$in :gymIds}}).populate('supplement')
      })
      .then(supplements => {
        res.json(supplements)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }
}

export default AdminUserController
