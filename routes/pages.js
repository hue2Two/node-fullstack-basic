const express = require('express');
const router = express.Router(); //what does this do?

router.get('/', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('home');
})

router.get('/register', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('register');
})

router.get('/login', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('login');
})

router.get('/profile', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('profile');
})

module.exports = router;