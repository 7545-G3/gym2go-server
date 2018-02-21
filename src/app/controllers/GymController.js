import Gym from '../models/Gym'
import Trainer from '../models/Trainer'
import Product from '../models/Product'
import Activity from '../models/Activity'
import lodash from 'lodash'
let ValidationError = require('mongoose').Error.ValidationError
let ErrorHelper = require('../utils/error/ErrorHelper')
import GymNotFoundException from '../utils/error/Exceptions'
let HttpStatus = require('http-status-codes')

class GymController {

  static post(req, res) {
    Gym.create(req.body)
      .then(gym => {
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static put(req, res) {
    Gym.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static addTrainer(req, res) {
    let gymToUpdate = null
    return Gym.findOne({_id: req.params.id})
      .then((gym) => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gymToUpdate = gym
        return Trainer.create(req.body)
      })
      .then((trainer) => {
        gymToUpdate.trainers.push(trainer._id)
        return gymToUpdate.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static addProduct(req, res) {
    let gymToUpdate = null
    return Gym.findOne({_id: req.params.id})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gymToUpdate = gym
        return Product.create(req.body)
      })
      .then((product) => {
        gymToUpdate.products.push(product._id)
        return gymToUpdate.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static addActivity(req, res) {
    let gymToUpdate = null
    return Gym.findOne({_id: req.params.id})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gymToUpdate = gym
        return Activity.create(req.body)
      })
      .then((activity) => {
        gymToUpdate.activities.push(activity._id)
        return gymToUpdate.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static removeTrainer(req, res) {
    return Gym.findOne({_id: req.params.id})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gym.trainers = gym.trainers.filter(trainerId => trainerId.toString() !== req.params.trainerId)
        return gym.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static removeActivity(req, res) {
    return Gym.findOne({_id: req.params.id})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gym.activities = gym.activities.filter(activityId => activityId.toString() !== req.params.activityId)
        return gym.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static removeProduct(req, res) {
    return Gym.findOne({_id: req.params.id})
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        gym.products = gym.products.filter(productId => productId.toString() !== req.params.productId)
        return gym.save()
      })
      .then(() => {
        return res.json(HttpStatus.OK)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static getById(req, res) {
    Gym.findById(req.params.id)
      .populate('ownerUser products trainers activities')
      .then(gym => {
        if (!gym) {
          throw new GymNotFoundException()
        }
        res.json(gym)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(GymNotFoundException => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorForNotFoundGym(req.params.id))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }

  static get(req, res) {
    Gym.find()
      .populate('ownerUser products trainers activities')
      .then(gyms => {
        res.json(gyms)
      })
      .catch(ValidationError, err => {
        return res.status(HttpStatus.BAD_REQUEST).json(ErrorHelper.getErrorResponseFromDBValidation(err.errors))
      })
      .catch(err => {
        return ErrorHelper.internalServerError(res, err)
      })
  }
}

export default GymController
