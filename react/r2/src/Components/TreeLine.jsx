function TreeLine({ tree, setDeleteId, setModalData }) {
// Tree List lentele
    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>

                </div>
                <div className="tree-line__buttons">
                    <button type="button" className="btn btn-outline-primary m-1" onClick={()=>setModalData(tree)}>Edit</button>{/*9.cia pasiimam setModalData ir nurodom ka jis turi readaguoti visa medzio info(tree)*/}
                    <button type="button" className="btn btn-outline-danger m-1" onClick={()=>setDeleteId({id:tree.id})}>Delete</button> {/*8.cia pasiimam setDeleteId ir nurodom ka jis turi istrinti {id:tree.id} objekta*/}
                </div>
            </div>
        </li>
    )
}

export default TreeLine;