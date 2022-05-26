
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../back.scss';
import Create from './Create';
import TreeLine from './TreeLine';
import Modal from './Modal';

// cia Tree List lentele

function Back() {

  const [trees, setTrees] = useState([]);//--parsisiunciam kazkokiu daliku 
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  const [createData, setCreateData] = useState(null);//3 
  const [editData, setEditData] = useState(null);//10. ir ji perduosim per Modal ir ten pasiimsim

  const [deleteId, setDeleteId] = useState(null);//8trinimo buttonas

  const [modalData, setModalData] = useState(null);//9. setModalDataperduodam i komponenta Modal ir TreeLine

  const [lastUpdate, setLastUpdate] = useState(Date.now()); //liks useState//7.cia bus data kada pirma karta reactas uzsikrauna puslapi

  // Read 
  useEffect(() => {
    axios.get('http://localhost:3003/trees-manager')
      .then(res => {
        console.log(res.data);
        setTrees(res.data);//padarom kad per cia pasiimam savo trees is serverio
      })
  }, [lastUpdate]); //7.

  //Create
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  //3)useEffect pas mus vyks kai pasikeis creatoData
  useEffect(() => {
    if (null === createData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.post('http://localhost:3003/trees-manager', createData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData //post-isiusti
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now()) }); //7paskutinis pakeitimas turi buti dabartine Data
  },[createData])

  //10Edit 
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3003/trees-manager/'+ editData.id, editData) //
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
    });

  },[editData]);


  //8 Delete buttonas ir tai dar apsirasyti app.js serverio puseje
  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios.delete('http://localhost:3003/trees-manager/' + deleteId.id, ) //cia nepamirsti prie http galo prirasyti / ir prideti deleteId objekta su savybe id(jis istrins visa eilutes info) //delete-istrinti
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
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
      <Modal setEditData={setEditData} setModalData={setModalData} modalData={modalData}></Modal>{/*9.jis setModalData ir dar ziuri ka pasetinam modalData(pasirodo kai turim ka parodyti) */}
    </>
  );
}

export default Back;

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
/* kaip pasileisti projekta
xamp start-> start-> Admin
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
---------------------------------------
2022.05.19
savo App.jsx failiuka permetem i Componentus ir pervadinom Back.jsx (ir ten jo viduje pasikeiciam funkcijos pavadinima)
ir kelius issitaisom import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../back.scss';           //ir app.scss pervadinam i back.scss o tam naujam App.jsx sukursim app.scss
import Create from './Create';
import TreeLine from './TreeLine';
import Modal from './Modal';

o src susikurem nauja App.jsx su:
import Back from "./Components/Back";
//import { BrowserRouter, Routes, Route, } from "react-router-dom";
//import Front from "./Components/Front";

function App() {

    return (
        //<BrowserRouter>
        //<Routes>
       // <Route index element={<Front show="all"/>} />
       // <Route path="leaf" element={<Front show="leaf"/>} />
       // <Route path="spike" element={<Front show="spike"/>} />
       // <Route path="palm" element={<Front show="palm"/>} />
        //<Route path="admin" element={<Back/>}></Route>
       // </Routes>
       // </BrowserRouter>
       <Back></Back>
    )
}
export default App;
pasitikrinam ar veikia http://localhost:3000/

einam i 
https://reactrouter.com/
read the Docs
arba cia iskart https://reactrouter.com/docs/en/v6/getting-started/overview
terminale kur fronto dalis instaliuojam :
control c     tada y  (butinai nukilinam nes kitaip neveiks- arba per pliusiuka nauja atsidaryti ir ten pasileisti)
npm install react-router-dom@6
npm start

componentuose susikuriam faila Front.jsx it ten parasom labas


tada savo App.jsx susikelaim visa info back ir front (viskas turi taip ir vadintis)
import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";

function App() {

    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Front show="all"/>} />           //http://localhost:3000/ cia atvaizduos viska ka sukurem back.jsx
        <Route path="leaf" element={<Front show="leaf"/>} />    //http://localhost:3000/leaf  cia jei reiks galima isrusiuotai atvaizduoti tik leaf naujame puslapyje
        <Route path="spike" element={<Front show="spike"/>} />  //http://localhost:3000/spike  cia jei reiks galima isrusiuotai atvaizduoti tik spike naujame puslapyje
        <Route path="palm" element={<Front show="palm"/>} />    //http://localhost:3000/palm   cia jei reiks galima isrusiuotai atvaizduoti tik palm naujame puslapyje
        <Route path="admin" element={<Back/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App;

pasiziurim ar veikia:
dabar musu back dalis bus http://localhost:3000/admin
o http://localhost:3000/ cia bus ka klientai matys dabar labas

einam daryti Front.app
susikuriam dar componentuose Front folderi ir jame FreeLine.jsx
kuris ieis i Front.app vidu ir ten viska susirasom ko reik
navbara ir kokia info norim kad atvaizduotu

(//b pasirasius useEfecta reik eiti server/app.js ir ten ji apsirasyti
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
});)
*/




/*
2022-05-23
rusiavimas(mazai galima fronto puseje, jei daug info tai tada serverio puseje)
// 102
kliento sortinimas
susikuriam folderi Constants ir jame faila index.js su visa info
susikuriam folderi Actiona ir jame faila index.js su visa info
einam i Front.jsx ir ten apsirasom:
const [trees, dispachTrees] = useReducer(reducer, []);
susikuriam folderi Reducers ir jame faila reducer.js su visa info

101serverio sortinimas
apsirasysim server/app.js ir r2/src/Components/Front.jsx

103 search apsirasom server/app.js ir r2/src/Components/Front.jsx
*/

/*
2022-05-24
einam i savo http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=sernas&table=trees&pos=0
(sernas) trees ir ten pridesim prie trees lenteles dar 2stulpelius
sernas -> trees -> Structure(virsuje)
Addd 2 <- irasom kiek norim stulpeliu  GO

NAME        TYPE       DEFAULT
count       INT        Asdefined
                           0       <-pradine reiksme nulis
count       INT        Asdefined
                           0       <-pradine reiksme nulis

SAVE

Pasiziurim Browsw ar atsirado papildomi stulpeliai
Tada einam i VSC
einam i Front/TreeLine.jsx nes per cia klientai matys tuos ivertinimus
apsirasom su 300,301,302
tada einam i src/Front.jsx ir ten ji apsirasom
ront/TreeLine.jsx ir ten ji apsirasom
ir server/app.js apsirasom
ir turi veikt balsavimas vote

dvieju lenteliu apjungimas ir komentarai
einam i http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=sernas&table=trees&pos=0
savo serne spaudziam New -> 
table name: komentarai
NAME          TYPE         Length     ATRIBUTES   INDEX     A_I
id            mediumint                           PRIMARY    x
                                  
medziai_id    mediumint               UNSIGNED 
-------sita medziu_id type ir atributes turi sutapti su trees id kur nurodem type ir atributes !!!--------------
com            varchar         500
(com- komentars)
SAVE

LENTELIU APJUNGIMAS 404
virsuje spaudziam ant Relation view
ON DELETE pasirenkam CASCADE(istrynus medi issitrins ir jo komentaras)
Column nustatom ant medziu_id
Database - sernas
Table - trees
colum - automatiskai parinko id
SAVE
jeigu viskas teisingai tai ismeta salotines spalvos uzrasa Display column was successfuly update(jeigu ne tai reik grysti atgal ir tvargyti tos antros lenteles nustatymus pagai id pirmos lenteles)
einam paziuret ar atsirado tarp dvieju lenteliu virvute id sujunginejom su medziai_id:
spaudziam ant sernas(kaireje puseje) -> Designer(virsuje) ir turi matytis tos dvi lenteles su virvute(vadinasi viskas ok)

404-komentaru atvaizdavimas-einam i server/app.jx 
ir ten apsirasom-info https://www.w3schools.com/sql/sql_join_left.asp
kai apsirasem galim pasitestuoti ar veikia komentarai phpMyAdmin -> spaudziam ant komentarai(kaieeje puseje)
-> insert
kur medzio_id VALUE-parenkam koki nors medi is duotu pasirinkimu ir com kur didesne lentele irasom komentara
GO paskutini
ir savo puslapyje consoleje paspaudus ant medzio pasiziurim ar atvaizdavo ji
einam i src/Fronts.jsx apsirasom
ir i Front/TreeLine.jsx apsirasomir persidavem is Front.jsx
*/

/*
2022-05-26 lengvesnis KOMENTARO aprasymas
server/app.js, Front/TreeLine.jsx,src/Fronts.jsx  40004 ir 404 


foto idejimas 505
Create.jsx Front
Front/Front/jsx 
ir einam i savo duomenuu baze phpMyAdmin 
sernas-> (viduryje) trees -> structure ->GO(pirma)
Name: photo Type: LONGETEXT Default NULL -> SAVE
(REDAGAVIMAS EILUTES CHANGE eit reik)
atgal i vsc
susikuriam src folderi Functions ir failiuka getBase64js
 i app.js idedam nuotrauka ir apsirasom jos dydi front.css
 ir galim paziureti ja http://localhost:3000/
*/