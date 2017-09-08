/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'mongo',
  autoPK: false,

  attributes: {

  	username: {
  		type : "string",
  		required: true,
      primaryKey: true,
  	},

  	facebookId: {
      type: 'string',
      required: true,
      unique: true
    },

    comments: {
      collection: 'comment',
      via: 'owner'
    },

    topics: {
      collection: 'topic',
      via: 'user'
    }

  },
};

