import { createError } from "../error.js";
import Answer from "../models/Answer.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const createAnswer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const newAnswer = new Answer({ userId: req.user.id, content: req.body.content, commentId: req.params.commentId });

    const savedAnswer = await newAnswer.save();
    await Comment.findByIdAndUpdate(req.params.commentId, { $push: { answers: newAnswer.id } });
    await User.findByIdAndUpdate(req.user.id, { $push: { postedAnswers: savedAnswer.id } });
    res.status(200).json(savedAnswer);

  } catch (err) {
    next(err);
  }
}
export const updateAnswer = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const answer = await Answer.findById(req.params.id);
    if (!answer) return next(createError(404, "Answer not found!"));

    if (answer.userId !== req.user.id) return next((createError(403, "You can update only your answer!")));

    const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, {
      $set: {isEdited: true, ...req.body}
    }, { new: true });

    res.status(200).json(updatedAnswer);

  }catch(err){
    next(err);
  }
}

export const deleteAnswer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const answer = await Answer.findById(req.params.id);
    if (!answer) return next(createError(404, "answer not found!"));

    if (answer.userId !== req.user.id) return next((createError(403, "You can delete only your answer!")));

    await Answer.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user.id, {$pull: {postedAnswers: answer.id}});
    if (user.likedAnswers.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedAnswers: answer.id } });
    }
    await Comment.findByIdAndUpdate(answer.commentId, {$pull: {answers: req.params.id}})
    await Comment.find();

    res.status(200).json("Answer has been deleted!");
  } catch (err) {
    next(err);
  }
}
export const getAnswers = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(createError(404, "Comment not found!"));

    if(!comment.answers.length) return next(createError(404, "Answers not  found"))

    res.status(200).json(comment.answers);
  } catch (err) {
    next(err);
  }
}

export const addLike = async (req, res, next) => {
  try {
    const answer = Answer.findById(req.params.id);
    if (!answer) return next(createError(404, "Answer not found!"));

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    if (user.likedComments.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedAnswers: req.params.id } });
      await Answer.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } });
      return res.status(200).json("Like removed!");
    }

    await User.findByIdAndUpdate(req.user.id, { $push: { likedAnswers: req.params.id } });
    await Answer.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });

    return res.status(200).json("Like added!");
  } catch (err) {
    next(err);
  }
}

