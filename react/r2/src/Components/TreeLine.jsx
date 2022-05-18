function TreeLine({ tree, setDeleteId, setModalData }) {

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    {tree.name}

                </div>
                <div className="tree-line__buttons">
                <button type="button" className="btn btn-outline-primary m-1" onClick={()=>setModalData(tree)}>Edit</button>
                <button type="button" className="btn btn-outline-danger m-1" onClick={()=>setDeleteId({id:tree.id})}>Delete</button>
                </div>
            </div>
        </li>
    )
}

export default TreeLine;