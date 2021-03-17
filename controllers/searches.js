//New controller for search routes!

const express = require('express');
const searchRouter = express.Router();

const Entry = require('../models/entry')

searchRouter.get('/:keyword', (req, res) => {
    try {
        const keyword = req.params.keyword;
        const matchingEntries = Entry.findByKeyword(keyword);
        res.status(200).send(matchingEntries);
    } catch (err) {
        console.log(`${err}: There do not seem to be any matching posts!`);
        res.status(404).send(err);
    }
})

module.exports = searchRouter;