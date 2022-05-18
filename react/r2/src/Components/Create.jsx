import { useState } from "react";

function Create({setCreateData}) { //{/*3pasiimam per cia savo setCreateData is App.jsx*/}
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(Tree title)
    const [title, setTitle] = useState('');//(Tree title-)
    const [height, setHeight] = useState('');//(Tree height)
    const [type, setType] = useState('1');//(Tree type ir kadangi jis uzstatytas su pasirinkimu tai parasom '1')
    // 1)ir i visus imputus surasomju reiksmes (value={title}, value={type}, value={type})

    //4kai paspaudziam mygtuka mes i serveri isiunvcia informacija apie nauja suvesta zmogaus irasa
    //4kas nutinka kai paspaudziam ant mygtuko
    const buttonHandler = () => {
        setCreateData({ //4cia sukonstruojam objekta kuris vissiskai turi atitikti pagal musu serverio lenteles pavadinimus(vietoje title turetu buti name pagal mano serveri) o id nereik nes serveris automatiskai ji sukuria
            title,
            height,
            type
        });
    }//4)ir ji perduodam i buttona onClick={buttonHandler} ir einam i server-App.js

    //2)apsirasom funkcija kuri gauna event(is pildomos lenteles(Add New Tree)) ir which-kuri norim kad jis kontruoliuotu
    //per cia galesim rasyti i lentele
    const inputHandler = (e, which) => {
        switch(which) {
            case 'title': //jeigu jis yra title tai tada setinam tai ka gaunam is setTitle(e.target.value);
            setTitle(e.target.value);
            break;
            case 'height': //jeigu jis yra 'height' tai tada setinam tai ka gaunam is setHeight(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setHeight(e.target.value.replace(/,/g, '.'));
            break;
            case 'type': //jeigu jis yra 'type' tai tada setinam tai ka gaunam is setType(e.target.value);;
            setType(e.target.value);
            break;
            default: //ir juos sukisam irgi i imputus(onChange={e => inputHandler(e, 'title')},onChange={e => inputHandler(e, 'height')}, onChange={e => inputHandler(e, 'type')})
        }
    }

    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>Add New Tree</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Tree title</label>
                    <input type="text" className="form-control" onChange={e => inputHandler(e, 'title')} value={title} />
                    <small className="form-text text-muted">Add new tree name here.</small>
                </div>
                <div className="container p-0">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label>Tree height</label>
                                <input type="text" className="form-control" onChange={e => inputHandler(e, 'height')} value={height} />
                                <small className="form-text text-muted">Tree height.</small>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group">
                                <label>Tree type</label>
                                <select className="form-control" onChange={e => inputHandler(e, 'type')} value={type}>
                                    <option value="1">Leaf</option>
                                    <option value="2">Spike</option>
                                    <option value="3">Palm</option>
                                </select>
                                <small className="form-text text-muted">Tree type.</small>
                            </div>
                        </div>
                        <div className="buttons">
                        <button type="button" className="btn btn-outline-primary m-3" onClick={buttonHandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Create;

/*
    return (
        <div className="card m-4">
            <div className="card-header">
                <h2>Add New Tree</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label >Tree title</label>
                    <input type="text" className="form-control" />
                    <small  className="form-text text-muted">Add new tree name here</small>
                </div>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label >Tree height</label>
                    <input type="text" className="form-control" />
                    <small  className="form-text text-muted">Tree height here</small>
                </div>
            </div>
        </div>
    )
*/