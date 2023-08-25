import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },

},
    { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);