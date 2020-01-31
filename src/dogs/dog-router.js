const express = require('express');
const dogRouter = express.Router();
const jsonParser = express.json();
const STORE = require('../store');
const Queue = require('../queue');

let dogsQueue = new Queue();
STORE.dogs.forEach(dog => dogsQueue.enqueue(dog));

dogRouter  
    .route('/')
    .get((req, res, next) => {
        let dogs = getAllDogs(dogsQueue);
        res.json(dogs)
    })
    .delete((req, res, next) => {
        let dog = dogsQueue.dequeue();
        dogsQueue.enqueue(dog);
        res.send(200)
    });

dogRouter.route('/all').get((req, res, next) => {
    res.json({});
});

function getAllDogs(dogsList) {
    let current = dogsList.first;
    let dogsArray = [];
    while (current !== null) {
        dogsArray.push(current.value);
        current = current.next;
    }
    return dogsArray;
}

module.exports = dogRouter