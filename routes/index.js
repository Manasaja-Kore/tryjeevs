const express = require('express');
let router = express.Router();
const auth = require('../Auth/index');

/* GET home page. */
//var indexRouter = require('./index');
//var usersRouter = require('./users');
var signupRouter = require('./signup');
var loginRouter = require('./login');
var topicRouter = require('./topic');
var postRouter = require('./post');
var commentRouter = require('./comment');
var uploadRouter = require('./upload');

router.use('/signup', signupRouter);

router.use('/login' ,loginRouter);
//router.use('/users',auth, usersRouter);
router.use('/tryjeeves/topics', auth,topicRouter);
router.use('/tryjeeves/posts',auth, postRouter);
router.use('/tryjeeves/comments',auth, commentRouter);
router.use('/tryjeeves/upload',auth, uploadRouter);


module.exports = router;
