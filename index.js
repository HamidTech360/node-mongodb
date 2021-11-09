const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const genres = require('./routes/genres')
const newUsers = require ('./routes/users')
const auth = require('./routes/auth')
const config = require('config')
const account = require('./routes/account')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: no jwt provided')
    process.exit(1)
}
mongoose.connect('mongodb://localhost/students')
.then(()=>console.log('connection successfuly established'))
.catch(()=>console.log('Prblem connecting to the database'))


app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/users', newUsers)
app.use('/api/auth', auth)
app.use('/api/account', account)


const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening to port ${port}....`))
