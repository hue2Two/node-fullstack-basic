const express = require('express');
const router = express.Router(); //what does this do?
const authController = require('../controllers/auth')

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
let jwtSecret = "supersecretmessage"; // Ensure in scope

//parsing sent body info
// const app = express();
// app.use(express.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


router.get('/', (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    //render home route
    res.render('home');
})

// router.post('/', (req, res) => {
//     console.log(`req: ${req.url} , method: ${req.method}`);
//     console.log(`game data from frontend: ${JSON.stringify(req.body)}`);

//     // res.render('home', {
//     //     message: `games added: ${JSON.stringify(req.body.addedGames)}`
//     // })
// });


// router.post('/', (req, res) => {
//     // ... processing ...
//     console.log(`game data from frontend APPROACH 2: ${JSON.stringify(req.body)}`);
//     res.json({ message: `games added: ${JSON.stringify(req.body.addedGames)}` });
// });

router.post('/', async (req, res) => {
    console.log(`game data from frontend APPROACH 3: ${JSON.stringify(req.body)}`);

    try {
        //filtering cookie
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`JWT INFO COOKIES WHEN ADDING GAMES: ${cookies}`);
        console.log(`JWT INFO JWTCOOKIE WHEN ADDING GAMES: ${jwtCookie}`);
        console.log(`JWT TOKEN WHEN ADDING GAMES: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`DECODED WHEN ADDING GAMES: ${JSON.stringify(decoded)}`);

        //check if token matches id in db
        db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
            console.log(`CHECKING JWT RESULT WHEN ADDING GAMES: ${JSON.stringify(result)}`);

            if (result.length > 0) {
                const userEmail = result[0].email;
                const gameToAdd = req.body.addedGames;

                //insert info into the db
                db.query(`INSERT INTO usergames (
                    user_id,
                    game_name
                )
                
                VALUES (
                    '${userEmail}',
                    '${gameToAdd}'
                )`)
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }
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

// router.get('/profile', authController.isLoggedIn, (req, res) => {
//     console.log(`req: ${req.url} , method: ${req.method}`);

//     if (req.user) {
//         res.render('profile', {
//             user: req.user
//         })
//     } else {
//         res.redirect('/login');
//     }
//     //render home route
//     // res.render('profile');
    
// })

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    if (req.user) {
        // Use the user's email to fetch games
        db.query(`SELECT * FROM usergames WHERE user_id = ?`, [req.user.email], (error, gamesResult) => {
            if (error) {
                // Handle error
                console.log(error);
                res.render('profile', {
                    user: req.user,
                    error: 'Error fetching games'
                });
            } else {
                // Process the results and prepare an array of games
                let gamesArray = [];
                gamesResult.forEach(game => {
                    gamesArray.push(game.game_name); // Assuming 'game_name' is the column name
                });

                // Render profile with user info and games array
                res.render('profile', {
                    user: req.user,
                    games: gamesArray
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});




module.exports = router;