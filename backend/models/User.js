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
  },
  img:{
    type: String
  },
  fromGoogle: {
    type: Boolean,
    default: false,
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
  },
  postedComments: {
    type: [String],
  },
  likedComments: {
    type: [String],
  },
  postedAnswers: {
    type: [String],
  },
  likedAnswers: {
    type: [String],
  },

}, { timestamps: true });

export default mongoose.model("User", UserSchema);