import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  clothes: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
  date: { type: String },
  trainer: { type: Schema.Types.ObjectId, ref: 'Trainer' },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  qrImage: { type: String }
})

const GymPass = mongoose.model('GymPass', schema)

export default GymPass
