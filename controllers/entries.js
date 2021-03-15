const express = require('express');
const router = express.Router();

const Entry = require('../models/entry') // make

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

router.patch('/:id', (req,res) => {
    const entryId = parseInt(req.params.id);
    const entry = Entry.findById(entryId);
    const updatedEntry = entry.update(req.body);
    res.send(updatedEntry);
})

module.exports = router;