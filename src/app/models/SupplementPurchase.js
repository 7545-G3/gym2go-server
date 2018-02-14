import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  supplement: { type: Schema.Types.ObjectId, ref: 'Product' },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  cant: { type: Number },
  qrImage: { type: String }
})

const SupplementPurchase = mongoose.model('SupplementPurchase', schema)

export default SupplementPurchase
