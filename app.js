//test statement
console.log(`RUNNING APP.JS`);

// import & start express server
const express = require("express");
const app = express();

//set hbs template engine
app.set('view engine', 'hbs');

//link public dir for stylsheet
app.use(express.static('public'));

//install dotenv for .env file
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

//import sql dependency
const mysql = require("mysql");

// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

//db credentials
const db = mysql.createConnection({
    host: process.env.DATABSE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//test connection
db.connect((error) => {
    if(error) {
        console.log(`ERROR CONNECTING DB: ${error}`);
    } else {
        console.log(`connected to mysql db`);
    }

    db.query('SELECT * FROM test', (error, results) => {
        if(error) {
            console.log(`ERROR IN DB TEST QUERY: ${error}`)
        } else {
            console.log(`TEST QUERY RESULTS: ${JSON.stringify(results)}`);
        }
    })
})



//routing
// app.get('/', (req, res) => {
//     console.log(`req: ${req.url} , method: ${req.method}`);

//     //render home route
//     res.render('home');
// })

// app.get('/register', (req, res) => {
//     console.log(`req: ${req.url} , method: ${req.method}`);

//     //render home route
//     res.render('register');
// })

// app.get('/login', (req, res) => {
//     console.log(`req: ${req.url} , method: ${req.method}`);

//     //render home route
//     res.render('login');
// })

//in order to parse form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//move routing to routes folder
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, '0.0.0.0', console.log("app is running at port 5001"));