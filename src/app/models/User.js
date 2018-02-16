import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  creditCardNumber: { type: String },
  creditCardCode: { type: String },
  creditCardBrand: { type: String },
  createdAt: { type: Date, default: Date.now },
  supplements: [{ type: Schema.Types.ObjectId, ref: 'SupplementPurchase' }],
  gymPasses: [{ type: Schema.Types.ObjectId, ref: 'GymPass' }]
})

schema.plugin(require('mongoose-deep-populate')(mongoose), {})

const User = mongoose.model('User', schema)

export default User
