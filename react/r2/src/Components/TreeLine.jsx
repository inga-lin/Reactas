function TreeLine({ tree, setDeleteId, setModalData }) {
// Tree List lentele
return (
    <li className="list-group-item">
        <div className="tree-line">
            <div className="tree-line__content">
                <span>{tree.name}</span>
                <span>{tree.height} m</span>
                <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>{/*kadangi skaicia pas mus eina nuo 1 tai reik atimt 1 nes istikro reik skaiciuot nuo 0 indekso*/}
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