import { useEffect, useState } from 'react'; //nepamirsti useState prirasyti cia !!!
import axios from 'axios';
import './App.css';
function App() {
  const [trees, setTrees] = useState([]);
  useEffect( () => {
    axios.get('http://localhost:3003/trees-manager')
    .then(res => {
      console.log(res.data);
      setTrees(res.data)
    })
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Labas</h1>
        {
          trees.map(t => t.name !== 'Egle' ? (<div key={t.id}>{t.name}</div>) : '')
        }
                {
          trees.map(t => <div key={t.id}>{t.name}</div>)
        }
      </header>
    </div>
  );
}
export default App;


/*xamp start-> start-> Admin
http://localhost/phpmyadmin/
phpMyAdmin
New -> irasom pavadinima i pirma laukeli gtarkim(turi buti pavadinime mazosios raides):
sernas -> Create
Name: trees(daugiskaita pavadinimas); Number of columns: 4 (kiek stulpeliu norim);
GO

Name     Type             Length      Anttributes        Index        A_I     
id       MEDIUMINT                    UNSIGNED           PRIMARY     x(varnele)
name     VARCHAR           50
heigt    DECIMAL           4.2 (bus 4skaiciai ir du is ju po kablelio)
type     TINYINT                      UNSIGNED
SAVE

Insert
Column     Function    Value  
id                    
name                    Egle
heigt                   8.22
type                    2

Column     Function    Value  
id                    
name                    Pusis
heigt                   6.12
type                    2
GO (pirma o ne paskutini)
Browse -paziuresim ka irasem
Insert- galim dar irasyti

Column     Function    Value  
id                    
name                    Kriause
heigt                   1.22
type                    1

Column     Function    Value  
id                    
name                    Berzas
heigt                   23.45
type                    1
GO (pirma o ne paskutini)
(jei norim paredaguoti einam i Structure -> change(sruktura keisim); Browse ->edit (medzius paredaguoti))

VSC 
node -v (galima pasitikrint ar reacta turim)
sukuriam folderi server
cd server
https://expressjs.com/en/starter/installing.html (galima pasiziureti)
npm init -y   (sukurs package.json)
npm install express    -> web serveris kuris paleidzia node
susikuriam App.js
ir .gitignore su /node_modules
I App.js isidadam koda ir jame pakeiciam porta is port = 3000 i port = 3003
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

einam i http://localhost:3003/ ir turi ten rasyti Hello World
terminale stabdom serveri ir isnaujo pasileidziam:
npm i nodemon
ir package.json irasom prie script:
"start": "nodemon app.js"
terminale: npm start         po kiekvieno puslapio perkrovimo atsinaujins puslapio info
npm i cors
app.js irasom const cors = require('cors');   app.use(cors());
npm i mysql
app.js irasom:
const con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'sernas',    <-duomenu bazes pavadinimas
});

app.use(express.urlencoded({
extended: true
}));

app.use(express.json());

app.get('/trees-manager', (req, res) => {        <- http://localhost:3003/trees-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_name;
const sql = `
SELECT
*
FROM trees     <- lenteles pavadinimas
`;
con.query(sql, function(err, result) {
if (err) throw err;
res.json(result);
});
});

npm start    ir susirandam puslapi http://localhost:3003/trees-manager pasiziurim ar gaunam info
--------------
npm start
susikuriam teva react (toki pat kaip server)
spaudziam terminale desineje +
numeta mus i Reactas
cd reactas
npx create-react-app r2
cd r2
npm start    (atidarys puslapi su reacto zenkliuku)
einam i r2 -> src -> index.js
terminale apatineje juostoje paspaudziam ant JavaScript ir pasirenkam JavaScript React ir uzkomentuojam 9 ir 11eilutes  //
ir uzdarom inde.js

r2 -> src -> App.js pervadinam i App.jsx
ir istrinam pirma importa ir istrinam <div></div> vidu

terminale dar karta spaudziam +
ccd react
cd r2
npm i axios

kaip pasileistu kad veiktu puslapis(kai pradedam darba)
(serverio dalis)
ir grystam i pirma node arba powershell
ir dirbam Reactas/server
npm start

(fronto dalis)
o antrame node arba powershell
react/r2 
npm start
*/
