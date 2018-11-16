const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session.js');
const Project = sequelize.import('../models/project');


router.post('/', validateSession, (req, res) => {
    console.log(req.body.user);
    if (!req.error) {
        let description = req.body.project.description;
        let definition = req.body.project.definition;
        let results = req.body.project.results;
        let comment = req.body.project.comment; 
        let owner = req.user.id;  
       


        Project.create({
                description: description,
                definition: definition,
                results: results,
                comment: comment,
                owner_properties: owner,
                

            })
            .then(
            function () {
                    console.log("created")
                    res.json({ message: "Success" });
                },
            function (err) {
                    console.log("err")
                    console.log(err);
                }
            )
    } else {
        res.status(500).json(error)
    }
});



router.get('/', validateSession,(req, res) => {
    Project.findAll({ where: { owner_properties: req.user.id } })
        .then(project => res.status(200).json(project))//both were  log
        .catch(error => res.status(500).json(error))
});


router.get('/:id', (req, res) => {
    Project.findOne({ where: { id: req.params.id } })
        .then(project => res.status(200).json(project))//both were  log
        .catch(err => res.status(500).json({ error: err }))
})


router.put('/:id', (req, res) => {
    console.log(req.user)
    console.log(req.params.id)
    if (!req.errors) {
        Project.update({
            description: req.body.project.description,
            definition: req.body.project.definition,
            results: req.body.project.results,
            comment: req.body.project.comment,
            owner_properties: req.user.id,
            
           

        }, { where: { id: req.params.id } })
            .then(project => res.status(200).json(project))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(500).json(req.error)
    }
})

router.delete('/:id', (req, res) => {
    if (!req.errors) {
        Project.destroy({ where: { id: req.params.id } })
            .then(project => res.status(200).json(project))//both were  log
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})
module.exports = router;