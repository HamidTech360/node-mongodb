const express = require ('express')
const router = express.Router()
const {GenreModel} = require('../models/genres')
const auth = require('../middlewares/auth')
const Joi = require('joi-browser')



router.get('/',async (req, res)=>{
    const genres = await GenreModel.find().sort('name')
    res.send(genres)
})

router.post('/', auth, async (req, res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let genre = new GenreModel({
        name:req.body.name
    })

        genre = await genre.save()
        res.send(genre)
    
})

router.put('/:id', async(req, res)=>{
  try{
    const genre = await GenreModel.findByIdAndUpdate(req.params.id, {name:req.body.name}, {
        new:true
    })
  }catch(error){
    if(!genre) return res.status(404).send('Genre not found')
  } 
  

    // res.send(genre)
})

router.delete('/:id', async (req, res)=>{
    const genre = await GenreModel.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('Failed to delete genre, no genre found')
    res.send(genre)
})

router.get('/:id', async (req, res)=>{
    const genre = await GenreModel.findById(req.params.id)
    if(!genre) return res.status(404).send('Cant generate genre witht the specified ID')
    res.send(genre)
})

function Validate (req){
    const schema = {
        name: Joi.string().required()
    }
    return Joi.validate(req, schema)
}
module.exports= router

