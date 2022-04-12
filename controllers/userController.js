const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User'); 


//desc Get all users 
//@route GET /v1/users
exports.getUsers = asyncHandler( async(req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true ,
        users : users
    });
})

//desc Get single user 
//@route GET /v1/users/:id
exports.getUser = asyncHandler( async(req, res, next)=>{
    
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.patientId}`,404));
    }
    res.status(200).json({
        success:true,
        user:user
    })
})

//desc create user 
//@route POST /v1/users
exports.createUser = asyncHandler( async(req, res, next)=>{
    
    const user = await User.create(req.body);

    return res.status(201).json({
        success:true,
        data:user
    })
})

//desc update user
//@route PUT /v1/:id
exports.updateUser = asyncHandler( async(req, res, next)=>{
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    });

    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.patientId}`,404));
    }
    
    return res.status(200).json({
        success:true,
        data:user
    })
})

//desc delete user 
//@route DELETE /v1/users/:id
exports.deleteUser = asyncHandler( async(req, res, next)=>{
    
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        data:{}
    })
})
