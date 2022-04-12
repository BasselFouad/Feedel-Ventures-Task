const express = require('express'); 
const ErrorResponse = require('../utils/errorResponse');
const multer = require('multer')
const path = require('path');
const {
    createBook, getBook
} = require('../controllers/bookController');

const router = express.Router() ;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/book-images')

    },
    filename: function (req, file, cb) {
        cb(null,`book-${file.originalname}-${Date.now()}${path.extname(file.originalname)}` )

     
    }
})

const upload = multer({
    storage: storage
})

router.route('/')
            .post( upload.fields([{name: "image", maxCount: 1}]), createBook)
        
router.route('/:id')
        .get(getBook)


               

        

module.exports = router ;