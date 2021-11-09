const mongoose = require ('mongoose')
const Joi = require ('joi-browser')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlenght:100,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:2000,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    }
})


const UserModel = mongoose.model('user', userSchema)

function ValidateUser (user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(25005).required().email(),
        password:Joi.string().min(5).max(250).required()
    }

    return Joi.validate(user, schema)

}

module.exports.UserModel = UserModel
module.exports.Validate = ValidateUser