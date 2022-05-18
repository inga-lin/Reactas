
import { useEffect, useState } from 'react';
import axios from 'axios';
import './bootstrap.css';
import './App.scss';
import Create from './Components/Create';
import TreeLine from './Components/TreeLine';
import Modal from './Components/Modal';

// cia Tree List lentele

function App() {

  const [trees, setTrees] = useState([]);
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  const [createData, setCreateData] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [modalData, setModalData] = useState(null);

  const [lastUpdate, setLastUpdate] = useState(Date.now()); //cia bus data kada pirma uzsikrauna puslapis


  useEffect(() => {
    axios.get('http://localhost:3003/trees-manager')
      .then(res => {
        console.log(res.data);
        setTrees(res.data);//padarom kad per cia pasiimam savo trees is serverio
      })
  }, [lastUpdate]);

  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  //3)useEffect pas mus vyks kai pasikeis creatoData
  useEffect(() => {
    if (null === createData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.post('http://localhost:3003/trees-manager', createData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now()) });
  },[createData])

  //
  useEffect(() => {
    if (null === deleteId) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.delete('http://localhost:3003/trees-manager/' + deleteId.id, )//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now());
     });
  },[deleteId])



  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Create setCreateData={setCreateData}></Create> {/*3 perduodam setCreateData i Create.jsx*/}
        </div>
        <div className="col-8">
          <div className="card m-2">
            <div className="card-header">
              <h2>Tree List</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {
                  trees.map(t => <TreeLine key={t.id} tree={t} setDeleteId={setDeleteId} setModalData={setModalData}></TreeLine>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Modal setModalData={setModalData} modalData={modalData}></Modal>
    </>
  );
}

export default App;

/*
        {
          trees.map(t => <div key={t.id}>{t.name}</div>)
        }
        {
          trees.sort((a,b) => a.name.length > b.name.length ? -1 : 1 ).map(t => <div key={t.id}>{t.name}</div>)
        }

padaro raudonus kvadratus aplink zodzius:
        {
          trees.map(t => <div key={t.id} style={{backgroundColor: 'red', height: '150px', width:"150px"}}>{t.name}</div>)
        }
turetu atvaizduoti nuo didziausio iki maziausio
        {
          trees.sort((a,b) => a.name.length > b.name.length ? -1 : 1 ).map(t => <div key={t.id}>{t.name}</div>)
        }
neveikia....
        {
          dogs.sort((a,b) => b.name.length - a.name.length).map((dogs, i) => <DogsSkai key={i} dogs={dogs} number={i + 1 } >{dogs}</DogsSkai>) //isrusiavom sunis nuo ilgiausio pavadinimo iki trumpiausio
        } 
//Atvaizduoti masyvą dogs. Poriniuose indeksuose esančius šunis atvaizduoti kvadratuose, neporinius trikampiuose (trikampio css pasigooglint).
        {
          dogs.map((dogs, i) => i % 2 !== 0 ? (<DogsKvad key={i} dogs={dogs} ></DogsKvad>) : (<DogsTrikam key={i} dogs={dogs} ></DogsTrikam>))
        }

export default function DogsTrikam({dogs}) {
   
    return (
        <div>
            <h1 style={{color:'pink',width:'0px', height:'0px', borderBottom:'170px solid red', borderLeft:'170px solid transparent' }}>{dogs}</h1>      
        </div>

    )

}
//Atvaizduoti masyvą dogs. Šunis, kurie prasideda didžiąja raide praleisti (neatvaizduoti).
        {
            trees.map(trees => trees.name[0].toLowerCase() === trees[0] ? (<div key={trees.id}>{trees.name}</div>) : (''))
        }

//Naudojant masyvą dogs atvaizduoti skaičius, kurie yra lygūs žodžių masyve ilgiui. Skaičius, didesnius nei 6 atvaizduoti žaliai, kitus raudonai.

//Abu variantai veikia
//dogs.map((dogs, i) =>  <h1 style={{color: dogs.length > 6 ? 'green':'red' }} key={i} dogs={dogs.length} >{dogs.length}</h1>)
//dogs.map((dogs, i) => dogs.length > 6 ? (<h1 key={i} style={{color:'green'}}>{dogs.length}</h1>):(<h1 key={i} style={{color:'red'}}>{dogs.length}</h1>))

*/
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
-----------------------------------
kaip pasileistu kad veiktu puslapis(kai pradedam darba):
(serverio dalis)
ir grystam i pirma node arba powershell
ir dirbam Reactas/server
npm start
(matyrumem taip langa mazdaug pries pasileidziant
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Example app listening on port 3003)


(fronto dalis)
o antrame node arba powershell
react/r2 
npm start
(matyrumem taip langa mazdaug pries pasileidziant
You can now view r2 in the browser.
Local:            http://localhost:3000        
On Your Network:  http://172.17.254.132:3000   
Note that the development build is not optimized.
To create a production build, use npm run build. 
webpack compiled successfully)
*/
/*bootstrap linkas
https://getbootstrap.com/docs/4.6/components/buttons/ 

Susikuriam react/r2 folderi Components ir jame folderiuka Create.jsx

fonts   font-family:
https://.google.com/specimen/Akshar
ir is ten nukopinam <link.....> ir ji ikopinam i react/r2/public/index.html , kur nors <heado> viduje
ir tada 
body {
  font-family: 'Akshar', sans-serif;
}
isimetam i src App.css
      arba
isirasom scss:
App.css pervadinam i App.scss
tada App.jsx vietoje importo App.css irasom import './App.scss';
terminala su scss ismetam i siuksliu deze(kur node raso kaireje-front-endo dali)
ir spaudziam + terminale
nueinam i recta/r2
npm i sass   (cia galim rasyti kaip css failiuke, gal :D )
npm start
turetu uzsikraut be klaidu
*/