import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  description: { type: String },
  price: { type: Number },
  schedules: [{ type: String }],
  image: { type: String }
})

const Activity = mongoose.model('Activity', schema)

export default Activity
