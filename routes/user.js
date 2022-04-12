const express = require('express'); 
const {
    createUser, getUser,getUsers
} = require('../controllers/userController');

const router = express.Router() ;

router.route('/')
            .post(createUser)
                .get(getUsers);
        
router.route('/:id')
        .get(getUser)


               

        

module.exports = router ;