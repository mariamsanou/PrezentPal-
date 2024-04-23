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




app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
        console.log('User Created')

    }
    catch (error) {
        console.error(error); 
    res.status(500).send(error.message); 
    }
})

app.post('/createUserProfile', async (req, res) => {
    try {
        const user = new UserProfile(req.body);
        await user.save()
        res.send(user)
        console.log('UserProfile Created')

    }
    catch (error) {
        console.error(error); 
    res.status(500).send(error.message); 
    }
})

app.post('/createUserInterest', async (req, res) => {
    try {
        const user = new UserInterest(req.body);
        await user.save()
        res.send(user)
        console.log('UserInterest Created')

    }
    catch (error) {
        console.error(error); 
    res.status(500).send(error.message); 
    }
})

app.post('/createUserWishlist', async (req, res) => {
    try {
        const user = new UserWishlist(req.body);
        await user.save()
        res.send(user)
        console.log('UserWishlist Created')

    }
    catch (error) {
        console.error(error); 
    res.status(500).send(error.message); 
    }
})

app.post('/createItem', async (req, res) => {
    try {
        const user = new Item(req.body);
        await user.save()
        res.send(user)
        console.log('Item Created')

    }
    catch (error) {
        console.error(error); 
    res.status(500).send(error.message); 
    }
})




app.get('/getUser', async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from query parameters
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/getUserLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        res.json({ _id: user._id });
        console.log('User Sent');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/getUserProfile', async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from query parameters
        const userProfile = await UserProfile.findOne({ userID: userId });
        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }
        res.send(userProfile);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/getUserInterests', async (req, res) => {
    const firstname = req.query.firstname
    const lastname = req.query.lastname
    try {
        const user = await UserProfile.find({ firstname, lastname })
        res.send(user)
        console.log('UserProfile Sent')
    }
    catch (error) {
        res.status(500).send(error)
    }
})
