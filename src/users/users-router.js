const express = require('express');
const userRouter = express.Router();
const jsonParser = express.json();
const STORE = require('../store');
const Queue = require('../queue');

let userQueue = new Queue();

STORE.users.forEach(user => userQueue.enqueue(user));

userRouter.route('/').get((req, res, next) => {
    let users = getAllUsers(userQueue);
    res.json(users)
});

function getAllUsers(usersList) {
    let current = usersList.first;
    let usersArray = [];
    while (curent !== null) {
        usersArray.push(current.value);
        current = current.next;
    }
    return usersArray;
}

module.exports = userRouter;