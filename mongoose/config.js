const mongoose = require('mongoose');
const db = require('../config').mongoURI;

mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('mongodb connected')).catch(err => console.log(err));
