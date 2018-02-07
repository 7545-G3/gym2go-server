import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  creditCardNumber: { type: String },
  creditCardCode: { type: String },
  creditCardBrand: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', schema)

export default User
