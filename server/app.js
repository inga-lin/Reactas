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

//kaip nuskaito
app.get('/trees-manager', (req, res) => {
    // SELECT column1, column2, ...
    // FROM table_name; FROM (trees- duomenu bazes pavadinimas)
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
//5)kaip iraso nauja info i duomenu baze
app.post('/trees-manager', (req, res) => {
    // INSERT INTO table_name (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);
    //(INSERT INTO trees-musu duomenu bazes pavadinimas)
    //(name, height, type)- musu duomenu bazes lenteles stulpeliu pavadinimai
    //VALUES (?, ?, ?) -paruosiam vieta deti duomenim
    const sql = `
        INSERT INTO trees
        (name, height, type)
        VALUES (?, ?, ?)
    `;

    con.query(sql, [ //cia tvarka turi sutapt su lenteles uzrasais, ir is cia paimam ta nauja info ir sudedam i musu serveri ir po to matysim tai Tree List (paspaudus App mygtuka ir perkrovus puslapi)
        req.body.title,
        !req.body.height ? 0 : req.body.height, //jeigu aukscio lenteleje nieko neirasysim bus 0
        req.body.type
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })

});

// Trina medzius
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/trees-manager/:id', (req, res) => {
    const sql = `
        DELETE FROM trees
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// Redaguoja gyvuna
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put('/trees-manager/:id', (req, res) => {
    const sql = `
        UPDATE trees
        SET name = ?, height = ?, type = ?
        WHERE id = ?
    `;
    con.query(sql, [
        req.body.title,
        req.body.height,
        req.body.type,
        req.params.id
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})