import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const AdminUser = mongoose.model('AdminUser', schema)

export default AdminUser