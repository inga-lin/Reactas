import TreeLine from "./Front/TreeLine";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';

function Front({go}) {

    const [trees, setTrees] = useState([]);

    console.log(go);

    // Read
    useEffect(() => {
        axios.get('http://localhost:3003/trees-manager')
            .then(res => {
                console.log(res.data);
                setTrees(res.data);
            })
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#">Tree Shop</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link className="nav-link" to="/">Home</Link>
                                    <Link className="nav-link" to="leaf">Leaf</Link>
                                    <Link className="nav-link" to="spike">Spike</Link>
                                    <Link className="nav-link" to="palm">Palm</Link>
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
        </>

    )
}

export default Front;