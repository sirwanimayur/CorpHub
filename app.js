// app.js

// BASE SETUP
// ==============================================

var express 		= require('express');
var path 			= require("path");
var app     		= express();
var server 			= require('http').Server(app);
var port    		= process.env.PORT || 3000;
var io 				= require('socket.io').listen(server);
var passport 		= require('passport-oauth2');
var GoogleStrategy	= require('passport-google').Strategy;
var config			= require('./custom_modules/configuration');
var bodyParser 		= require('body-parser');
var crypto			= require('crypto');
var mongoose   		= require('mongoose');

//connection to database
mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]');

//loading models
var Token     = require('./app/models/token');

//Live Reload
var livereload = require('livereload');
liveserver = livereload.createServer();
liveserver.watch(__dirname+ "/public");

// ROUTES
// ==============================================

// we'll create our routes here

// get an instance of router
var router = express.Router();
var apiRouter = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	// continue doing what we were doing and go to the route
	next();	
});

// home page route (http://localhost:3000)
router.get("/", function(req, res, next){
	res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

//defining static content
router.use("/js", express.static(__dirname + "/bower_components"));
router.use("/css", express.static(__dirname + "/bower_components"));
router.use("/assets", express.static(__dirname + "/public"));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// apply the routes to our application
app.use('/api', apiRouter);
app.use('/', router);

// route middleware that will happen on every request
apiRouter.use(function(req, res, next) {

	// log each request to the console
	console.log("API REQ:", req.method, req.url);

	// continue doing what we were doing and go to the route
	next();	
});
apiRouter.route("/token")
	.get(function(req, res, next){
		crypto.randomBytes(32, function(ex, buf) {
			var token = new Token();
			token.tokenId = buf.toString('hex');
		    token.email = null;
		    token.createdAt = new Date();
		    token.updatedAt = new Date();

		    // save the token and check for errors
			token.save(function(err) {
				if (err)
					res.send(err);

				res.json(token);
			});
		});
	});


//Socket functions for chat starts here
io.sockets.on('connection', function (socket) {

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		//delete usernames[socket.username];
		// update list of users in chat, client-side
		//io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		//socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});


// START THE SERVER
// ==============================================
server.listen(port);
console.log('Express server started on ' + config.SERVER_ADD(port));
