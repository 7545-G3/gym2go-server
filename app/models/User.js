import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String },
  creditCardNumber: { type: String },
  creditCardCode: { type: String },
  creditCardBrand: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', schema)

export default User