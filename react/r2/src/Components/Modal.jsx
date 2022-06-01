import { useEffect, useState, useRef } from "react";
import getBase64 from "../Functions/getBase64";
function Modal({ setModalData, modalData, setEditData,sizes }) {//sizes 1000
//modalData visas medis ant modalo
//9. is Create.jsx nusikopinam dali kodo
//Edit tree
const [title, setTitle] = useState('');
const [height, setHeight] = useState('');
const [type, setType] = useState('1');
const [id, setId] = useState('0');
const [remove, setRemove] = useState(false);//*600 istrinam nuotrauka jeigu uzdesim varnele//false kad butu varnele pradzioje neuzdets
const [size, setSize] = useState('0');//1000
const fileInput = useRef();

const buttonHandler = () => {
    const file = fileInput.current.files[0];

    if (file) {
        getBase64(file)//505
            .then(photo => {
                console.log(photo);
                setEditData({
                    title,
                    height,
                    type,
                    id,
                    size,//1000
                    photo,
                    del: remove ? 1 : 0//600 del(deletle) keiciam arba bus pazymetas arba nea deletle checkbox
                });
                setModalData(null);
                setRemove(false);//600 istrinam nuotrauka jeigu uzdesim varnele
            });
    } else {//505
        setEditData({
            title,
            height,
            type,
            id,
            size,//1000
            photo: '',//'' reiskia nuotraukos nera
            del: remove ? 1 : 0//600 del(deletle) keiciam arba bus pazymetas arba nea deletle checkbox
        });
        setModalData(null);
        setRemove(false);//*600 istrinam nuotrauka jeigu uzdesim varnele
    }
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
        case 'size'://1000
             setSize(e.target.value);
            break;  
        default:
    }
}


    useEffect(() => {
        if (modalData === null) { //9jeigu modalData === null modale nebus duomenu ir uzsidarys modalas
            setTitle('');
            setHeight('');
            setType(1);
        } else { // 9priesingu atveju pas mus modalas atsidarineje ir matysis duomenys is anksciau suvestu
            setTitle(modalData.name);
            setHeight(modalData.height);
            setType(modalData.type);
            setSize(modalData.size);//1000
            setId(modalData.id);//11
        }
    }, [modalData])

    if (modalData === null) { //9.jeigu modalData === null modalo nebus // jeigu modal data yra objektas turesim ka parodyti
        return null;
    }

    return (
        <div className="modal modal-dialog-centered" id="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" onClick={() => setModalData(null)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                                    <div className="col-8">{/*1000*/}
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
                                        <div className="form-group">{/*600 -cia padarom kad foto galima butu pakeisti ir su <input type="checkbox" pazymejus ji istrina photo*/}
                                            <label>Photo</label>
                                            <input ref={fileInput} type="file" className="form-control" />{/*505 cia butinai dadeti ref={fileInput}-(ateina su getBase64 atsiradimu) o type="file"- su input laukelio kurimu, kad buutonas failo pasirinkimui atsirastu*/}
                                            <small className="form-text text-muted">Tree photo.</small>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" onChange={() => setRemove(r => !r)}  checked={remove} />{/*600 istrinam nuotrauka jeigu uzdesim varnele*/}
                                            <label className="form-check-label">Delete Photo</label>
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        {modalData.photo ? <img alt="foto" className="photo" src={modalData.photo}></img> : null}{/*600 jei nuotrauka bus pasirinkta ja rodys jeigu nebus nerodys*/}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary m-3 save" onClick={buttonHandler}>Save</button>
                        <button type="button" className="btn btn-outline-danger m-3 cancel" onClick={() => setModalData(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;