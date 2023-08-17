const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TaskManagement', { useNewUrlParser: true }).then(() => {
    console.log("Connected successfully :)");
}).catch((e) => {
    console.log("Error");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};