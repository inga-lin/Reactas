function TreeLine({ tree }) {

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>
                </div>
            </div>
        </li>
    )
}

export default TreeLine;