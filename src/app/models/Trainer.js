import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  email: { type: String },
  age: { type: String },
  specialty: { type: String },
  image: { type: String }
})

const Trainer = mongoose.model('Trainer', schema)

export default Trainer
