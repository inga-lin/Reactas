import { useEffect, useState } from "react";
function Modal({setModalData, modalData, setEditData}) {
//modalData visas medis ant modalo
//9. is Create.jsx nusikopinam dali kodo
//Edit tree
    const [title, setTitle] = useState('');
    const [height, setHeight] = useState('');
    const [type, setType] = useState('1');
    const [id, setId] = useState('0');//11 pradinis bus 0

    const buttonHandler = () => {
        setEditData({ //10 cia turi tu
            title,
            height,
            type,
            id//11
        });
        setModalData(null);//11kai uzpildom modalo lentele ji turi nusinulint(issitrinti duomenys)
    }

    const inputHandler = (e, which) => {
        switch(which) {
            case 'title': 
            setTitle(e.target.value);
            break;
            case 'height': 
            setHeight(e.target.value.replace(/,/g, '.'));
            break;
            case 'type': 
            setType(e.target.value);
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
                        <h5 className="modal-title" id="exampleModalLabel">Edit tree</h5>
                        <button type="button" className="close" onClick={() => setModalData(null)}>{/*paspaudus x per setModalData(null) bus uzdaroma modallentele */}
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

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary m-3" onClick={buttonHandler}>Save</button>{/*11. nusinulina duomenys is modalo ir uzsidaro lenteles paspaudus save*/}
                        <button type="button" className="btn btn-outline-danger m-3"  onClick={() => setModalData(null)}>Cancel</button>{/*paspaudus Cancel per setModalData(null) bus uzdaroma modal lentele */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;