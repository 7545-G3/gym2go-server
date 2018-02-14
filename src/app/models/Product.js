import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  type: { type: String },
  category: { type: String },
  brand: { type: String },
  gender: { type: String, default: null }
})

const Product = mongoose.model('Product', schema)

export default Product
