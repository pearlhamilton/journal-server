const express = require('express');
const router = express.Router();

const Entry = require('../models/entry')

router.get('/', (req, res) => {
    const entries = Entry.all;
    res.send(entries);
})

router.post('/', (req,res) => {
    const data = req.body;
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})

router.get('/:id', (req,res) => {
    const entryId = parseInt(req.params.id);
    const entry = Entry.findById(entryId);
    res.send(entry);
})

router.patch('/:id/comments', (req,res) => {
    const entryId = parseInt(req.params.id);
    const entry = Entry.findById(entryId);
    console.log(entry);
    const updatedComments = entry.updateComments(req.body);
    res.send(updatedComments);
})

router.patch('/:id/reacts', (req,res) => {
    const entryId = parseInt(req.params.id);
    const entry = Entry.findById(entryId);
    const updatedReacts = entry.updateReacts(req.body);
    res.send(updatedReacts);
})

module.exports = router;