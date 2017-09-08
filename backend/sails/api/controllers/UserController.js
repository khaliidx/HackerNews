/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

const jwt = require('jwt-simple');
const moment = require('moment');




module.exports = {


   home: function(req,res){
     res.view('home');
   },

	logout: function (req, res){
    res.locals.user = null;
    req.cookies.user = null;
    req.cookies.token = null;
    console.log(req.cookies.token);
    req.logout();
    req.session.flash = 'You have logged out';
    res.redirect('/');
  },


  'facebook': (req, res) => {
        // check if the token valid w/ facebook


        fbId = req.body.id;
        name = req.body.name;

        User.findOne({
            facebookId: fbId
        }, (err, usr) => {
            if (usr) {
                let payload = {
                    sub: usr.id,
                    exp: moment().add(10, 'days').unix()
                }
                let token = jwt.encode(payload, "yooi");
                res.status(200).send({
                    user: usr.toJSON(),
                    token: token
                })

                console.log(usr)

            } else {
                let newUser = {};
                newUser.facebookId = fbId;
                newUser.username = name;
                User.create(newUser).exec((err, newUser) => {
                    if(err) res.send(err);
                    let payload = {
                        sub: newUser.facebookId,
                        exp: moment().add(10, 'days').unix()
                    }
                    let token = jwt.encode(payload, "yooi");

                    res.status(200).send({

                        user: newUser.toJSON(),
                        token: token
                    })

                    console.log(newUser);
                })
            }
        });

    }





};

