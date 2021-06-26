const express = require('express')
require('./db/mongoose')
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const passport = require("passport")
const Localstrategy = require("passport-local")
const methodOverride = require("method-override")
const User = require('./models/user')
const userRoutes = require('./routes/user')
var cors = require('cors')


const app = express()
const PORT = 5000
app.use(cors())


app.use(express.json())  // comment
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Tihs is secret!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());


// passport.serializeUser(function(user, done) {
//     done(null, user.email);
//   });

  passport.deserializeUser(User.deserializeUser());

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})
// By aryan
// First commit by Shivam

// First commit by Shivam
// First commit by Divyansh
