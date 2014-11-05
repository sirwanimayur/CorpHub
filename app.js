// app.js

// BASE SETUP
// ==============================================

var express = require('express');
var path 	= require("path");
var app     = express();
var server 	= require('http').Server(app);
var port    = process.env.PORT || 3000;
var io 		= require('socket.io').listen(server);
var passport = require('passport');
var GoogleStrategy	= require('passport-google').Strategy;
var config	= require('./custom_modules/configuration.js');

// ROUTES
// ==============================================

// we'll create our routes here

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	// continue doing what we were doing and go to the route
	next();	
});

// home page route (http://localhost:8080)
router.get("/", function(req, res, next){
	res.sendFile(path.join(__dirname, 'index.html'));
});


// apply the routes to our application
app.use('/', router);


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
