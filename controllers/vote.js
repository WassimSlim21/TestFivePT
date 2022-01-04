const Vote = require('../models/vote');

/** Get All Votes */
//done
exports.getAll = (req, res, next) => {
	Vote.find().populate('sondage_id user_id').then(sondages => {
		res.send(sondages);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}
/**Get Vote By Id */
//done
exports.getById = (req, res, next) => {
	Vote.findById(req.params.id).populate('user_id').populate('sondage_id').then(bugs => {
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
	Vote.find({ user_id: req.body.user_id}).populate('user_id').populate('sondage_id').then(votes => {
		res.send(votes);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}
/*get by userId*/
//done
exports.getBySondageId = (req, res, next) => {
	Vote.find({ sondage_id: req.query.id}).populate('user_id').populate('sondage_id').then(votes => {
		res.send(votes);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}
 
/**create Vote */
//done
exports.createVote = (req, res, next) => {
	req.body.created_at = Date.now();
    req.body.updated_at = Date.now();
	var count = 0;
	Vote.find({ "created_at":{$gt:new Date(Date.now() - 24*60*60 * 1000)}, user_id:req.body.user_id
	}).then(votes => {
		// console.log("lyoumaaa",votes);
	console.log("Nombre de votes",votes.length);

		// console.log("date", dd);
		count = votes.length;
	 });


	Vote.find({ sondage_id: req.body.sondage_id, user_id: req.body.user_id}).populate('user_id').populate('sondage_id').then(votes => {
		if(votes.length != 0 || count > 4){
			console.log("Vous avez voté", votes);
			res.status(400).json({ err: err });
		}
		else {
			var vote = new Vote(req.body);
			vote.save().then(data => {
				return res.status(201).json({ success: true, msg: 'Successful created new Vote', vote: data });  //creation successfull
			}).catch(err => {
				console.log(err)
				return res.status(403).json({ err: err });
			});
		}
	})
}






// Update Vote  
//done


exports.updateVote = (req, res, next) => {
	vote = new Object();
	console.log(req.body);
	if (req.body.vote)
	{
		vote.vote = req.body.vote ;
	}  
	
	req.body.updated_at = Date.now();
	console.log("new Vote is :", vote);
	vote.updated_at = Date.now();
	Vote.updateOne({ sondage_id: req.params.sondage_id }, vote).then(
		() => {
			res.status(201).json({
				message: 'Vote updated !'
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

  /*Delete Vote by Id */
  exports.deleteVote = (req, res, next) => {
    Vote.deleteOne({ sondage_id: req.params.sondage_id }).then(
      () => {
        res.status(201).json({
          message: 'Vote Deleted !'
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


exports.getVotesStats = (req, res, next) => {
	Vote.find({"vote":true, "sondage_id" :req.body.sondage_id}).populate('sondage_id user_id').then(sondages => {
		res.send(sondages);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}

exports.getVotesStats2 = (req, res, next) => {
    Vote.find().populate('sondage_id user_id').then(data => {
       var  stats = [];
       var total = 0;
        data.forEach((user) => {
            if (user.pack != null){
                total ++ ;
                index = stats.findIndex(x => x.pack ==user.pack.pack_name);
                if (index >= 0){
               stats[ index ].count ++ ;
               stats[ index ].users.push(user) ;

            } else 
            stats.push({pack : user.pack.pack_name, count : 1, users :[user]});
        }
            
        })
        res.send({stats,total});
      }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
          error: err
        });
      });
    }
