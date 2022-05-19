import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";

function App() {

    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Front show="all"/>} />
        <Route path="leaf" element={<Front show="leaf"/>} />
        <Route path="spike" element={<Front show="spike"/>} />
        <Route path="palm" element={<Front show="palm"/>} />
        <Route path="admin" element={<Back/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App;

/*
susiinstaliuoti react-router-dom https://reactrouter.com/docs/en/v6/getting-started/overview
terminale ant r2 folderio()
npm install react-router-dom@6
npm start



import Back from "./Components/Back";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Front from "./Components/Front";

function App() {

    return(
        <BrowserRouter>
            <Routes>
            <Route index element={<Front />} />
              <Route path="admin" element={<Back/>}></Route>
            </Routes>
        </BrowserRouter>
     
    )
}

export default App;


*/