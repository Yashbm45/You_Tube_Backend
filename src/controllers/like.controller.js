import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

// Toggle like on a video
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id; // Assuming req.user contains the authenticated user

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const existingLike = await Like.findOne({ video: videoId, user: userId });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        res.status(200).json(new ApiResponse(200, null, "Like removed from video successfully"));
    } else {
        const like = await Like.create({ video: videoId, user: userId });
        res.status(201).json(new ApiResponse(201, like, "Liked video successfully"));
    }
});

// Toggle like on a comment
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id; // Assuming req.user contains the authenticated user

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const existingLike = await Like.findOne({ comment: commentId, user: userId });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        res.status(200).json(new ApiResponse(200, null, "Like removed from comment successfully"));
    } else {
        const like = await Like.create({ comment: commentId, user: userId });
        res.status(201).json(new ApiResponse(201, like, "Liked comment successfully"));
    }
});

// Toggle like on a tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user._id; // Assuming req.user contains the authenticated user

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const existingLike = await Like.findOne({ tweet: tweetId, user: userId });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        res.status(200).json(new ApiResponse(200, null, "Like removed from tweet successfully"));
    } else {
        const like = await Like.create({ tweet: tweetId, user: userId });
        res.status(201).json(new ApiResponse(201, like, "Liked tweet successfully"));
    }
});

// Get all liked videos for the authenticated user
const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming req.user contains the authenticated user

    const likes = await Like.find({ user: userId, video: { $exists: true } }).populate('video');

    res.status(200).json(new ApiResponse(200, likes.map(like => like.video), "Liked videos fetched successfully"));
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
};
