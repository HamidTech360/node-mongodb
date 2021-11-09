const mongoose = require ('mongoose')

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20,
        minlength:3
    }
})


const GenreModel = mongoose.model('student', genreSchema)


module.exports.GenreModel = GenreModel;