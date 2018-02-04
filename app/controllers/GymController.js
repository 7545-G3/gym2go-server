import Gym from '../models/Gym'
let ValidationError = require('mongoose').Error.ValidationError
let ErrorHelper = require('../utils/error/ErrorHelper')
let HttpStatus = require('http-status-codes')

class GymController {

  static post(req, res) {
    Gym.create(req.body)
      .then((gym) => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static put(req, res) {
    Gym.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then((gym) => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }


  static getById(req, res) {
    Gym.findOne({_id: req.params.id})
      .then((gym) => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }

  static get(req, res) {
    Gym.find()
      .then((gym) => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
  }
}


export default GymController
