

module.exports = {  

	findU: (username) => {
		User.findOne({username:username},(err,u) => {
			if(err) return "not found!";
			return u;
		})
	},

	createComment:(user,content) => {
		Comment.create({user:user,content:content},(err,ct) =>{
			if(err) return "error: could not create comment!";
			//console.log(ct);
			return ct;
		})
	}



}