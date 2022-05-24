import TreeLine from "./Front/TreeLine";
import { Link } from "react-router-dom"; //a.butinas linkams darant. is cia https://reactrouter.com/docs/en/v6/getting-started/overview
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../front.scss';
import reducer from "../Reducers/reducer";
import { getDataFromServer, sortClientHeightAsc, sortClientHeightDesc, sortClientNameAsc, sortClientNameDesc } from "../Actions";

function Front({ show }) { //b. pasiemam propsa is App.jsx

    //const [trees, setTrees] = useState([]);
    const [trees, dispachTrees] = useReducer(reducer, []);//101kliento puseje. perduodam per Action/index.js, Constans/index.js, Reducer/reducer.js.js,

    const [search, setSearch] = useState('');//103 search
    const [lastUpdate, setLastUpdate] = useState(Date.now()); 
    // Read
    useEffect(() => {
        axios.get('http://localhost:3003/trees-list/' + show) //b.cia vietoje http://localhost:3003/trees-manager/ rasom http://localhost:3003/trees-list/ ir pridedam propsa show
            .then(res => {
                console.log(res.data);
                dispachTrees(getDataFromServer(res.data));
            })
    }, [show, lastUpdate]);//b ir cia irasom propsa show ir dabar reik eiti i backenda savo server/app.s ir ten apsirasyti sita useEfekta

    //102 serverio puseje rusiavimas
    const serverSort = ( by, dir) => {
        axios.get('http://localhost:3003/trees-list-sorted/?dir=' + dir + '&by=' + by)
        .then(res => {
            dispachTrees(getDataFromServer(res.data));
        });
    }

    //103 search
    const doSearch = e => {
        setSearch(e.target.value);
        axios.get('http://localhost:3003/trees-list-search/?s='+ e.target.value)
        .then(res => {
            dispachTrees(getDataFromServer(res.data));
        });
    }

    const saveVote = (id, value) => {
        axios.put('http://localhost:3003/trees-vote/' + id + '/', {vote: value}) //arba be + '/'
        .then(res => {
            setLastUpdate(Date.now())
        })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/">Tree Shop</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link className="nav-link" to="/">Home</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                                    <Link className="nav-link" to="/leaf">Leaf</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                                    <Link className="nav-link" to="/spike">Spike</Link>{/*//a.butinas linkams*/}
                                    <Link className="nav-link" to="/palm">Palm</Link>{/*//a.butinas linkams*/}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {
                                trees.map(t => <TreeLine key={t.id} tree={t} saveVote={saveVote}></TreeLine>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-2">
                        <span>By name <small>client</small>:</span>
                        <div className="arrows">
                        <svg className="up" onClick={() => dispachTrees(sortClientNameAsc())}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => dispachTrees(sortClientNameDesc())}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">
                        <span>By height <small>client</small>:</span>
                        <div className="arrows">
                        <svg className="up"  onClick={() => dispachTrees(sortClientHeightAsc())}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => dispachTrees(sortClientHeightDesc())}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">
                        <span>By name <small>server</small>:</span>
                        <div className="arrows">
                        <svg className="up" onClick={() => serverSort('name', 'asc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => serverSort('name', 'desc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">
                        <span>By height <small>server</small>:</span>
                        <div className="arrows">
                        <svg className="up"  onClick={() => serverSort('height', 'asc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => serverSort('height', 'desc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">
                    <div className="form-group">
                        <label>search</label>
                        <input type="text" className="form-control" onChange={doSearch} value={search} />
                        <small className="form-text text-muted">Add new tree name here.</small>
                    </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Front;

/*
                        <div className="arrows">
                        <svg className="up" >
                            <use xlinkHref="#arrow"></use> {/*d.cia bus rodykles is googles svg arrow. ja isimetam i public/index.html body vieta:
                                                           <svg style="display:none" xmlns="http://www.w3.org/2000/svg">
                                                           <symbol id="arrow" viewBox="0 0 512 512"><path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"/></symbol>
                                                           </svg>
                                                           o cia fromt.jsx ji pasiimam is ten per id="arrov" o cia uzvadinam xlinkHref="#arrow"
                                                           ir front.scss pasisukam kaip mums reik*/
                                                           /*</svg>
                                                           <svg className="down">
                                                               <use xlinkHref="#arrow"></use> {/*d.cia bus rodykles is googles svg arrow ir front.scss pasisukam kaip mums reik*/
                                                          /* </svg>
                                                           </div> */
