const express = require('express');
const router = express.Router(); //what does this do?
const authController = require('../controllers/auth')

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

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    if (req.user) {
        res.render('profile', {
            user: req.user
        })
    } else {
        res.redirect('/login');
    }
    //render home route
    // res.render('profile');
    
})

module.exports = router;