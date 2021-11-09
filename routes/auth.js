const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const {UserModel} = require('../models/users')
const Joi = require('joi-browser')
const bcrypt = require('bcrypt')
const config = require('config')

router.post('/', async (req, res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await UserModel.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Account not found')

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.status(400).send('Incorrect password')


    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'))

    res.send(token)
})

function Validate (user){
    const schema = {
        email: Joi.string().required(),
        password:Joi.string().required()
    }
    return Joi.validate(user, schema)
}

module.exports = router


