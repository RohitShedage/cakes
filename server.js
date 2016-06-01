var express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
multer  =   require('multer'),
path = require('path'),
fs = require('fs'),
cake = require('./app/server/Cake');


mongoose.connect('mongodb://localhost:27017/cakes');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, '12');
  }
});

var upload = multer({ storage : storage}).single('userPhoto');



app.use(bodyParser());

app.post('/api/cakes', cake.create);
app.get('/api/cakes', cake.listAll);
app.get('/api/cake/:cakeId', cake.fetch);


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


app.get('/api/photo/:photoId', function(req,res){
    var url = path.join(__dirname, 'uploads/' + req.params.photoId );
    var file = fs.readFileSync(url, 'binary');

  res.setHeader('Content-Length', file.length);
  res.setHeader('Content-Type', 'image/png');
  res.write(file, 'binary');
  res.end();
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});



app.listen(3000, function() {
	console.log('Enjoy Cakes');
});