import { useState, useRef } from "react";
import getBase64 from "../Functions/getBase64";
//cia Add New Tree lentele
//import axios from 'axios';

function Create({ setCreateData, sizes }) { //{/*3pasiimam per cia savo setCreateData is App.jsx*/}
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(Tree title)
    const [title, setTitle] = useState('');//(Tree title-)
    const [height, setHeight] = useState('');//(Tree height)
    const [type, setType] = useState('1');//(Tree type ir kadangi jis uzstatytas su pasirinkimu tai parasom '1')
    const [size, setSize] = useState('0');
    const fileInput = useRef(); //505

    const buttonHandler = () => {
        const file = fileInput.current.files[0];

        if (file) {
            getBase64(file)
            .then(photo => {
                console.log(photo);
                setCreateData({
                    title,
                    height,
                    type,
                    photo
                });
            });
        } else {
            setCreateData({
                title,
                height,
                type,
                photo: null
            });
        }
        setTitle('');
        setHeight('');
        setType(1);
    }

    const inputHandler = (e, which) => {
        switch (which) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'height':
                setHeight(e.target.value.replace(/,/g, '.'));
                break;
            case 'type':
                setType(e.target.value);
                break;
            case 'size':
                setSize(e.target.value);
                break;
            default:
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
                        <div className="col-8">
                            <div className="form-group">
                                <label>Tree Sizes</label>
                                <select className="form-control" onChange={e => inputHandler(e, 'size')} value={size}>
                                    {
                                        sizes.map(s => <option key={s.id} value={s.id}>{s.size}</option>)
                                    }
                                </select>
                                <small className="form-text text-muted">Tree type.</small>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Photo</label>
                                <input ref={fileInput} type="file" className="form-control" />
                                <small className="form-text text-muted">Tree photo.</small>
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

/*
function Create({setCreateData}) { //{/*3pasiimam per cia savo setCreateData is App.jsx
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(Tree title)
  //  const [title, setTitle] = useState('');//(Tree title-)
   // const [height, setHeight] = useState('');//(Tree height)
    //const [type, setType] = useState('1');//(Tree type ir kadangi jis uzstatytas su pasirinkimu tai parasom '1')
    // 1)ir i visus imputus surasomju reiksmes (value={title}, value={type}, value={type})

   
    //4kai paspaudziam mygtuka mes i serveri isiunvcia informacija apie nauja suvesta zmogaus irasa
    //4kas nutinka kai paspaudziam ant mygtuko
   // const buttonHandler = () => {
        
      //  setCreateData({ //4cia sukonstruojam objekta kuris vissiskai turi atitikti pagal musu serverio lenteles pavadinimus(vietoje title turetu buti name pagal mano serveri) o id nereik nes serveris automatiskai ji sukuria
     //       title,
     //       height,
     //       type
     //   });
     //   setTitle(''); //7. kai visa info issiunciam padarom kad lentele vel butu tuscia
 //      // setHeight('');//7. kai visa info issiunciam padarom kad lentele vel butu tuscia
 //       setType(1);//7. kai visa info issiunciam padarom kad lentele vel butu ant pirmo pasirinkimo

    }//4)ir ji perduodam i buttona onClick={buttonHandler} ir einam i server-App.js

    //2)apsirasom funkcija kuri gauna event(is pildomos lenteles(Add New Tree)) ir which-kuri norim kad jis kontruoliuotu
    //2per cia galesim rasyti i lentele
    const inputHandler = (e, which) => {
        switch(which) {
            case 'title': //2jeigu jis yra title tai tada setinam tai ka gaunam is setTitle(e.target.value);
            setTitle(e.target.value);
            break;
            case 'height': //2jeigu jis yra 'height' tai tada setinam tai ka gaunam is setHeight(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setHeight(e.target.value.replace(/,/g, '.'));
            break;
            case 'type': //2jeigu jis yra 'type' tai tada setinam tai ka gaunam is setType(e.target.value);;
            setType(e.target.value);
            break;
            default: //2ir juos sukisam irgi i imputus(onChange={e => inputHandler(e, 'title')},onChange={e => inputHandler(e, 'height')}, onChange={e => inputHandler(e, 'type')})
        }
    }
*/