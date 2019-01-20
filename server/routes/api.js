const express = require('express');
const router = express.Router();
const User = require('../models/user');

const mongoose = require('mongoose');
// Connection to database (found on mlab)
// Change with your use and password
// Below is format
// mongodb://<dbuser>:<dbpassword>@ds053449.mlab.com:53449/eventsdb
const db = "mongodb://shayant:Excel1234@ds053449.mlab.com:53449/eventsdb";


// Connects to database

mongoose.connect(db, { useNewUrlParser : true } , err => {
    if(err) {
        console.error('Error!' + err)
    }
    else {
        console.log('connected to mongodb');
    }
});

router.get('/', (req, res) => {
    res.send('From API route')
});

router.post('/register', (req,res) => {
    // collect data from user login
    let userData = req.body;
    // convert data to format mongoose will understand
    let user = new User(userData);
    // save the user into the database
    // save takes a callback fn, which either returns a parameter
    // or returns the registeredUser
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        }
        else {
            res.status(200).send(registeredUser)
        }
    });
});

router.post('/login', (req, res) => {
    // Extract user data
    let userData = req.body;

    // Query the DB to find a matching entry in the user collection
    // where the email provided in the form is the same as the one entered
    User.findOne({email: userData.email}, (err, user) => {
        if(err) {
            console.log(error)
        }
        else {
            // If no email matches
            if(!user) {
                res.status(401).send("Invalid email");
            }
            else {
                // If password doesnt match
                if(user.password != userData.password) {
                    res.status(401).send("Invalid password");
                }
                else {
                    // If both email and password match we 
                    // send user data from db 
                    res.status(200).send(user);
                }
            }
        }
    });
})

module.exports = router;