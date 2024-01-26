const express = require('express');
const router = express.Router(); //what does this do?
const authController = require('../controllers/auth')

console.log(`isloggedinvalue 1: ${isLoggedInHelper}`);

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
    console.log(`TESTING ISLOGGEDIN 4: ${isLoggedInHelper}`);
    // res.render('home');
    res.render('home', {
        isLoggedInHelper: isLoggedInHelper
    })
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

router.post('/profile', async (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);
    console.log(`grabbing game data to remove from front: ${JSON.stringify(req.body)}`);

    try {
        //filtering cookie
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`JWT INFO COOKIES WHEN REMOVE GAMES: ${cookies}`);
        console.log(`JWT INFO JWTCOOKIE WHEN REMOVE GAMES: ${jwtCookie}`);
        console.log(`JWT TOKEN WHEN REMOVE GAMES: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`DECODED WHEN REMOVE GAMES: ${JSON.stringify(decoded)}`);

        //check if token matches id in db
        db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
            console.log(`CHECKING JWT RESULT WHEN REMOVE GAMES: ${JSON.stringify(result)}`);

             if (result.length > 0) {
                const userEmail = result[0].email;
                const gameToRemove = req.body.gameToRemove;

                // Delete game from the database using a parameterized query
                db.query(`DELETE FROM usergames WHERE user_id = ? AND game_name = ?`, [userEmail, gameToRemove], (deleteError, deleteResult) => {
                    if (deleteError) {
                        // Handle the error
                        console.error(`Error removing game: ${deleteError}`);
                        return res.status(500).json({ message: 'Error removing game' });
                    } else {
                        // Send a success response
                        return res.json({ message: `Game '${gameToRemove}' removed successfully` });
                    }
                });
                
            
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }


})

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    if (req.user) {
        isLoggedInHelper = true;
        console.log(`isloggedinvalue 2: ${isLoggedInHelper}`);
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
        // isLoggedInHelper = false;
    }
});

console.log(`isloggedinvalue 3: ${isLoggedInHelper}`);




module.exports = router;