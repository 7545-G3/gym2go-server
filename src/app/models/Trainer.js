import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = Schema({
  email: { type: String },
  age: { type: String },
  specialty: { type: String }
})

const Trainer = mongoose.model('Trainer', schema)

export default Trainer