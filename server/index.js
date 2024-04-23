const Item = require('./WishItemSchema')

const cors = require('cors')
const express = require('express');
const app = express();


app.use(express.json());
app.use(cors())
app.listen(9000, () =>{
    console.log(`Server Started at ${9000}`)
})

const mongoose = require('mongoose');

const mongoString = "mongodb+srv://prezentpal:prezentpal@cluster0.szggryc.mongodb.net/PrezentPal"
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



//Wishlist endpoints
app.post('/createWishItem', async (req, res) => {
    try {
            const item = new Item(req.body);
            item.save()
            console.log(`WishItem created! ${item}`)
            res.send(item)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getWishlist', async (req, res) => {
    try {
        const itemList = await Item.find({}, {item_name: 1, item_desc:1, item_price:1, item_link:1});
        res.send(itemList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})


