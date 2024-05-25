import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";
import Answer from "../models/Answer.js";



export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true });

      const { password, ..._updatedUser } = updatedUser._doc;
      res.status(200).json(_updatedUser);

    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await Video.find({userId: req.params.id}).deleteMany();
      await Comment.find({userId: req.params.id}).deleteMany();
      await Answer.find({userId: req.params.id}).deleteMany();
      await User.findByIdAndDelete(req.params.id,);
      res.status(200).json("User has been deleted");

    } catch (err) {
      next(err);
    }

  } else {
    return next(createError(403, "You can delete only your account!"));
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ..._user } = user._doc;
    res.status(200).json(_user);
  } catch (err) {
    next(err);
  }
}

export const subscribe = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) return next(createError(403, "You can't subcsribe yourself"));

    const user = await User.findById(req.user.id);
    if(!user) return next(404, "User not found!");

    if (user.subscribedUsers.includes(req.params.id)) return next(createError(403, "You already subscribed"));

    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subscription successfull");

  } catch (err) {
    next(err);
  }
}

export const unsubscribe = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) return next(createError(403, "You can't unsubcsribe yourself"));

    const user = await User.findById(req.user.id);
    if(!user) return next(404, "User not found!");

    if (!user.subscribedUsers.includes(req.params.id)) return next(createError(403, "You are not subscribed"));

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("Unsubscription successfull");

  } catch (err) {
    next(err);
  }
}
