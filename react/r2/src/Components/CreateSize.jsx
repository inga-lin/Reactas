import { useState, useRef } from "react";

//cia Add New Tree lentele

function CreateSize({ setCreateData }) { //{/*3pasiimam per cia savo setCreateData is App.jsx*/}
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(Tree title)
    const [size, setSize] = useState('');//(Tree title-)


        return (
            <div className="card m-2">
                <div className="card-header">
                    <h2>Add New Size</h2>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Tree title</label>
                        <input type="text" className="form-control" onChange={e => setSize(e.target.value)} value={size} />
                        <small className="form-text text-muted">Add new size name here.</small>
                    </div>
                    <div className="container p-0">
                            <div className="buttons">
                            <button type="button" className="btn btn-outline-primary m-3">Add</button>
                            </div>
                        </div>
                    </div>
                </div>

        )
}
export default CreateSize;