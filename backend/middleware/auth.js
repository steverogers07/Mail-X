// all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	// req.flash("error", "You need to be logged in to do that");
	// res.redirect("/login");
	res.status(400).send("Error");
}

module.exports = middlewareObj;