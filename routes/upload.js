var express = require('express');
var router = express.Router();
var imgModel = require('../models/image');
var fs = require('fs');
var path = require('path');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


router.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log("req.file===>",req.file,__dirname);
  
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(obj)
    imgModel.create(obj, async(err, item) => {
        if (err) {
            console.log(err);
        }
        else {
             let data = await item.save();
             console.log(data);
           // res.redirect('/');
           res.send({"status":"uploaded"});
        }
    });
});
  
module.exports = router;