const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Question = require('../Models/question.model');
const User = require('../Models/user.model');

router.get('/get/all', (req, res) => {
    Question.find().sort({_id: -1}).limit(100)
    .then(questions => res.json(questions))
    .catch(err => res.status(500).json(err))
})

router.get('/get/:id', (req, res) =>{
    Question.findOne({_id: req.params.id}, (err, question) => {
        if(err || !question) res.status(404).json("Question not found.")
        else res.json(question)
    })
})

router.post('/create', jsonParser, (req, res) => {
    const {token, title, body, asker} = req.body;
    //Validating asker
    User.findOne({email: asker, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            const newQuestion = new Question({title, body, asker: user})
            newQuestion.save()
            .then(() => res.json({"message": "Success", "id": newQuestion._id}))
            .catch(err => res.status(400).json(err))
        }
    })
})

router.post('/answer', jsonParser, (req, res) => {
    const {answer, token, answerer, question} = req.body;
    //Validating answerer
    User.findOne({email: answerer, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied. ")
        else{
            Question.findOne({_id: question}, (err, question) => {
                if(err || !question) res.status(500).json("Something went wrong.")
                else{
                    question.answers.push({answerer: user, answer})
                    question.save()
                    .then(() => res.json({message: "Success"}))
                }
            })
        }
    })
})

module.exports = router;