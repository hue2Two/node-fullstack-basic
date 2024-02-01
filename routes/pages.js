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

                db.query(`SELECT * FROM usergames WHERE user_id = ? AND game_name = ?`, [userEmail, gameToAdd], (error, result) => {
                    if (result.length > 0) {
                        console.log(`${userEmail} already has game: ${gameToAdd}`);
                    } else {
                        //insert info into the db
                        db.query(`INSERT INTO usergames (
                            user_id,
                            game_name
                        )
                        
                        VALUES (
                            '${userEmail}',
                            '${gameToAdd}'
                        )`);

                        res.json(gameToAdd);
                            }
                    })
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }
})

router.post('/timerData', async (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);
    res.json(`data was recieved in post timerData`);

    try {
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`JWT INFO COOKIES WHEN ADDING TIME: ${cookies}`);
        console.log(`JWT INFO JWTCOOKIE WHEN ADDING TIME: ${jwtCookie}`);
        console.log(`JWT TOKEN WHEN ADDING TIME: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`DECODED WHEN ADDING TIME: ${JSON.stringify(decoded)}`);

        //check if token matches id in db
        db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
            console.log(`CHECKING JWT RESULT WHEN ADDING TIME: ${JSON.stringify(result)}`);

            if (result.length > 0) {
                const userEmail = result[0].email;
                const gameToAdd = req.body.gameTimeName;
                const addedTime = req.body.addedTime;

                //insert info into the db
                db.query(`INSERT INTO usergames (
                    user_id,
                    game_name,
                    time_played
                )
                
                VALUES (
                    '${userEmail}',
                    '${gameToAdd}',
                    '${addedTime}'
                )`);

                // res.json(gameToAdd);

            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }
})

router.get('/timerData', async (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);

    try {
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`JWT INFO COOKIES WHEN ADDING TIME: ${cookies}`);
        console.log(`JWT INFO JWTCOOKIE WHEN ADDING TIME: ${jwtCookie}`);
        console.log(`JWT TOKEN WHEN ADDING TIME: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`DECODED WHEN ADDING TIME: ${JSON.stringify(decoded)}`);

        //check if token matches id in db
        db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
            console.log(`CHECKING JWT RESULT WHEN ADDING TIME: ${JSON.stringify(result)}`);

            if (result.length > 0) {
                const userEmail = result[0].email;
                // const gameToAdd = req.body.gameTimeName;
                // const addedTime = req.body.addedTime;

                db.query(`SELECT * FROM usergames WHERE user_id = ?`, [userEmail], (error, gameTimeResult) => {
                    res.json({
                        data: gameTimeResult
                    })
                })

            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }
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
        db.query(`SELECT * FROM usergames WHERE user_id = ? AND time_played = 0`, [req.user.email], (error, gamesResult) => {
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

router.post('/logout', async (req, res) => {
    console.log(`playtime data sent: ${JSON.stringify(req.body)}`);
    // let retrievedData = JSON.stringify(req.body.sendPlayTime);
    let retrievedData = req.body.sendPlayTime;

    let thing1toSend;
    let thing2toSend;
    let thing3toSend;

    //filtering cookie
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`JWT INFO TIME SEND P1: ${cookies}`);
        console.log(`JWT INFO TIME SEND P2: ${jwtCookie}`);
        console.log(`JWT INFO TIME SEND P3: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`JWT INFO TIME SEND P4: ${JSON.stringify(decoded)}`);

    retrievedData.forEach(thing => {
        console.log(`thing: ${thing}`);

        if(thing.includes("playTime")) {
            // thing1toSend = thing;
            let temp = thing.split("=");
            thing1toSend = temp[1];
            thing3toSend = temp[0];
        } else {
            thing2toSend = thing;
        }
    })

    console.log(`thing1: ${thing1toSend}, thing2: ${thing2toSend}`);
    
    //check if token matches id in db
    db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
        console.log(`CHECKING JWT RESULT SENDING TIME 1: ${JSON.stringify(result)}`);

        if (result.length > 0) {
            const userEmail = result[0].email;

            //insert info into the db
            db.query(`INSERT INTO gametimerecord (
                email,
                gameTime
            )
            
            VALUES (
                '${userEmail}',
                '${thing1toSend}'
            )`);

            // res.json(gameToAdd);
            // res.cookie('playTime', 'logout');
            // res.cookie('playTime', '', { expires: new Date(0), path: '/' });

            // res.json({
            //     cookieName: thing3toSend
            // })

        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    })

    res.json({
        cookieName: thing3toSend
    })
});

router.get('/gameTimeRenew', async (req, res) => {
    try {
        // Extract the JWT token from the cookie header
        const cookies = req.headers.cookie.split('; ');
        const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
        const token = jwtCookie ? jwtCookie.split('=')[1] : null;
        console.log(`GAMETIMERENEW P1: ${cookies}`);
        console.log(`GAMETIMERENEW P2: ${jwtCookie}`);
        console.log(`GAMETIMERENEW P3: ${token}`);

        //decode token in cookie & grab id
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        console.log(`GAMETIMERENEW P4: ${JSON.stringify(decoded)}`);

        //check if token matches id in db
        db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
            console.log(`GAMETIMERENEW P5: ${JSON.stringify(result)}`);

            if (result.length > 0) {
                const userEmail = result[0].email;
                // const gameToAdd = req.body.gameTimeName;
                // const addedTime = req.body.addedTime;

                // const sumQuery = `
                // SELECT gameTime
                // FROM gametimerecord
                // WHERE email = ?
                // ORDER BY (
                //     COALESCE(JSON_EXTRACT(gameTime, '$[0]'), 0) +
                //     COALESCE(JSON_EXTRACT(gameTime, '$[1]'), 0) +
                //     COALESCE(JSON_EXTRACT(gameTime, '$[2]'), 0) +
                //     COALESCE(JSON_EXTRACT(gameTime, '$[3]'), 0)
                // ) DESC
                // LIMIT 1;
                // `;

                db.query(`SELECT gameTime FROM gametimerecord WHERE email = ?`, [userEmail], (error, result) => {
                    console.log(`GAMETIMERENEWP6: ${JSON.stringify(result)}`)

                    let highestSum = 0;
                    let toSendBack = null;

                    // result.forEach(row => {
                    //     let gameTimeArray = JSON.parse(row.gameTime);
                    //     let sum = gameTimeArray.reduce((acc, val) => acc + (val || 0), 0);
                    //     if (sum > highestSum) {
                    //         highestSum = sum;
                    //         toSendBack = gameTimeArray;
                    //     }
                    // });

                    // let compareTotal = 0

                    // from returned user data, find highest
                    for(let i = 0; i < result.length; i++) {
                        console.log(`GAMETIMERENEWP7: ${JSON.stringify(i)}: ${JSON.stringify(result[i])}`);

                        let gameTimeArray0 = JSON.parse(result[0].gameTime.replace(/(^"|"$)/g, ''));
                        let compareTotal0 = 0
                        
                        gameTimeArray0.forEach(value => {
                            compareTotal0 += value;
                        })
                        highestSum = compareTotal0;

                         // Remove the outer quotes and parse the JSON string to an array
                        let gameTimeArray = JSON.parse(result[i].gameTime.replace(/(^"|"$)/g, ''));
                        let compareTotal = 0

                        gameTimeArray.forEach(value => {
                            compareTotal += value;

                            if(highestSum < compareTotal) {
                                highestSum = compareTotal;
                            } 
                        })

                        console.log(`GAMETIMERENEWP7 TOTAL: ${compareTotal}`);
                        console.log(`highest value: ${highestSum} at index: ${i}`);

                        // if(compareTotal[i] > compareTotal[i+1]) {
                        //     highestSum = compareTotal[i];
                        // }

                        // for(let j = 0; j <= i; j++) {
                        //     console.log(`inner loop ${j}: ${JSON.stringify(result[j])}`);

                        // }
                    }

                    // result.forEach(time => {
                    //     console.log(`GAMETIMERENEWP7: ${JSON.stringify(time)}`);

                    //     // time.split(":");
                    //     console.log(`GAMETIMERENEWP8: ${JSON.stringify(time.gameTime)}`);

                    // })

                    console.log(`sending back: ${JSON.stringify(result[result.length - 1])}`)

                     // Send the highest sum gameTime
                    //  res.render('profile', {
                    //     highestTime: toSendBack 
                    // });

                    res.json({
                        highestTime: result[result.length - 1]
                    })
                })
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })

        // next();

    } catch (error) {
        console.log(`COOKIE ERROR: ${error}`);
    }
})



// router.get('/gameTimeRenew', async (req, res) => {
//     try {
//         // Extract the JWT token from the cookie header
//         const cookies = req.headers.cookie.split('; ');
//         const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
//         const token = jwtCookie ? jwtCookie.split('=')[1] : null;

//         // Decode token in cookie & grab id
//         const decoded = await promisify(jwt.verify)(token, jwtSecret);

//         // Check if token matches id in db
//         db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
//             if (error) {
//                 // Handle database error
//                 return res.status(500).json({ message: 'Database error' });
//             }

//             if (result.length > 0) {
//                 const userEmail = result[0].email;

//                 // Query to select the gameTime with the highest sum
//                 const sumQuery = `
//                     SELECT gameTime
//                     FROM gametimerecord
//                     WHERE email = ?
//                     ORDER BY (JSON_EXTRACT(gameTime, '$[0]') + JSON_EXTRACT(gameTime, '$[1]') + JSON_EXTRACT(gameTime, '$[2]') + JSON_EXTRACT(gameTime, '$[3]')) DESC
//                     LIMIT 1`;

//                 db.query(sumQuery, [userEmail], (error, gameTimeResult) => {
//                     if (error) {
//                         // Handle database error
//                         return res.status(500).json({ message: 'Database error' });
//                     }

//                     if (gameTimeResult.length > 0) {
//                         // Parse the gameTime string into an array
//                         let gameTimeArray;
//                         try {
//                             gameTimeArray = JSON.parse(gameTimeResult[0].gameTime);
//                         } catch (parseError) {
//                             // Handle parsing error
//                             return res.status(500).json({ message: 'Error parsing gameTime data' });
//                         }

//                         // Render the profile template with the parsed gameTime data
//                         res.render('profile', {
//                             gameTimes: gameTimeArray
//                         });
//                     } else {
//                         // Handle case where no gameTime data is found
//                         res.render('profile', {
//                             gameTimes: []
//                         });
//                     }
//                 });
//             } else {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//         });
//     } catch (error) {
//         console.log(`COOKIE ERROR: ${error}`);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });





module.exports = router;