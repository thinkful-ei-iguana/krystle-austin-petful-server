'use strict';
const express = require('express')
const catRouter = express.Router();
const STORE = require('../store');

let catTemp = STORE.cats;

catRouter
    .route('/')
    .get((req, res, next) => {
        let cats = catTemp;
        res.json(cats);
    })

    module.exports = catRouter;
