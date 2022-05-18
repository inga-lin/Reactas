function TreeLine({tree, setDeleteId}){

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    {tree.name}

                </div>
                <div className="tree-line__buttons">
                <button type="button" className="btn btn-outline-danger" onClick={()=>setDeleteId({id:tree.id})}>Delete</button>
                </div>
            </div>
        </li>
    )
}
export default TreeLine;