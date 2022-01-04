const Sondage = require('../models/sondage');
const Vote = require('../models/vote');


/** Get All Sondage */
//done
exports.getAll = (req, res, next) => {
	Sondage.find().populate('user_id').then(sondages => {
		res.send(sondages);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}

//done
exports.getById = (req, res, next) => {
	Sondage.findById(req.params.id).populate('user_id').then(bugs => {
		res.send(bugs);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}

/*get by userId*/
//done
exports.getByUserId = (req, res, next) => {
	Sondage.find({ user_id: req.body.user_id}).populate('user_id').then(sondages => {
		res.send(sondages);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}

/**create Sondage */
//done
exports.createSondage = (req, res, next) => {
	req.body.created_at = Date.now();
    req.body.updated_at = Date.now();
	var sondage = new Sondage(req.body);
	sondage.save().then(data => {
		return res.status(201).json({ success: true, msg: 'Successful created new Sondage', sondage: data });  //creation successfull
	}).catch(err => {
		console.log(err)
		return res.status(403).json({ err: err });
	});


}


// Update Sondage Title or description  
//done
exports.updateSondage = (req, res, next) => {
	sondage = new Object();
	console.log(req.body);
	if (req.body.title)
	{
		sondage.title = req.body.title ;
	}  
	if (req.body.description)
	{
		sondage.description = req.body.description ;
	}  
	
	req.body.updated_at = Date.now();
	console.log("new Sondage is :", sondage);
	sondage.updated_at = Date.now();
	Sondage.updateOne({ _id: req.params.id }, sondage).then(
		() => {
			res.status(201).json({
				message: 'Sondage updated !'
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

  /*Delete Sondage by Id */
  //done
  exports.deleteSondage = (req, res, next) => {
    Sondage.deleteOne({ _id: req.params.id }).then(
      () => {
          Vote.deleteMany({sondage_id:req.params.id}).exec();
        res.status(201).json({
          message: 'Sondage Deleted !'
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