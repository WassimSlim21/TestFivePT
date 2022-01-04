var express = require('express');
var router = express.Router();


const auth = require('../middleware/auth');
const voteCtrl = require('../controllers/vote');

/* GET get Vote*/
router.get('/get/:id', voteCtrl.getById)

/* GET get all Vote*/
router.get('/get', voteCtrl.getAll)
/*GET by User Id*/
router.get('/getByUserId', voteCtrl.getByUserId)
/*GET by Vote Id*/
router.get('/getByVoteId', voteCtrl.getBySondageId)

/* create  Vote */
router.post('/create'  , voteCtrl.createVote);
  /* Delete Vote */
router.delete('/delete/:id', auth , voteCtrl.deleteVote);
/*Update Vote*/
router.put('/update/:id' , voteCtrl.updateVote);
/* GET get Stats Vote*/
router.get('/stats', voteCtrl.getVotesStats)

module.exports = router;