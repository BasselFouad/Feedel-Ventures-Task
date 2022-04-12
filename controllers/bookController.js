const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Book = require('../models/Book'); 


//desc Get all books 
//@route GET /v1/books
exports.getBooks = asyncHandler( async(req, res, next)=>{
    const books = await Book.find();
    res.status(200).json({
        success: true ,
        books : books
    });
})

//desc Get single book 
//@route GET /v1/books/:id
exports.getBook = asyncHandler( async(req, res, next)=>{
    
    const book = await Book.findById(req.params.id);
    if(!book){
        return next(new ErrorResponse(`Book not found with id of ${req.params.patientId}`,404));
    }
    res.status(200).json({
        success:true,
        book:book
    })
})

//desc create book 
//@route POST /v1/books
exports.createBook = asyncHandler( async(req, res, next)=>{
    let newBook = req.body;
    console.log(req.files)
    newBook.image_path =  req.files['image'] && req.files['image'][0]?req.files["image"][0].filename: "";
    const book = await Book.create(req.body);

    return res.status(201).json({
        success:true,
        data:book
    })
})

//desc update book
//@route PUT /v1/:id
exports.updateBook = asyncHandler( async(req, res, next)=>{
    
    const book = await Book.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    });

    if(!book){
        return next(new ErrorResponse(`Book not found with id of ${req.params.patientId}`,404));
    }
    
    return res.status(200).json({
        success:true,
        data:book
    })
})

//desc delete book 
//@route DELETE /v1/books/:id
exports.deleteBook = asyncHandler( async(req, res, next)=>{
    
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        data:{}
    })
})
