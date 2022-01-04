var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../config/passport')(passport);


const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

/* GET get Account*/
router.get('/get/:id', userCtrl.getUser)

/* GET get all Accounts*/
router.get('/get', userCtrl.getAllUsers)

/* POST login account */
router.post('/login', userCtrl.login );

/* PUT update account */
router.put('/update'  , auth, userCtrl.updateUser);
  
/* POST create account */
router.post('/register', userCtrl.signup);

  /* Delete Account 
router.delete('/:id', auth , userCtrl.deleteAccount);*/
/*Update Account role*/
router.put('/update/:id', auth , userCtrl.updateUserRole);




module.exports = router;