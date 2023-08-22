import { createError } from "../error.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const createAnswer = async (req, res, next) => {
  try {
    const comment = Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found!"));

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const newAnswer = new Answer({ userId: req.user.id, commentId: req.params.id, content: req.body.content });

    await Comment.findByIdAndUpdate(req.params.id, { $push: { answers: newAnswer } }, { new: true });

    const savedAnswer = await newAnswer.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { postedComments: savedAnswer.id } });
    res.status(200).json(savedAnswer);

  } catch (err) {
    next(err);
  }
}