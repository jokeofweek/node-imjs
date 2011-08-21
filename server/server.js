var net = require('net'),
	config = require('./config'),
	settings = config.settings,
	io = require('socket.io').listen(settings.serverPort),
	database = require('./db');
	
var chat = io
	.set('log level', 1)
	.of('/chat')
	.on('connection', function(socket){
		socket.on('msg', function(data){
			socket.get('name', function(err, name){
				socket.broadcast.to('main').emit('msg',name + ': ' + data + '\n');
			});
		});
		
		socket.on('login', function(data){
			if (data.username && data.password){
				database.authenticate(data.username, data.password, 
					function(userDocument){
						socket.set('name', data.username, function(){
							socket.set('loginStatus', true);
							socket.emit('login-success', {name: data.username});
							socket.join('main');
							settings.onConnect(socket)
						});
					},
					function(){
						socket.emit('login-error','Invalid credentials.');
					}
				);
			} else {
				socket.emit('login-error','Username and password are required.');
			}
		});
		
		socket.on('create', function(data){
			if (data.username && data.password){
				database.execute(settings.userCollection, function(connection, collection){
					collection.find({username: data.username}).toArray(function(err, results){
						if (results  && results.length > 0){
							connection.close();
							socket.emit('create-error', 'A user already exists with that name.');
						} else {
							collection.insert({username: data.username, password: database.hashPassword(data.password)}, {safe: true}, function(err, objects){
								socket.emit('create-success','');
								connection.close();
							});
						}
					});
				});
			} else {
				socket.emit('create-error', 'Username and password are required.');
			}
		});
		
		socket.on('disconnect', function(data){
			socket.get('loginStatus', function(err, loginStatus){
				settings.onDisconnect(socket, loginStatus === true);
			});
		});
	});
