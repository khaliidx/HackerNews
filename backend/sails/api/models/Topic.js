/**
 * Topic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	connection: 'mongo',


  attributes: {
  	title: {
  		type: "string",
  		required: true,
  		size: 70
  	},

  	content: {
  		type: "string",
  		required: true,
  	},

  	user: {
  		model: 'user'
  	},

  	upvotes: {
  		type: "integer",
  		defaultsTo: 0,
  	},

  	voters: {
     type: "array",
     defaultsTo: [],
    },
  	
  	comments: {
  		collection: 'comment',
  		via: 'topic',
  	},

  	commentsNbr: {
  		type: "integer",
  		defaultsTo: 0,
  	},
  },
};

