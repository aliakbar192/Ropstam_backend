// Class representing a standardized API response
class ApiResponse {
    constructor(code, message, data) {
        this.code = code; // HTTP status code for the response
        this.message = message; // Message describing the response
        this.data = data; // Data payload of the response
    }
}

module.exports = ApiResponse;
