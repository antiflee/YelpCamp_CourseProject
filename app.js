var express     = require("express");
var app         = express();
var passport    = require("passport");
var LocalStrategy= require("passport-local");
var methodOverride = require("method-override");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");
var seedDB      = require("./seeds");
var flash       = require("connect-flash");

// requiring routes
var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgrounds");
var indexRoutes         = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://antiflee:lyf5329987@ds029735.mlab.com:29735/yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();    // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This app.use passes the currentUser = req.user to EVERY route automatically, without manually type {currenUser: req.user} in the res.render() part.
app.use(function(req,res,next){
    res.locals.currentUser = req.user; // req.user is implemented by passport. Pass user as currentUser to every route (?)
    res.locals.error = req.flash("error"); // The variable is "error" for all routes, but the value to "error" depends on the definition in each route. See, for example, login.ejs.
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});

