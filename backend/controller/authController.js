const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')



// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    
    const { name, email, password} =req.body

    

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "products/tzfsnrli3szrdnb4jgge",
            url: "https://res.cloudinary.com/shopit/image/upload/v1606231282/products/tzfsnrli3szrdnb4jgge.jpg"
        }
    })


    // const token = user.getJwtToken()

    // res.status(201).json({
    //     success: true,
    //     // user
    //     token
    // })
    sendToken(user, 200, res)
})


exports.loginUser = catchAsyncErrors( async (req, res, next) => {

    const { email, password} = req.body

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     // user
    //     token
    // })
    sendToken(user, 200, res)
})




exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })


    res.status(200).json({
        success: true,
        message: 'Logout successful'
    })
})