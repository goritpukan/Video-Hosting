import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    answers: {
        type: [Object],
    }

},
    { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);