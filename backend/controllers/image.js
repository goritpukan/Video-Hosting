import { createError } from "../error.js"
import User from "../models/User.js"
import fs from "fs";

export const getImage = async (req, res, next) => {
  try{
    const filename = req.params.filename;
    const image = fs.readFileSync(`./img/${filename}`);
    if(!image){
      return next(404, "Image not found!");
    }
    res.status(200).json(image);

  }catch(err){
    next(err)
  }
}

export const changeAvatar =  async (req, res, next) => {
  try{
    if (req.params.id !== req.user.id)
      return;

    console.log(req.file);
    const user = await User.findByIdAndUpdate(req.user.id, {img: req.file.filename});
    if(!user){
      return next(404, "User not found!");
    }


    res.status(200).json(user.img);
  }catch(err){
    next(err);
  }
}

