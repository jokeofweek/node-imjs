exports.settings = {
	onConnect: function(socket){
		socket.get('name', function(err, name){
			socket.emit('msg', 'Welcome to the chatroom!\n\n');
			socket.broadcast.to('main').emit('msg', name + ' has joined the chatroom.\n');
		});
	},
	onDisconnect: function(socket, loginStatus){
		if (loginStatus){
			socket.get('name', function(err, name){
				socket.broadcast.to('main').emit('msg', name + ' has left the chatroom.\n');
			});
		}
	},
	databaseName: 'node-chat-server',
	databaseHost: 'localhost',
	databasePort: 27017,
	userCollection: 'users',
	serverPort: 5000
};