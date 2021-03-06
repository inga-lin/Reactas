function TreeLine({ tree, setDeleteId, setModalData, deleteComment }) {//700 deleteComment ji atsinesam is Back.jsx
// Tree List lentele
return (
    <li className="list-group-item">
    <div className="tree-line">
        <div className="tree-line__content">
            <span>{tree.name}</span>
            <span>{tree.size}</span>
            <span>{tree.height} m</span>
            <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>{/*is masyvo ['Leaf','Spike','Palm'] paimam viena konkretu elementa [tree.type - 1]*/}
        </div>
        <div className="tree-line__buttons">
            <button type="button" className="btn btn-outline-primary m-1 edit" onClick={()=>setModalData(tree)}>Edit</button>
            <button type="button" className="btn btn-outline-danger m-1 deletle" onClick={()=>setDeleteId({id:tree.id})}>Delete</button>
        </div>
    </div>
        <ul className="tree-group">{/*700 komentaro idejimas*/}
            {                       
            tree.comments ? tree.comments.slice(0, -5).split('-^o^-,').map((c, i) => (
                <li className="list-group-item" key={i}>
                    {c} {/*c-komentaras*/}{/*tree.cid.-komentaru id*/}
                        <div>
                            <button type="button" onClick={() => deleteComment(tree.cid.split(',')[i])} className="btn btn-outline-danger mt-3 deletle">Delete</button>{/*700 komentaro istrinimas*/}
                         </div>
                </li>)) : null
                                 ////40004//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai
            }
        </ul>
    </li>
)
}

export default TreeLine;