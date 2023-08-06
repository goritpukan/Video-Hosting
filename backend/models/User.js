import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nickname:{
    type: String,
    required: true,
    unique: true
  }, 
  email:{
    type: String,
    required: true,
    unique: true
  }
  
});