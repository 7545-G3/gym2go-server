import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = Schema({
  name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  trainers: [{type: Schema.Types.ObjectId, ref: 'Trainer'}],
  ownerUser: {type: Schema.Types.ObjectId, ref: 'AdminUser'}
})

const Gym = mongoose.model('Gym', schema)

export default Gym