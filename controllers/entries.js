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

module.exports = router;