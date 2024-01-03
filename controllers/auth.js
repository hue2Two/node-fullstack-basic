const mysql = require("mysql");
const bcrypt = require('bcryptjs');

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

exports.login = (req, res) => {
    console.log("auth login route");
}