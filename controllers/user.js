
const User = require('../models/user');
const Sondage = require('../models/sondage');
const Vote = require('../models/vote');
const jwt = require('jsonwebtoken');
//login function

exports.login = (req, res,next) => {
  User.findOne({
    userName: req.body.userName
    }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
        });
          // return the information including token as JSON
        var   responseUser = {
            email: user.email,
            role: user.role,
            userName: user.userName,
            _id : user._id
          } 
          res.json({success: true, token: 'JWT ' + token ,user: responseUser});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}

//Get User Function
exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}


//Get All User 
exports.getAllUsers = (req, res, next) => {
	User.find().then(user => {
		res.send(user);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}


//Update User function
exports.updateUser = (req, res, next) => {
    console.log("i'm updating the User now");
    console.log(req.body);
    
    let user = new User({
       userName: req.body.userName,
       email: req.body.email,
     });
      console.log('hani badaltou'+user);
  User.updateOne({ _id: req.body._id }, req.body).then(
    () => {
      res.status(201).json({
        message: 'User updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



/*
//Update user Role
*/

exports.updateUserRole = (req, res, next) => {
	user = new Object();
	console.log(req.body);

	if (req.body.role)
		{user.role = req.body.role;}
	console.log("new User is :", user);
	User.updateOne({ _id: req.params.id }, user).then(
		() => {
			res.status(201).json({
				message: 'User role updated !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}
/* Sign Up function */
exports.signup = (req, res, next) => {
  

    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'}); //missing parameters
    } else {
      var newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      // save the user
     
      
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email or username already exists'}); //If email exists already
        }
        res.json({success: true, msg: 'Successful created new user.'});  //creation successfull
      });
    }
    

}
 /*
Delete User
*/

exports.deleteUser = (req, res, next) => {
  
	User.deleteOne({ _id: req.params.id }).then(
		() => {
      Sondage.deleteMany({user_id: req.params.id}).exec();   
      Vote.deleteMany({user_id: req.params.id}).exec();
			res.status(201).json({
				message: 'Users Deleted !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}

