
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



const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
md5 = require('js-md5');//900 md5 ikriep projektam nenaudoti nes nesaugus slaptazodziu generaorius
const uuid = require('uuid');//900 sesijos rakto generatorius(random belenkoks kodas)

app.use(express.json({limit: '50mb'}));//505 per cia bus galima didele foto ideti
app.use(express.urlencoded({limit: '50mb'}));//505 per cia bus galima didele foto ideti
//+
app.use(express.urlencoded({
    extended: true
}));
    
app.use(express.json());//+

//++
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sernas',
});


/////900 apsirasom ko reik administratorio prisijungimui------>
//https://www.md5hashgenerator.com/ slaptazodzio pavertimas i koda
//jeigu yra /admin' tada tikrinam ['authorization'] (prisijungima jeigu nera /admin tai atidarom paprastai vartotojui)
const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
      const sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else {
      next();
  }
}
app.use(doAuth)




app.get("/admin/hello", (req, res) => {
  res.send("Hello Admin!");
});

app.get("/login-check", (req, res) => {
  const sql = `
  SELECT
  name
  FROM users
  WHERE session = ?
  `;
  con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});

        //jeigu suvedant slaprazodi su name sutampa tai mums uzkraus puslapi(res.send({ msg: 'ok', key });) jei ne, neatidarysres.send({ msg: 'error', key: '' });
        //musu vedamas slaprazodis tikrinamas su musu serveryje uzkuoduotu kodu is https://www.md5hashgenerator.com/
         // md5(req.body.pass) sitoje vietoje uzkuoduoja musu paprasta slaptazodi
app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});
/////////900 administratoriaus prisijungimo pabaiga-------------------->

//Route+
//jis nurodo kokius puslapus paleidzia routas http://localhost:3003/ http://localhost:3003/trees-manager

app.get("/", (req, res) => {
  res.send('Hello Bebraiiii!')
})

//kaip nuskaito atvaizduoja info(cia be comentu beckende)
//app.get('/trees-manager', (req, res) => {
    // SELECT column1, column2, ...
    // FROM table_name; FROM (trees- duomenu bazes pavadinimas)
 //   const sql = `
   //     SELECT
     //   *
//        FROM trees
//    `;
 //   con.query(sql, function(err, result) {
 //       if (err) throw err;
 //       res.json(result);
  //  });

//});

///////////////////////700 atvaizduos bekende comentus+
//buvo be administratoriaus prisijungimo app.get('/trees-manager', (req, res) => {
//900 su administratoriaus prisijungimu app.get('/admin/trees-manager', (req, res) => {
app.get('/admin/trees-manager', (req, res) => {//900//1000 dadejau dj.size,  LEFT JOIN dydziai as dj ON m.dydziai_id = dj.id
  // SELECT column1, column2, ...
  // FROM table_name; FROM (trees- duomenu bazes pavadinimas)
  //AS cid - yra komentaro id
  const sql = `
  SELECT
  m.id AS id, m.photo, m.name,dj.size, m.height, m.type, m.count, m.sum, GROUP_CONCAT(k.com, '-^o^-') AS comments,GROUP_CONCAT(k.id) AS cid 
  FROM medziai AS m
  LEFT JOIN komentarai AS k
  ON m.id = k.medziai_id
  LEFT JOIN dydziai as dj
  ON m.dydziai_id = dj.id
  GROUP BY m.id
`;
  con.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result);
  });

});






/////////////////////////////////// 404//+KOMENTARO aprasymas fronte//505 ir cia isidedam m.photo,
//???? is kur tas cid - k.id AS cid- cia mes pervadinom savo k.id i cid
//m.id AS id - irgi pervadinom (kazkodel neitraukem i ta sarasa medziai_id)
//FROM table1 <- is lentels trees 
///LEFT JOIN table2 <- prijungiam lentele komentarai(ji turi buti kaireje puseje phpMyAdmin kur su virvute jungiam)
//ON table1.column_name = table2.column_name; <- nusakom taisykle pagal ka jas jungiam ON m.id = k.medziai_id (trees.id ir komentarai.medziai_id)
///m.id AS id, m.name, m.height, m.type, m.count, m.sum, k.con, k.id AS cid
//m.id AS id, m.name, m.height, m.type, m.count, m.sum, GROUP_CONCAT(k.com, '-^o^-') AS comments, k.id AS cid !!! pas mane con o ne com
//kodel rasom (k.con, '-^o^-') nes kitaip komentaru gale raso kableli ir tada viskas sugriuva(jis dabar tai ides i gala, Front/TreeLine.jsx nusiimsim ta kartinuka)
app.get("/trees-list/all", (req, res) => {//all atskiras routas visu medziu gavimui
        const sql = `
        SELECT
        m.id AS id, m.photo, m.name, m.height, m.type, m.count, m.sum, GROUP_CONCAT(k.com, '-^o^-') AS comments, k.id AS cid 
        FROM medziai AS m
        LEFT JOIN komentarai AS k
        ON m.id = k.medziai_id
        GROUP BY m.id
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
//        FROM trees
//    `;
//  con.query(sql, (err, result) => {
//    if (err) throw err;
//    res.send(result);
//  });
//});


//+
//b.apsirasom Fronts.jsx useEffect
//b.jeigu all siunciam viena uzklausa o jeigu ne all siunciam kita uzklausa(req.params.cat != "all") kuri isfiltruoja ko butent norim ar leaf','spike','palm
//SELECT column_name(s) <- cia isvardinam abieju lenteliu stulpelius
app.get("/trees-list/:cat", (req, res) => { //cat yra parametras jeigu tai neta all iesko 'leaf','spike','palm' ir kazkuri is ju atidaro
    if (req.params.cat != "all") {
    const sql = `
            SELECT
            *
            FROM medziai
            WHERE type = ?
        `;
    con.query(sql, [['leaf','spike','palm'].indexOf(req.params.cat) + 1], (err, result) => { //b.mes gaunam zodzius ir juos paverciam i indeksa
      if (err) throw err;
      res.send(result);
    });
  }
});

//////////////////////////

//5)kaip iraso nauja info i duomenu baze//505 pridedam photo ir ?, req.body.photo
app.post('/trees-manager', (req, res) => {
    // INSERT INTO table_name (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);
    //(INSERT INTO trees-musu duomenu bazes pavadinimas)
    //(name, height, type)- musu duomenu bazes lenteles stulpeliu pavadinimai
    //VALUES (?, ?, ?) -paruosiam vieta deti duomenim
    //1000 dydziai_id ir ?
    const sql = `
        INSERT INTO medziai
        (name, height, type, photo, dydziai_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(sql, [ //cia tvarka turi sutapt su lenteles uzrasais, ir is cia paimam ta nauja info ir sudedam i musu serveri ir po to matysim tai Tree List (paspaudus App mygtuka ir perkrovus puslapi)
        req.body.title,
        !req.body.height ? 0 : req.body.height, //jeigu aukscio lenteleje nieko neirasysim bus 0
        req.body.type,
        req.body.photo,
        req.body.size//1000
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })

});

//8. Trina medzius+
// DELETE FROM table_name
// WHERE some_column = some_value
app.delete('/trees-manager/:id', (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
    const sql = `
        DELETE FROM medziai
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/trees-manager/:id'
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

//NEBERA SITO -----------------
// 10.Redaguoja medzius
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
//app.put('/trees-manager/:id', (req, res) => {
 //   const sql = `
//        UPDATE trees
//        SET name = ?, height = ?, type = ?
//        WHERE id = ?
//    `;
//    con.query(sql, [
//        req.body.title,
//        req.body.height,
//        req.body.type,
//        req.params.id
//    ], (err, results) => {
//        if (err) {
//            throw err;
//        }
//        res.send(results);
//    })
//})



//101 sortinam name ir height+
// SELECT column1, column2, ...
// FROM table_name
// ORDER BY column1, column2, ... ASC|DESC;
app.get("/trees-list-sorted/", (req, res) => {
  
  let sql;

  if (req.query.by == 'title' && req.query.dir == 'asc'){
    sql = `SELECT * FROM medziai ORDER BY name ASC`;
  }
  else if (req.query.by == 'title' && req.query.dir == 'desc'){
    sql = `SELECT * FROM medziai ORDER BY name DESC`;
  }
  else if (req.query.by == 'height' && req.query.dir == 'asc'){
    sql = `SELECT * FROM medziai ORDER BY height ASC`;
  }
  else{
    sql = `SELECT * FROM medziai ORDER BY height DESC`;
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

//103 search paiska pagal pavadinima name+
// SELECT column1, column2, ...
// FROM table_name
// WHERE columnN LIKE pattern;
// ka reiskia '%a' ir t.t. https://www.w3schools.com/sql/sql_like.asp
app.get("/trees-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM medziai
        WHERE name LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});





//300 302 vote +
app.post("/trees-vote/:id", (req, res) => {
  const sql = `
        UPDATE medziai
        SET count = count + 1, sum = sum + ?
        WHERE id = ?
    `;
  con.query(
    sql,
    [Math.max(Math.min(req.body.vote, 10), 1), req.params.id],//vote atejo is Front/TreeLine.jsx const [vote, setVote] = useState(5);//jei parasysim 100 vote vietoje tai bus vistiek 10 jeigu parasysim -5 tai bus 1
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

//40004 comentaras+
//komentarai- tai antros lenteles pavadinimas is phpMyAdmin
app.post("/trees-comment/:id", (req, res) => {
  const sql = `
    INSERT INTO komentarai
    (com, medziai_id)
    VALUES (?, ?)
    `;
  con.query(
    sql,
    [req.body.comment, req.params.id],//comment atejo is Front/TreeLine.jsx const [comment, setComment] = useState('');
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


//buvo tik saugojimas be nuotraukos MODALO
//app.put("/trees-manager/:id", (req, res) => {
//const sql = `
//UPDATE trees
//SET name = ?, type = ?, height = ?
//WHERE id = ?
//`;
//  con.query(
//  sql,
//  [req.body.title, req.body.type, req.body.height, req.params.id],
//  (err, results) => {
//    if (err) {
//      throw err;
 //   }
 //   res.send(results);
//  }
//);
//});

//505+//600 apsirasom kaip plius serveryje istrinam foto
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
//1000 dadejau , dydziai_id = ? ir req.body.size,
app.put("/trees-manager/:id", (req, res) => {
  let sql;//606 siunciam foto
  let args;//argsargumentai
    if('' === req.body.photo && req.body.del == 0) {//jeigu tuscias stringas yra foto, tai nerodom nuotraukos rodom tik name  type height
      sql = `
        UPDATE medziai
        SET name = ?, type = ?, height = ?, dydziai_id = ?
        WHERE id = ?
    `;
      args = [req.body.title, req.body.type, req.body.height,req.body.size, req.params.id];
    } else if(1 == req.body.del) {// jeigu yra 1 trinsim foto(photo bus null)
        sql = `
        UPDATE medziai
        SET name = ?, type = ?, height = ?, photo = NULL
        WHERE id = ?
    `;
    args = [req.body.title, req.body.type, req.body.height, req.params.id];
    } else { //kitu atveju rodysim nuotrauka
      sql = `
      UPDATE medziai
      SET name = ?, type = ?, height = ?, photo = ?
      WHERE id = ?
  `;
  args = [req.body.title, req.body.type, req.body.height, req.body.photo, req.params.id];
    }
  con.query(
    sql,
    args,
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

///700 komentaru istrinimas is beckendo puses+
app.delete("/trees-delete-comment/:id", (req, res) => { //delytinam is trees lnteles kurio id yra ?(kazkoks)
  const sql = `
     DELETE FROM komentarai
      WHERE id = ?
      `;
  con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/trees-manager/:id'
      if (err) {
          throw err;
      }
      res.send(result);
  })
})



////801 800 size list lentele
//medziu dyddziai
app.get("/admin/trees-sizes", (req, res) => {///900 pasidejau cia admin
  const sql = `
  SELECT
  *
  FROM dydziai
`;
con.query(sql, (err, result) => {
if (err) throw err;
res.send(result);

});
});

//800+
//turi irasineti i duomenu baze size
app.post("/trees-size", (req, res) => {
  // INSERT INTO dydziai-lenteles pavadinimas
  //(size)-eilutes pavadinimas
  // VALUES (value1, value2, value3, ...);
  const sql = `
        INSERT INTO dydziai
        (size)
        VALUES (?)
    `;

  con.query(
    sql,
    [req.body.size],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

//1000 istrinti size 
app.delete("/trees-manager-sizes/:id", (req, res) => {
  const sql = `
        DELETE FROM dydziai
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//+
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//trees-delete-comment/:id
//trees-sizes