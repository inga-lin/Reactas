
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [trees, setTrees] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:3003/trees-manager')
    .then(res => {
      console.log(res.data)
    })
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Labas</h1>
      </header>
    </div>
  );
}

export default App;
