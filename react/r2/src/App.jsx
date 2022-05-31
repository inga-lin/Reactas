import Back from "./Components/Back";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Front from "./Components/Front";
import LoginPage from "./Components/LoginPage";//900 reikalingas admino paskyrai su slaptazodziu
import LogoutPage from "./Components/LogoutPage";//900 reikalingas admino paskyrai su slaptazodziu
import RequireAuth from "./Components/RequireAuth";//900 reikalingas admino paskyrai su slaptazodziu
function App() {

    return (
        <BrowserRouter>
        <Routes>
        <Route index element={<Front show="all"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="/login" element={<LoginPage />} />{/*//900 reikalingas admino paskyrai su slaptazodziu*/}
        <Route path="/logout" element={<LogoutPage />} />{/*//900 reikalingas admino paskyrai su slaptazodziu*/}
        <Route path="leaf" element={<Front show="leaf"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="spike" element={<Front show="spike"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        <Route path="palm" element={<Front show="palm"/>} /> {/*b.show yra propsas kuri perduodam i Front.jsx*/}
        {/*900 buvo be admino prisijungimo <Route path="admin" element={<Back/>} /></Route> ir pakeitem i <Route path="/admin"element={<RequireAuth><Back/></RequireAuth>}/>*/}
        {/*//900 reikalingas admino paskyrai su slaptazodziu*/}
        <Route
              path="/admin"
              element={
                <RequireAuth>
                  <Back/>
                </RequireAuth>
              }
            />
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