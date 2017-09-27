var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


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
app.use(methodOverride('_method'));

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

var Blog = mongoose.model('Blog', blogSchema);



//RESTful Routes

// Index route
app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                blogs: blogs
            });
        }
    });
});

//New route
app.get('/blogs/new', function (req, res) {
    res.render('new');
});

//Post route
app.post('/blogs', function (req, res) {
    var data = {
        title: req.body
    }
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/blogs');
        };
    });
});

//Show route
app.get('/blogs/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {
                blog: foundBlog
            });
        }
    });
});

//Edit Route
app.get('/blogs/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {
                blog: foundBlog
            });
        };
    });

});

//Update route 
app.put('/blogs/:id', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog,
        function (err, updatedBlog) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/blogs/' + req.params.id);
            }
        });
});

//Delete Route 
app.delete('/blogs/:id', function (req, res) {

});

// Index redirect
app.get('/', function (req, res) {
    res.redirect('/blogs');
});





//Server listen
app.listen(3000, '127.0.0.1', function (err) {
    console.log('server start');
})
