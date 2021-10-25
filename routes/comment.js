var express = require('express');
var router = express.Router();
const {v4 : uuidv4} = require('uuid');
let postSchema = require('../models/post');
let userSchema = require('../models/userprofile');
let commentSchema = require('../models/comment');
let sendErrorresponse = require('./error');





router.get('/', function(req, res, next) {

    res.send('Hello wecome to comment')
  });


router.post('/', async (req, res, next) => {
  try{
        let {comment,userId,postId} = req.body;
        let commentData = new commentSchema();
        let userData = await userSchema.findOne({userId:userId}).exec();
        let postData = await postSchema.findOne({Id:postId}).exec();
        console.log(userData,postData);
        if(userData.length!==null&&postData.length!==null){
          commentData.Id= "cm-"+uuidv4();
          commentData.comment= comment;
          commentData.createdBy= userId;
          commentData.postId=postId;
          const data = await commentData.save();
          console.log("data",data);
          res.statusCode = 201;
          res.send();
        }else{
          sendErrorresponse(req,res);
        }
        
   }catch(err){
    sendErrorresponse(req,res);
}
});

module.exports = router;
