import { createError } from "../error.js";

import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import Answer from "../models/Answer.js";

export const createComment = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.videoId);
    if (!video) return next(createError(404, "Video not found!"));

    const newComment = new Comment({ userId: req.user.id, videoId: req.params.videoId, content: req.body.content });

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"))

    const savedComment = await newComment.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { postedComments: savedComment.id } });
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
    console.log(err);
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const comment = await Comment.findById(req.params.id);

    if (!comment) return next(createError(404, "Comment not found!"));

    if (comment.userId !== req.user.id) return next((createError(403, "You can update only your comment!")));

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));

    if (comment.userId !== req.user.id) return next((createError(403, "You can delete only your comment!")));

    await Comment.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user.id, { $pull: { postedComments: comment.id } });

    if (user.likedComments.includes(comment.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedComments: comment.id } });
    }

    comment.answers.map(async answerId => {
      await Answer.findByIdAndDelete(answerId);
    });
    //протестить как работает и сделать чтобы у юзера при удалении удаляло все его коменты и видео

    res.status(200).json("Comment has been deleted!");
  } catch (err) {
    next(err);
  }
}
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ likes: -1 });
    if (!comments) return next(createError(404, "Comments not found!"));

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

export const addLike = async (req, res, next) => {
  try {
    const comment = Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    if (user.likedComments.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedComments: req.params.id } });
      await Comment.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } });
      return res.status(200).json("Like removed!");
    }

    await User.findByIdAndUpdate(req.user.id, { $push: { likedComments: req.params.id } });
    await Comment.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });

    return res.status(200).json("Like added!");
  } catch (err) {
    next(err);
  }
}


