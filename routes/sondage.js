var express = require('express');
var router = express.Router();


const auth = require('../middleware/auth');
const sondageCtrl = require('../controllers/sondage');

/* GET get Sondage*/
router.get('/get/:id', sondageCtrl.getById)

/* GET get all Sondage*/
router.get('/get', sondageCtrl.getAll)
/*GET by User Id*/
router.get('/getByUserId', sondageCtrl.getByUserId)



/* create  Sondage */
router.post('/create'  , sondageCtrl.createSondage);
  
  /* Delete Sondage */
router.delete('/delete/:id', auth , sondageCtrl.deleteSondage);
/*Update Sondage*/
router.put('/update/:id', auth , sondageCtrl.updateSondage);




module.exports = router;