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

(jei norim paredaguoti einam i Structure -> change(sruktura keisim); Browse ->edit (medzius paredaguoti))

*/
