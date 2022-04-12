const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const ExchangeRequest = require('../models/ExchangeRequest'); 
const Book = require('../models/Book')

//desc Get all exchangeRequests 
//@route GET /v1/exchangeRequests
exports.getExchangeRequests = asyncHandler( async(req, res, next)=>{
    const exchangeRequests = await ExchangeRequest.find();
    res.status(200).json({
        success: true ,
        exchangeRequests : exchangeRequests
    });
})

//desc Get single exchangeRequest 
//@route GET /v1/exchangeRequests/:id
exports.getExchangeRequest = asyncHandler( async(req, res, next)=>{
    
    const exchangeRequest = await ExchangeRequest.findById(req.params.id);
    if(!exchangeRequest){
        return next(new ErrorResponse(`ExchangeRequest not found with id of ${req.params.patientId}`,404));
    }
    res.status(200).json({
        success:true,
        exchangeRequest:exchangeRequest
    })
})

//desc Get exchangeRequestby genre
//@route GET /v1/exchangeRequests/genre
exports.getExchangeRequestsByGenre = asyncHandler( async(req, res, next)=>{
    
    if(!req.query.genre){
        return next(new ErrorResponse(`Please enter wanted genre`,404));
    }
    console.log(req.query.genre)
    const exchangeRequest = await ExchangeRequest.find({genre_preferences : req.query.genre})
    if(exchangeRequest.length==0){
        return next(new ErrorResponse(`ExchangeRequest not found with wanted genre}`,404));
    }
    res.status(200).json({
        success:true,
        exchangeRequest:exchangeRequest
    })
})

exports.getProposals = asyncHandler( async(req, res, next)=>{

    //get my exchange requests
    let exchangeRequestsGenres = await ExchangeRequest.find({user_id : req.params.user_id},{genre_preferences:1,_id:0})
    
    const genresSet = new Set()
    for(let i =0 ; i < exchangeRequestsGenres.length ; i++){
        genresSet.add(exchangeRequestsGenres[i].genre_preferences[0])
    }
    let genresArray = Array.from(genresSet)
    console.log(genresArray)
    //get books of these genres 
    const books = await Book.find({
        genre:{
            $in: genresArray
        }
    })

    if(!books){
        return next(new ErrorResponse(`No books of this genre found`,404));
    }
    res.status(200).json({
        success:true,
        books
    })

})

//desc create exchangeRequest 
//@route POST /v1/exchangeRequests
exports.createExchangeRequest = asyncHandler( async(req, res, next)=>{

    const exchangeRequest = await ExchangeRequest.create(req.body);

    return res.status(201).json({
        success:true,
        data:exchangeRequest
    })
})

//desc update exchangeRequest
//@route PUT /v1/:id
exports.updateExchangeRequest = asyncHandler( async(req, res, next)=>{
    
    const exchangeRequest = await ExchangeRequest.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    });

    if(!exchangeRequest){
        return next(new ErrorResponse(`ExchangeRequest not found with id of ${req.params.patientId}`,404));
    }
    
    return res.status(200).json({
        success:true,
        data:exchangeRequest
    })
})

//desc delete exchangeRequest 
//@route DELETE /v1/exchangeRequests/:id
exports.deleteExchangeRequest = asyncHandler( async(req, res, next)=>{
    
    await ExchangeRequest.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        data:{}
    })
})
