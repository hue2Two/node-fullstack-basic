const express = require('express');
const router = express.Router(); //what does this do?
const authController = require('../controllers/auth')

//parsing sent body info
// const app = express();
// app.use(express.json());

router.get('/', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('home');
})

router.post('/', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);
    console.log(`game data from frontend: ${JSON.stringify(req.body)}`)
});


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