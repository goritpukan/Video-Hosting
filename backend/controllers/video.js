import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"

export const createVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const savedVideo = await newVideo.save();
    await User.findByIdAndUpdate(req.user.id, {$push: {postedVideos: savedVideo.id}});
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
}

export const updateVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const video = await Video.findById(req.params.id);

    if (!video) return next(createError(404, "Video not found!"));

    if (video.userId !== req.user.id) return next((createError(403, "You can update only your video!")));

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
      $set: { userId: req.user.id, ...req.body },
    }, { new: true });

    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
}

export const deleteVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (video.userId !== req.user.id) return next((createError(403, "You can delete only your video!")));

    video.deleteOne();

    res.status(200).json("Video has been deleted!");
  } catch (err) {
    next(err);
  }
}

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
}


export const addView = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found"));

    await User.findByIdAndUpdate(req.user.id, { $push: { watchedVideos: req.params.id } });
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    return res.status(200).json("View added!");

  } catch (err) {
    next(err);
  }
}

// export const addViewUnauthorized = async (req, res, next) => {
//   const token = req.cookies.access_token;
//     if (!token) {
//       await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
//       return res.status(200).json("View added!");
//     }
// }
//do it later or delete

export const addLike = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    const user = await User.findById(req.user.id);

    if (!user) return next(createError(404, "User not found!"));

    if (user.likedVideos.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { likedVideos: req.params.id } });
      await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } });
      return res.status(200).json("Like removed!");
    }

    await User.findByIdAndUpdate(req.user.id, { $push: { likedVideos: req.params.id } });
    await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });

    return res.status(200).json("Like added!");
  } catch (err) {
    next(err);
  }
}

export const addDislike = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    const user = await User.findById(req.user.id);

    if (!user) return next(createError(404, "User not found!"));

    if (user.dislikedVideos.includes(req.params.id)) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { dislikedVideos: req.params.id } });
      await Video.findByIdAndUpdate(req.params.id, { $inc: { dislikes: -1 } });
      return res.status(200).json("Dislike removed!");
    }

    await User.findByIdAndUpdate(req.user.id, { $push: { dislikedVideos: req.params.id } });
    await Video.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } });

    return res.status(200).json("dislike added!");
  } catch (err) {
    next(err);
  }
}

export const getTrendVideos = async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
}

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    if (!videos.length) return next(createError(404, "Videos not found!"));
    res.status(200).json(videos);
  } catch (err) {
    next(err)
  }
}


export const getHomepageVideos = async (req, res, next) => {
  try {
    //do it later
  } catch (err) {
    next(err)
  }
}

export const getSubVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));
    const videos = Promise.all(
      user.subscribedUsers.map(channelId => {
        return Video.find({ userId: channelId });
      })
    );
    // if(!(await videos)[0].length) return next(createError(404, "Videos not found!"));
    res.status(200).json(videos);
  } catch (err) {
    next(err)
  }
}

export const search = async (req, res, next) => {
  try{
    const query = req.params.query;

    const videos = await Video.find({title: {$regex: query, $options: "i" }}).limit(40);

    if(!videos.length) return next(createError(404, "Video not found!"));

    res.status(200).json(videos);
  }catch(err){
    next(err);
  }
}
