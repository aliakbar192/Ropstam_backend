// Import required modules
const catchAsync = require('../utils/catchAsync');
const { httpStatus, message } = require('../utils/constant');
const ApiResponse = require('../utils/ApiResponse');
const { authService } = require('../services');

// Define an asynchronous function to handle user registration
const register = catchAsync(async (req, res) => {
    // Call the authService to register the user using request body data
    const user = await authService.registerUser(req.body);

    // Send a JSON response with a success message and the registered user information
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            user: user,
        }),
    );
});

// Define an asynchronous function to handle user login
const login = catchAsync(async (req, res) => {
    // Call the authService to log in the user with the provided email and password
    const user_token = await authService.loginUserWithEmail(req.body);

    // Send a JSON response with a success message and the login token
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            data: user_token,
        }),
    );
});

// Export the register and login functions for use in routes or other modules
module.exports = {
    register,
    login,
};
