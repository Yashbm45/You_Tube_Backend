import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"



const healthcheck = asyncHandler(async (req, res) => {
    if (app.status() < 400 ){
    res.status(200).json(new ApiResponse(200, null, "Service is up and running"));
    }
    else{
    res.status(500).json(new ApiError(500,"Something went wrong" ))
    }
});

export {
    healthcheck
};
