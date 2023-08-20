import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description"
    },
    imgUrl: {
        type: String,
        default: "./defaultImage"
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    }, 
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },

},
    { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);