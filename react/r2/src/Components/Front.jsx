import TreeLine from "./Front/TreeLine";
import { Link } from "react-router-dom"; //a.butinas linkams darant. is cia https://reactrouter.com/docs/en/v6/getting-started/overview
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../front.scss';

function Front({ show }) { //b. pasiemam propsa is App.jsx

    const [trees, setTrees] = useState([]);



    // Read
    useEffect(() => {
        axios.get('http://localhost:3003/trees-list/' + show) //bcia vietoje http://localhost:3003/trees-manager/ rasom http://localhost:3003/trees-list/ ir pridedam propsa show
            .then(res => {
                console.log(res.data);
                setTrees(res.data);
            })
    }, [show]);//b ir cia irasom propsa show ir dabar reik eiti i backenda savo server/app.s ir ten apsirasyti sita useEfekta

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
                                    <Link className="nav-link" to="/">Home</Link>  {/*//a.butinas linkams*/}
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
                                trees.map(t => <TreeLine key={t.id} tree={t}></TreeLine>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="arrows">
                        <svg className="up">
                            <use xlinkHref="#arrow"></use> {/*cia bus rodykles*/}
                        </svg>
                        <svg className="down">
                            <use xlinkHref="#arrow"></use> {/*cia bus rodykles*/}
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Front;