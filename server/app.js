
/*const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sernas",
});

// Route

app.get("/", (req, res) => {
  res.send("Hello Barsukai!");
});

app.get("/trees-manager", (req, res) => {
  // SELECT column1, column2, ...
  // FROM table_name;
  const sql = `
        SELECT
        *
        FROM trees
    `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
app.get("/trees-list/all", (req, res) => {
        const sql = `
        SELECT
        *
        FROM trees
    `;
        con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });

})

app.get("/trees-list/:cat", (req, res) => {
    if (req.params.cat != "all") {
    const sql = `
            SELECT
            *
            FROM trees
            WHERE type = ?
        `;
    con.query(sql, [['leaf','spike','palm'].indexOf(req.params.cat) + 1], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
});


app.post("/trees-manager", (req, res) => {
  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...);
  const sql = `
        INSERT INTO trees
        (name, height, type)
        VALUES (?, ?, ?)
    `;

  con.query(
    sql,
    [req.body.title, !req.body.height ? 0 : req.body.height, req.body.type],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// DELETE FROM table_name
// WHERE some_column = some_value
app.delete("/trees-manager/:id", (req, res) => {
  const sql = `
        DELETE FROM trees
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put("/trees-manager/:id", (req, res) => {
  const sql = `
        UPDATE trees
        SET name = ?, type = ?, height = ?
        WHERE id = ?
    `;
  con.query(
    sql,
    [req.body.title, req.body.type, req.body.height, req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/



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

/////////////////////////////////// 404
//b.apsirasom Fronts.jsx useEffect
//b.jeigu all siunciam viena uzklausa o jeigu ne all siunciam kita uzklausa(req.params.cat != "all") kuri isfiltruoja ko butent norim ar leaf','spike','palm
app.get("/trees-list/all", (req, res) => { //all atskiras routas visu medziu gavimui
        const sql = `
        SELECT
        m.id AS id, m.name, m.height, m.type, m.count, m.sum, k.con, k.id AS cid
        FROM trees AS m
        LEFT JOIN komentarai AS k
        ON m.id = k.medziai_id
        
    `;
        con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });

}) ////404 cia dadejom/////////////////////////////////////////////////////

//BUVO virsuje taip
//app.get("/trees-list/all", (req, res) => {
//  const sql = `
//      SELECT
//        *
//        FROM medziai
//    `;
//  con.query(sql, (err, result) => {
//    if (err) throw err;
//    res.send(result);
//  });
//});



app.get("/trees-list/:cat", (req, res) => { //cat yra parametras jeigu tai neta all iesko 'leaf','spike','palm' ir kazkuri is ju atidaro
    if (req.params.cat != "all") {
    const sql = `
            SELECT
            *
            FROM trees
            WHERE type = ?
        `;
    con.query(sql, [['leaf','spike','palm'].indexOf(req.params.cat) + 1], (err, result) => { //b.mes gaunam zodzius ir juos paverciam i indeksa
      if (err) throw err;
      res.send(result);
    });
  }
});

//////////////////////////

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

//8. Trina medzius
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/trees-manager/:id', (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
    const sql = `
        DELETE FROM trees
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/trees-manager/:id'
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// 10.Redaguoja medzius
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



//101 sortinam name ir height
// SELECT column1, column2, ...
// FROM table_name
// ORDER BY column1, column2, ... ASC|DESC;
app.get("/trees-list-sorted/", (req, res) => {
  
  let sql;

  if (req.query.by == 'title' && req.query.dir == 'asc'){
    sql = `SELECT * FROM trees ORDER BY name ASC`;
  }
  else if (req.query.by == 'title' && req.query.dir == 'desc'){
    sql = `SELECT * FROM trees ORDER BY name DESC`;
  }
  else if (req.query.by == 'height' && req.query.dir == 'asc'){
    sql = `SELECT * FROM trees ORDER BY height ASC`;
  }
  else{
    sql = `SELECT * FROM trees ORDER BY height DESC`;
  }
  con.query(
    sql,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});
//trees

//103 search paiska pagal pavadinima name
// SELECT column1, column2, ...
// FROM table_name
// WHERE columnN LIKE pattern;

app.get("/trees-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM trees
        WHERE name LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});





//300
app.put("/trees-vote/:id", (req, res) => {
  const sql = `
        UPDATE trees
        SET count = count + 1, sum = sum + ?
        WHERE id = ?
    `;
  con.query(
    sql,
    [req.body.vote, req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});


//404 lenteliu apjungimas
//SELECT column_name(s)
//FROM table1
//LEFT JOIN table2
//ON table1.column_name = table2.column_name;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
