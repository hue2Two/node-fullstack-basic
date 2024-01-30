const express = require('express');
const authController = require('../controllers/auth')
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

//logout
router.get('/logout', authController.logout, (req, res) => {
    console.log(`req: ${req.url} , method: ${req.method}`);
});

// router.post('/logout', (req, res) => {
//     console.log(`playtime data sent: ${req.body}`);
// });

// router.post('/logout', async (req, res) => {
//     console.log(`playtime data sent: ${JSON.stringify(req.body)}`);
//     // let retrievedData = JSON.stringify(req.body.sendPlayTime);
//     let retrievedData = req.body.sendPlayTime;

//     let thing1toSend;
//     let thing2toSend;
//     let thing3toSend;

//     //filtering cookie
//         // Extract the JWT token from the cookie header
//         const cookies = req.headers.cookie.split('; ');
//         const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
//         const token = jwtCookie ? jwtCookie.split('=')[1] : null;
//         console.log(`JWT INFO TIME SEND P1: ${cookies}`);
//         console.log(`JWT INFO TIME SEND P2: ${jwtCookie}`);
//         console.log(`JWT INFO TIME SEND P3: ${token}`);

//         //decode token in cookie & grab id
//         const decoded = await promisify(jwt.verify)(token, jwtSecret);
//         console.log(`JWT INFO TIME SEND P4: ${JSON.stringify(decoded)}`);

//     retrievedData.forEach(thing => {
//         console.log(`thing: ${thing}`);

//         if(thing.includes("playTime")) {
//             // thing1toSend = thing;
//             let temp = thing.split("=");
//             thing1toSend = temp[1];
//             thing3toSend = temp[0];
//         } else {
//             thing2toSend = thing;
//         }
//     })

//     console.log(`thing1: ${thing1toSend}, thing2: ${thing2toSend}`);
    
//     //check if token matches id in db
//     db.query(`SELECT email FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
//         console.log(`CHECKING JWT RESULT SENDING TIME 1: ${JSON.stringify(result)}`);

//         if (result.length > 0) {
//             const userEmail = result[0].email;

//             //insert info into the db
//             db.query(`INSERT INTO gametimerecord (
//                 email,
//                 gameTime
//             )
            
//             VALUES (
//                 '${userEmail}',
//                 '${thing1toSend}'
//             )`);

//             // res.json(gameToAdd);
//             // res.cookie('playTime', 'logout');
//             // res.cookie('playTime', '', { expires: new Date(0), path: '/' });

//             res.json({
//                 cookieName: thing3toSend
//             })

//         } else {
//             return res.status(404).json({ message: 'User not found' });
//         }
//     })
// });

module.exports = router;