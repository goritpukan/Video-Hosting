import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
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

export default mongoose.model("Comment", CommentSchema);