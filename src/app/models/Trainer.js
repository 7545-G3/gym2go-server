import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  email: { type: String },
  name: { type: String },
  age: { type: Number },
  specialty: { type: String },
  image: { type: String },
  price: { type: Number }
})

const Trainer = mongoose.model('Trainer', schema)

export default Trainer
