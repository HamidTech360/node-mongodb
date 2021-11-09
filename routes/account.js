const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {UserModel} = require('../models/users')

router.get('/', auth, async (req, res)=>{
    const user = await UserModel.findById(req.user._id)
    res.send(user)
})

module.exports = router