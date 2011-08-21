Node-ImJS
===
Node-ImJS is a multi-user chat application for the web, supported by a Node.js server and a MongoDB database. Socket.io is used to support the data transfer between the Node server and the client.

Requirements
---
  - [Node.js](http://nodejs.org) __Note__: The socket.io package requires node be compiled with SSL support in order to use the _crypt_ package. This can be done by downloading the OpenSSL library before `make`'ing Node.
  - [MongoDB](http://www.mongodb.org/)
  - The [node-mongodb-native](https://github.com/christkv/node-mongodb-native) package, which can be installed using either _npm_ or _ryppi_
  - The [socket.io](http://socket.io/) package, which can be installed using either _npm_ or _ryppi_
  - Some kind of web server

Install
--- 

  1. The source code for the application must be placed in a sub-directory of the Node install path as it makes use of the node_modules folder (if the packages are installed using a package manager)
  2. A configuration file must  be created for the MongoDB server in order to specify the database location. In order to do this, create a mongo.config file with the following content

     _On windows_: `dbpath=<path to node-imjs install>server\data`
   
     _On linux/mac_: `dbpath=<path to node-imjs install>server/data`

  3. Start the MongoDB server by running: `mongod --config mongo.config`

  4. Start the Node.js server by switching to the server directory and running `node server.js`

  5. Transfer the files in the client folder to your web server's directory, and you can now access the client application, where you can create an account and connect to the chatroom.

Notes
---

  - In the server folder, a _config.js_ file is present where you may modify application settings such as the port on which the chat server runs and the name of the MongoDB collection to use.
  