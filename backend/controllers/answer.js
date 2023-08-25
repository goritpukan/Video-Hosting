import { createError } from "../error.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const createAnswer = async (req, res, next) => {
  try {
    const comment = Comment.findById(req.params.commentId);
    if (!comment) return next(createError(404, "Comment not found!"));

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const newAnswer = new Answer({ userId: req.user.id, content: req.body.content });

    const savedAnswer = await newAnswer.save();
    await Comment.findByIdAndUpdate(req.params.commentId, { $push: { answers: newAnswer.id } });
    await User.findByIdAndUpdate(req.user.id, { $push: { postedComments: savedAnswer.id } });
    res.status(200).json(savedAnswer);

  } catch (err) {
    next(err);
  }
}