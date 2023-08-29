import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import validator from "validator";


import { createError } from "../error.js"
import User from "../models/User.js";

export const signup = async (req, res, next) => {
    try {
        if(!validator.isEmail(req.body.email)) return next(createError(422, "Email is invalid"));
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JWT_KEY, { expiresIn: 3 * 24 * 60 * 60, });
        res.cookie("access_token", token, {
            httpOnly: true,
        });

        const {password, ..._user} = newUser._doc;
        res.status(200).send(_user);


    } catch (err) {
        next(err);
    }

}


export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            next(createError(404, "User not found"));
        }

        if (bcrypt.compareSync(password, user.password)) {
            const {password, ..._user} = user._doc;
            
            const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: 3 * 24 * 60 * 60, });
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).send(_user);
        } else {
            next(createError(404, "Password is incorrect"));
        }

    } catch (err) {
        next(err);
    }
}


export const google = (req, res) => {

}