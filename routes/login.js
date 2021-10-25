const express = require('express');
const router = express.Router();
let userProfile = require('../models/userprofile');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.secret;
const sendErrorresponse = require('./error');

function generateToken(user){
  return jwt.sign({data:user},secret,{expiresIn:'24h'});
}

router.post('/', async (req, res, next) => {
   let {email,password} = req.body;
   let profileData = await userProfile.findOne({email:email}).exec();
  // let profile = new 
   console.log(profileData.validPassword(password));
   if(profileData.validPassword(password)){
    try{
      let token = generateToken(profileData);
      res.send({token:token});
    }catch(err){
      console.log(err);
      sendErrorresponse(req,res);
    }
   }else{
     res.statusCode = 401;
     res.send({"reason":"invalid credentials"});
   }
  
});

module.exports = router;
