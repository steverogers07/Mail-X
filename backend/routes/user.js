var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

//handle sign up logic
router.post("/register", async function(req,res){
	var newUser = new User({username: req.body.username, email: req.body.email});
	User.register(newUser , req.body.password, function(err,user){
		if(err) {
			console.log(err);
			// req.flash("error", err.message);
            return res.status(400).send({err})
		}
		passport.authenticate("local")(req, res, function(){
			console.log(newUser);
			// req.flash("success", "Welcome " + user.username);
			res.status(200).send({newUser});
		});
	});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
    console.log(req.user)
    console.log(res)
    const user = req.user;
    res.status(200).send({user})
});

// logout route
router.get("/logout", async function(req,res) {
	req.logout();
	// req.flash("success", "Logged you out!");
    res.status(200).send("Succesfully Logged Out")
});

module.exports = router;