
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createTweet = asyncHandler(async (req, res) => {
    // Create tweet
    const { content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.create({
        content,
        user: req.user._id, // Assuming req.user contains the authenticated user
    });

    res.status(201).json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
    // Get user tweets
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const tweets = await Tweet.find({ user: user._id });

    res.status(200).json(new ApiResponse(200, tweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
    // Update tweet
    const { content } = req.body;
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: { content },
        },
        { new: true }
    );

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    res.status(200).json(new ApiResponse(200, tweet, "Content updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
    // Delete tweet
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await Tweet.findByIdAndDelete(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Tweet deleted successfully"));
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
};
