const cors = require('cors')
const express = require('express');
const app = express();


app.use(express.json());
app.use(cors())
app.listen(9000, () =>{
    console.log(`Server Started at ${9000}`)
})

const mongoose = require('mongoose');

const mongoString = "mongodb+srv://prezentpal:prezentpal@cluster0.szggryc.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))


app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {firstName:1, lastName:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createPartners', async (req, res) => {
    try {
        
    }
    catch (error){
        res.status(500).send(error)
    }
})




