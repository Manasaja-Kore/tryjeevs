const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;



const profileSchema = new Schema({
    userId:{
        type: String,
        unique : true,
        required: true
    },
    email: {
        type: String,
        unique : true,
        required: true
    },
    createdon:{
        type:Date,
        default:Date.now
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    DOB:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

profileSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
  };
  profileSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;