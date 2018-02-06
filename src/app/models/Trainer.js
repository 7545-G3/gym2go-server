import mongoose from 'mongoose'
import { Buffer } from 'buffer'

const Schema = mongoose.Schema

const schema = Schema({
  email: { type: String },
  age: { type: String },
  specialty: { type: String },
  image: { type: Buffer }
})

const Trainer = mongoose.model('Trainer', schema)

export default Trainer
