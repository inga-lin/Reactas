import { useState } from "react";

//800

function CreateSize({setCreateSizeData}) { //{/*3pasiimam per cia savo setCreateData is App.jsx*/}
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(Tree title)
    const [size, setSize] = useState('');//(Tree title-)

    const sizeHandler = () => {
        setCreateSizeData({size});//atiduodam objekta
        setSize('');//isvalom ta setSize
    }

    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>Add New Size</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Tree Size</label>
                    <input type="text" className="form-control" onChange={e => setSize(e.target.value)} value={size} />
                    <small className="form-text text-muted">Add new size name.</small>
                </div>
                <div className="container p-0">
                    <div className="buttons">
                        <button type="button" className="btn btn-outline-primary m-3" onClick={sizeHandler}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateSize;