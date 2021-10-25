var express = require('express');
var router = express.Router();
let userProfile = require('../models/userprofile');
const {v4 : uuidv4} = require('uuid');
const nodemailer = require("nodemailer");
const sendErrorresponse = require('./error');
require('dotenv').config()

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: process.env.gmail_username,
      pass: process.env.gmail_password
  }
});
async function sendMail(userdetails){
  mailOptions={
    to : userdetails.email,
    subject : "Welcome to Tryjeeves",
    html : "Hello "+userdetails.fname+",<br> Welcome to Tryjeeves<br>You can create a story and post"
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
 if(error){
        console.log(error);
    res.end("error");
 }else{
        console.log("Message sent: " + response.message);
    res.end("sent");
     }
    });
}


router.post('/', async (req, res, next) => {
   let {email,fname,lname,DOB,password} = req.body;
   let profile = new userProfile();
   try{
        profile.userId = "u-"+uuidv4();
        profile.email = email;
        profile.fname = fname;
        profile.lname = lname;
        profile.password = profile.generateHash(password);
        profile.DOB = new Date(DOB).toISOString();
        console.log(req.body,profile);
        const data = await profile.save();
        console.log("data",data);
        await sendMail(profile);
        res.send({
          userId:data.userId,
          email:data.email,
          fname:data.fname,
          lname:data.lname,
          createdon:data.createdon,
          DOB:data.DOB
        });
   }catch(err){
      sendErrorresponse(req,res);
  }
});

module.exports = router;
