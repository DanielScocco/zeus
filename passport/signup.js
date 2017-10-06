var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var CurrentStock = require('../models/currentStock');
var Store = require('../models/store');
var Company = require('../models/company');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        //create company

                        var company = new Company();
                        company.save(function(err) {
                            if (err) console.log('Error in Saving New Company: '+err);

                        });               
                            


                        /*


                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.body.email;
                        newUser.role = 10;
                        newUser.storeIds = ['59c8f6ab734d1d72c630c4b5'];
                        newUser.companyId = '59c8f67b734d1d72c630c49a';

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');
                              
                            //create currentStock
                            var currentStock = new CurrentStock();
                            currentStock.companyId = '59c8f67b734d1d72c630c49a';
						    currentStock.storeId = '59c8f6ab734d1d72c630c4b5';
						    currentStock.lastUpdate = new Date();
						    currentStock.list = {};

						    currentStock.save(function(err) {
					            if (err){
					                console.log('Error in Saving CurrentStock: '+err);  
					                throw err;  
					            }
					            console.log('CurrentStock Registration succesful');       
					        }); 

                            return done(null, newUser);
                        });

                        */
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}