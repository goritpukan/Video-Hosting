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
    answers: {
        type: [String],
    }

},
    { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);