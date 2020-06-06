var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/hungr", {useNewUrlParser: true,
useCreateIndex:true,
useUnifiedTopology: true,
useFindAndModify:false
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected db')
  // we're connected!
});