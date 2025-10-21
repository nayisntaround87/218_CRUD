const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

app.listen(port, () => {
    console.log(`Example app listening on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nayla0705',
    database: 'biodata',
    port: 3307
});

db.connect((err) => {