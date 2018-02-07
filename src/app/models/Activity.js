import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  description: { type: String },
  price: { type: Number },
  date: { type: String },
  time: { type: String },
  image: { type: String }
})

const Activity = mongoose.model('Activity', schema)

export default Activity
