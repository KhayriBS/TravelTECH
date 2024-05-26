import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'guide', 'client'],required:true },
  isActivated:{type: Boolean, default:false},
  isBanned:{type: Boolean, default:false},
  // guide :
  specialization: String,
  rating: Number,
  language: String,
  // client :
  first_name: String,
  last_name: String,
  phone: String,
  address: String,
  country: String, 
  birthDate: Date,
  image:String,
  passportNumber: String,
  token:String
}, { timestamps: true });

export default model("user", userSchema);
