var mongo = require('mongodb'),
	settings = require('./config').settings
	crypto = require('crypto');
	
var getDb = function(){
	return new mongo.Db(settings.databaseName, new mongo.Server(settings.databaseHost, settings.databasePort, {}));
}

var execute = function(collection, callback){
	var db = getDb();
	db.open(function(err, client){
		db.collection(collection, function(err, collection){
			callback(db, collection);
		});
	});
}
	
var hashPassword = function(password){
	var hasher = crypto.createHash('sha256');
	hasher.update('fsL$dsalt-#99*' + password);
	return hasher.digest('hex');
}

exports.getDb = getDb;

exports.execute = execute;

exports.authenticate = function(username, password, successCallback, failureCallback){
	execute(settings.userCollection, function(db, collection){
		collection.find({username: username, password: hashPassword(password)}).toArray(function(err, results){
			if (results && results.length == 1)
				successCallback(results[0]);
			else
				failureCallback();
			
			db.close();
		});
	});
};

exports.hashPassword = hashPassword;