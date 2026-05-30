class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}


export {ApiResponse};
// to import in other files: import { ApiResponse } from "./utils/api-response.js"