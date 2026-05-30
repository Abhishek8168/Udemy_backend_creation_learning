import {ApiResponse} from "../utils/api-response.js"

const healthcheck = async (req, res, next) => {
    try {
        const user = await getUserFromDb();
        res.status(200).json(
            new ApiResponse(200, {message: "Server is running"})
        )
    } catch (error) {
        next(err);
    }
}


export {healthcheck}

