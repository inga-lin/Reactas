const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');

app.use(express.urlencoded({
    extended: true
}));
    
app.use(express.json());


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sernas',
    });


//Route
//jis nurodo kokius puslapus paleidzia routas http://localhost:3003/ http://localhost:3003/trees-manager

app.get('/', (req, res) => {
  res.send('Hello Bebraiiii!')
})


app.get('/trees-manager', (req, res) => {
    // SELECT column1, column2, ...
    // FROM table_name;
    const sql = `
        SELECT
        *
        FROM trees
    `;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.json(result);
    });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})