const MongoStore = require('connect-mongo');
console.log('MongoStore.create:', typeof MongoStore.create);
console.log('MongoStore.MongoStore.create:', typeof MongoStore.MongoStore.create);
console.log('MongoStore.default.create:', typeof MongoStore.default && typeof MongoStore.default.create);
