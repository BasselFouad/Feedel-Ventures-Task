const express = require('express'); 
const {
    createExchangeRequest, getExchangeRequest,getExchangeRequests,getExchangeRequestsByGenre,getProposals
} = require('../controllers/exchangeRequestController');

const router = express.Router() ;

router.route('/genre')
            .get(getExchangeRequestsByGenre)
router.route('/proposals/:user_id')
            .get(getProposals)
router.route('/')
            .post(createExchangeRequest)
                .get(getExchangeRequests);
        
router.route('/:id')
        .get(getExchangeRequest)


               

        

module.exports = router ;