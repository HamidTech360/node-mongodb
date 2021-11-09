const config = require('config')
const jwt = require('jsonwebtoken')
const express = require ('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require ('bcrypt')
const {UserModel, Validate} = require('../models/users')


router.post('/', async (req, res)=>{

    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let getUser = await UserModel.findOne({email:req.body.email})
    if(getUser) return res.status(400).send('User already registered')

    let newUser = new UserModel({
        name: req.body.name,
        password:req.body.password,
        email:req.body.email
    })

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    
    
    try{
        // _.pick(newUser, ['name', 'email'])
        newUser = await newUser.save()
        const token = jwt.sign({_id:newUser._id}, config.get('jwtPrivateKey'))
        res.header('x-auth-token',token ).send(newUser)
    }catch(error){
       // res.status(400).send('There was error saving to database')
        res.status(400).send(error)
    }
})

module.exports = router

