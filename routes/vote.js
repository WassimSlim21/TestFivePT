var express = require('express');
var router = express.Router();


const auth = require('../middleware/auth');
const voteCtrl = require('../controllers/vote');

/* GET get Sondage*/
router.get('/get/:id', voteCtrl.getById)

/* GET get all Sondage*/
router.get('/get', voteCtrl.getAll)
/*GET by User Id*/
router.get('/getByUserId', voteCtrl.getByUserId)
/*GET by Sondage Id*/
router.get('/getBySondageId', voteCtrl.getBySondageId)

/* create  Sondage */
router.post('/create'  , voteCtrl.createVote);
  /* Delete Sondage */
router.delete('/delete/:id', auth , voteCtrl.deleteVote);
/*Update Sondage*/
router.put('/update/:id' , voteCtrl.updateVote);


module.exports = router;