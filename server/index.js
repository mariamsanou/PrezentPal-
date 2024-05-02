const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./User');
const UserProfile = require('./UserProfile');
const UserInterest = require('./UserInterest');
const UserWishlist = require('./UserWishlist');
const Item = require('./WishItemSchema');
const Event = require('./EventSchema')
const UserPair = require('./UserPairSchema')


app.use(express.json());
app.use(cors())

app.listen(9000, () => {
	console.log('Server Started at 9000')
})

const mongoose = require ('mongoose');

const mongoString = 
"mongodb+srv://prezentpal:prezentpal@cluster0.szggryc.mongodb.net/PrezentPalUsers"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error',(error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.post('/updateUserProfile/:userId', async (req, res) => {
    const { userId } = req.params;
    const {
        password, phone, gender, dateOfBirth,  // User basic details
        about,  // UserProfile details
        interests  // Array of interest names
    } = req.body;

    console.log('Received update request for user:', userId);

    try {
        // Update basic user details
        await User.findByIdAndUpdate(userId, {
            password, phone, gender, dateOfBirth
        }, { new: true });

        // Update user profile details
        await UserProfile.findOneAndUpdate({ userID: userId }, {
            bio: about
        }, { new: true });

        // Manage interests: only add new ones
        if (interests && interests.length > 0) {
            console.log('Checking existing interests...');
            const existingInterests = await UserInterest.find({ userID: userId });
            const existingInterestNames = existingInterests.map(i => i.interestName);
            const newInterests = interests.filter(i => !existingInterestNames.includes(i));
            console.log('New interests to add:', newInterests);

            if (newInterests.length) {
                const newInterestDocs = newInterests.map(name => ({
                    userID: userId,
                    interestName: name
                }));
                const insertedInterests = await UserInterest.insertMany(newInterestDocs);
                console.log('Inserted new interests:', insertedInterests);
                // Extract the IDs of the inserted interests
                const newInterestIds = insertedInterests.map(interest => interest._id);
            
                // Update the user profile with the new interest IDs
                await UserProfile.findOneAndUpdate(
                    { userID: userId },
                    { $push: { interestID: { $each: newInterestIds } } },
                    { new: true }
                );
            }
        }

        res.status(200).send('Profile updated successfully.');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send(error.message);
    }
});

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
    const { userID, interestName } = req.body;

    try {
        // Check for existing interest to prevent duplicates
        const existingInterest = await UserInterest.findOne({ userID, interestName });
        if (existingInterest) {
            return res.status(409).send('Interest already exists.');
        }

        // Create and save the new interest
        const newInterest = new UserInterest({
            userID,
            interestName
        });
        await newInterest.save();

        console.log('UserInterest Created');
        res.status(201).send(newInterest);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while creating interest: ' + error.message);
    }
});


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



// Create Event endpoint
app.post('/createEvent', async (req, res) => {
    //console.log('Request Body:', req.body); // Log the request body
    
    try {
        const eventn = new Event({
        email:  req.body.email,
        eventName:  req.body.eventName,
        startDate:  req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget ,
        bio: req.body.bio,
        friendsEmails: req.body.friendsEmails.split(',')
        
    }); await eventn.save()
    //console.log('Event created:', eventn);
    res.status(201).send(eventn);   

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });    }
    });

    app.get('/getUserInterests/:userId', async (req, res) => {
        try {
            const userProfile = await UserProfile.findOne({ userID: req.params.userId }).populate('interestID');
            if (!userProfile || !userProfile.interestID) {
                return res.status(404).send('User profile or interests not found');
            }
            const interests = userProfile.interestID.map(interest => interest.interestName);
            res.send(interests);
        } catch (error) {
            console.error('Error fetching interests:', error);
            res.status(500).send('Error fetching interests');
        }
    });

// Get all events endpoint
app.get('/getEvent', async (req, res) => {
    try {
        const itemList = await Event.find({}, {email: 1, eventName:1, startDate:1, endDate:1, budget:1, bio:1, friendsEmails:1});
        res.send(itemList)
    }
    catch (error) {
        res.status(500).send(error)
    }
  });
    

// app.post('/createUser', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save()
//         res.send(user)
//         console.log('User Created')

//     }
//     catch (error) {
//         console.error(error); 
//     res.status(500).send(error.message); 
//     }
// })

// app.post('/createUserProfile', async (req, res) => {
//     try {
//         const user = new UserProfile(req.body);
//         await user.save()
//         res.send(user)
//         console.log('UserProfile Created')

//     }
//     catch (error) {
//         console.error(error); 
//     res.status(500).send(error.message); 
//     }
// })

// app.post('/createUserInterest', async (req, res) => {
//     try {
//         const user = new UserInterest(req.body);
//         await user.save()
//         res.send(user)
//         console.log('UserInterest Created')

//     }
//     catch (error) {
//         console.error(error); 
//     res.status(500).send(error.message); 
//     }
// })

// app.post('/createUserWishlist', async (req, res) => {
//     try {
//         const user = new UserWishlist(req.body);
//         await user.save()
//         res.send(user)
//         console.log('UserWishlist Created')

//     }
//     catch (error) {
//         console.error(error); 
//     res.status(500).send(error.message); 
//     }
// })

// app.post('/createItem', async (req, res) => {
//     try {
//         const user = new Item(req.body);
//         await user.save()
//         res.send(user)
//         console.log('Item Created')

//     }
//     catch (error) {
//         console.error(error); 
//     res.status(500).send(error.message); 
//     }
// })




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

app.get('/getWishlist', async (req, res) => {
    try {
        const itemList = await Item.find({}, {item_name: 1, item_desc:1, item_price:1, item_link:1});
        res.send(itemList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})


//events

// Create Event endpoint
app.post('/createEvent', async (req, res) => {
    //console.log('Request Body:', req.body); // Log the request body
    
    try {
        const eventn = new Event({
        email:  req.body.email,
        eventName:  req.body.eventName,
        startDate:  req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget ,
        bio: req.body.bio,
        friendsEmails: req.body.friendsEmails.split(',')
        
    }); await eventn.save()
    //console.log('Event created:', eventn);
    res.status(201).send(eventn);   

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });    }
    });


// Get all events endpoint
app.get('/getEvent', async (req, res) => {
    try {
        const itemList = await Event.find({}, {email: 1, eventName:1, startDate:1, endDate:1, budget:1, bio:1, friendsEmails:1});
        res.send(itemList)
    }
    catch (error) {
        res.status(500).send(error)
    }
      });
          
    





//generators

app.post('/createPairs', async (req, res) => {
    try {
            const userpairs = req.body;
            for(let i = 0; i < userpairs.pairs.length; i++){
                const pair1 = userpairs.pairs[i][0]
                const pair2 = userpairs.pairs[i][1]
                console.log(pair1.firstName)
                console.log(pair1.firstname)

                const truePair = new UserPair({
                    firstname: pair1.firstname,
                    lastname: pair1.lastname,
                    pairFirstName: pair2.firstname,
                    pairLastName: pair2.lastname
                  });
                  
                  await truePair.save()
                
            }

            console.log(`Pair created! ${userpairs}`)
            res.send(userpairs)
    }
    catch (error){
        console.log(error)
        res.status(500).send(error)
    }
})

app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {firstname:1, lastname:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/findPartner', async (req, res) => {
   try {
       const thisUser = req.body.thisUser
       const oneUser = await User.findById(thisUser)

       let responseDetails = []
       const partnerfirst = ""
       const partnerlast = ""
       const userList = await UserPair.find({}, {firstname:1, lastname:1, pairFirstName:1, pairLastName:1});
       console.log(userList)
       for(user of userList){


           if(oneUser.firstname === user.firstname){
               responseDetails.push(user.pairFirstName) 
               responseDetails.push(user.pairLastName) 
           }


           else if(oneUser.firstname === user.pairFirstName){
               responseDetails.push(user.firstname)
               responseDetails.push(user.lastname)
           }
       }
       console.log(responseDetails)
       res.send(responseDetails)
       
   }
   catch (error) {
       res.status(500).send(error)
   }
})


//add friends endpoints
app.post('/sendFriendRequest', async (req, res) => {
    const { requesterId, recipientId } = req.body;
    try {
        const existingRequest = await FriendRequest.findOne({
            requester: requesterId,
            recipient: recipientId
        });

        if (existingRequest) {
            return res.status(409).send('Friend request already sent.');
        }

        const newRequest = new FriendRequest({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending'
        });
        await newRequest.save();
        res.status(201).send('Friend request sent successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


app.get('/getFriendRequests', async (req, res) => {
    const { userId } = req.query;
    try {
        const requests = await FriendRequest.find({ recipient: userId, status: 'pending' })
                                            .populate('requester', 'firstname lastname');
        res.send(requests);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


app.post('/respondToFriendRequest', async (req, res) => {
    const { requestId, response } = req.body; // response should be 'accepted' or 'declined'
    try {
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).send('Request not found.');
        }
        request.status = response;
        await request.save();
        res.send(`Request ${response}.`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


app.get('/getUserIdByEmail', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email: email }).select('_id');
        if (!user) {
            res.status(404).send('No user found with that email');
        } else {
            res.send({ _id: user._id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


