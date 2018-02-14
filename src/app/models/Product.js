import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  type: { type: String },
  category: { type: String }
})

const Product = mongoose.model('Product', schema)

export default Product
