var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Mongodb connect
mongoose.connect('mongodb://127.0.0.1/data', function (err) {
    console.log('base connected');
});


//App config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    exteded: true
}));

/// Mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);








//Server listen
app.listen(3000, '127.0.0.1', function (err) {
    console.log('server start');
})
