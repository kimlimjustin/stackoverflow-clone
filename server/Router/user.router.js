const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../Models/user.model');

require('dotenv').config();
const SECURITY_KEY = process.env.SECURITY_KEY;
const generateToken = () => {
    const randomToken = require('random-token').create(SECURITY_KEY);
    return randomToken(50);
}

router.post('/get_by_token/', (req, res) => {
    const key = req.body.SECURITY_KEY;
    if(key != SECURITY_KEY) res.status(403).json("Permission denied.")
    else{
        User.findOne({token: req.body.token}, (err, user) => {
            if(err)res.status(500).json("Error: "+err);
            else if(!user) res.status(404).json("User not found.")
            else res.json(user)
        })
    }
})

router.post('/register', jsonParser, (req, res) => {
    const {name, password, email} = req.body;
    User.findOne({email}, (err, user) => {
        if(err) res.status(500).json("Error has occured. Please refresh page")
        else if(user) res.status(400).json("Email has been token.")
        else{
            const token = generateToken();
            const newUser = new User({name, password, email, token});
            newUser.save()
            .then(() => {
                res.json({"Message": "Success", token});
            })
            .catch(err => res.status(500).json(err));
        }
    })
})

router.post('/login', jsonParser, (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err) res.status(500).json("Error has occured.")
        else if(!user) res.status(400).json("User not found.")
        else{
            user.comparePassword(password, (err, isMatch) => {
                if(err) res.status(500).json("Error is occured.")
                if(isMatch){
                    const token = generateToken();
                    user.token = token;
                    user.save()
                    res.json({"message": "Success", token});
                }
                else res.status(400).json("Password doesn't match")
            })
        }
    })
})

module.exports = router;