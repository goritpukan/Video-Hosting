import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [String],
  },
  watchedVideos: {
    type: [String],
  },
  likedVideos: {
    type: [String],
  },
  dislikedVideos: {
    type: [String],
  },
  postedVideos: {
    type: [String],
  }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);