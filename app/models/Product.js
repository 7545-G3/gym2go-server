import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  type: { type: String }
})

const Product = mongoose.model('Product', schema)

export default Product