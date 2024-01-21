const catchAsync = require('../utils/catchAsync');
const { httpStatus, message } = require('../utils/constant');
const ApiResponse = require('../utils/ApiResponse');
const { authService } = require('../services');

const register = catchAsync(async (req, res) => {
    const user = await authService.registerUser(req.body);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            user: user,
        }),
    );
});
const login = catchAsync(async (req, res) => {
    const user_token = await authService.loginUserWithEmail(req.body);
    res.json(
        new ApiResponse(httpStatus.OK, message.SUCCESS, {
            data: user_token,
        }),
    );
});

module.exports = {
    register,
    login,
};
