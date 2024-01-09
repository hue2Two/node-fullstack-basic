const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log("auth register route");

    console.log(`REGISTER FORM DATA: ${JSON.stringify(req.body)}`);

    //grab specific form information
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(`register info --> name: ${name}, email: ${email}, password: ${password}`);

    //do we have to do async await for db query?

    db.query('SELECT email FROM test WHERE email = ?', email, async (error, results) => {
        if(error) {
            console.log(`ERROR IN DB REGISTER QUERY: ${error}`)
        } else {
            console.log(`REGISTER QUERY RESULTS: ${JSON.stringify(results)}`);

            if(results.length > 0) {
                return res.render('register', {
                    message: 'that email is already in use'
                })
            }
        }

        //encrypt pw input
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(`hashed pw: ${hashedPassword}`);

        //insert info into the db
        db.query(`INSERT INTO test (
            name,
            email,
            password
        )
        
        VALUES (
            '${name}',
            '${email}',
            '${hashedPassword}'
        )`)
    })

    
}

let jwtSecret = "supersecretmessage";

exports.login = (req, res) => {
    console.log("auth login route");

    console.log(`LOGIN FORM DATA: ${JSON.stringify(req.body)}`);

    //grab specific form information
    const email = req.body.email;
    const password = req.body.password;

    console.log(`login info --> email: ${email}, password: ${password}`);

    //check if email exists in db
    db.query(`SELECT * FROM test WHERE email = ?`, email, (error, result) => {
        let hashedPasswordFromDB = result[0].password; //query how??
        console.log(`hashed pw: ${hashedPasswordFromDB}`)
        console.log(`verifying login email P1: ${JSON.stringify(result)}`);
        console.log(`verifying login email P2: ${JSON.stringify(email)}`);

        //check if email exists in db
        if(result.length > 0) {
            console.log(`login email exists in db`);
            
            bcrypt.compare(password, hashedPasswordFromDB, (error, isMatch) => {
                if(error) {
                    console.log(`comparing pw error: ${error}`);
            
                    return res.render('login', {
                        message: 'An error occurred'
                    });
                } 
                else if (isMatch) {
                    //send test cookie if login correct
                    // res.cookie("sky", "blue");
                    console.log(`CHECKING COOKIE PREP: ${JSON.stringify(result)}`);
                    console.log(`CHECKING COOKIE PROPERTIES P1: ${JSON.stringify(result[0])}`);
                    console.log(`CHECKING COOKIE PROPERTIES P2: ${JSON.stringify(result[0].id)}`);

                    //prep jwt token
                    const id = result[0].id;
                    // let jwtSecret = "supersecretmessage";
                    const token = jwt.sign({ tokenId: id }, jwtSecret);

                    //check the token
                    console.log(`CHECKING TOKEN: ${token}`);

                    //insert token into cookie
                    res.cookie('jwt', token);

                    //checking cookie req
                    console.log(`CHECKING COOKIE REQ: ${req.headers.cookie}`)

                    console.log(`Password match: ${isMatch}`);
                    res.redirect("/profile");
                } else {
                    console.log(`Password does not match: ${isMatch}`);
                    return res.render('login', {
                        message: 'Email or password is incorrect'
                    });
                }
            })
        } else {
            console.log('login email does not exist in db');
        }
    })
}

exports.isLoggedIn = async (req, res, next) => {
    req.message = "inside middleware";
    console.log(`MIDDLEWARE: ${req.message}`);

    //check cookies
    console.log(`CHECKING COOKIES: ${JSON.stringify(req.headers.cookie)}`);

    //filtering cookie
    // Extract the JWT token from the cookie header
    const cookies = req.headers.cookie.split('; ');
    const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
    const token = jwtCookie ? jwtCookie.split('=')[1] : null;
    console.log(`JWT INFO COOKIES: ${cookies}`);
    console.log(`JWT INFO JWTCOOKIE: ${jwtCookie}`);
    console.log(`JWT TOKEN: ${token}`);

    //decode token in cookie & grab id
    const decoded = await promisify(jwt.verify)(token, jwtSecret);
    console.log(`DECODED: ${JSON.stringify(decoded)}`);

    //check if token matches id in db
    db.query(`SELECT* FROM test WHERE id = ?`, [decoded.tokenId], (error, result) => {
        console.log(`CHECKING JWT RESULT: ${JSON.stringify(result)}`);

        //if no result
        if (!result) {
            return next();
        }

        //grab user with correct id [array of results]
        req.user = result[0];
        return next(); //code stops and moves on to next
    })

    // next();
}