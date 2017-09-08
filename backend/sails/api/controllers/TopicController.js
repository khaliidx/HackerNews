/**
 * TopicController
 *
 * @description :: Server-side logic for managing topics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	showTopics: function(req,res){

		Topic.find().exec((err,topics) => {
			if(err) return res.send(err);
			return res.send({topics: topics});
			//res.view('topics',{topics: topics});
		});
	},

	showTopic: (req,res) => {
		Topic.findOne({id: req.params.id}).populateAll().exec( (err,topic) => {
			if(err) return res.send(err)
			console.log(topic)
			res.send(topic)
		})
	},


	newTopic: function(req,res){
		var topic = req.body;

		User.findOne({username: req.body.user}).exec( (err, u) => {
			if(err) return res.send(err)
			if(!u) return res.send("User not found. This should not even happen...")	

			let topic = {
				user: u,
				title: req.body.title,
				content: req.body.content
			}
			Topic.create(topic,function(err,tc){
				if(err) return res.send(err);
				else return res.json("topic created: "+tc);
			});

		})


		
	},


	addComment: function(req,res){


		User.findOne({username: req.body.oc}).exec( (err,u) => {

			Topic.findOne({title: req.body.title}).populateAll().exec( (err, topic) => {
				
				Comment.create({owner: u, content: req.body.content, topic: topic}).exec((err,ct) => {
					if(err) res.send(err)

					topic.commentsNbr++
					topic.comments.add(ct)
					topic.save()	
					res.send(ct)
				})
			})

			

		})
	},

	showComments: function(req,res){
		
		Topic.findOne({title: req.body.title}).populateAll().exec( (err, topic) => {
			
			Comment.find().where({topic: topic}).populateAll().exec( (err,cts) =>{
				if(err) res.send(err)
				console.log(JSON.stringify(cts))
				res.send(cts);
			})

		})

			
	},


	upvote: function(req,res){

		var voter = req.body.user;

		Topic.findOne({title: req.body.title},function(err,topic){
			if(err) return res.send(err);

			var upvotes = topic.upvotes+1;
			var voters = topic.voters ? topic.voters : [];
			
			if(voters.find(function(e){return e==voter;}) ){
				return res.json("user upvoted already");
			}
			voters.push(voter);

			Topic.update({title:req.body.title},{upvotes: upvotes,voters: voters},function(err,updated){
				if(err) return res.send(err);
				return res.send(updated);
			});


		});
	},

	

};

