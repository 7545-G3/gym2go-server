import mongoose from 'mongoose'
import { Buffer } from 'buffer'

const Schema = mongoose.Schema

const schema = Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: Buffer },
  type: { type: String }
})

const Product = mongoose.model('Product', schema)

export default Product
