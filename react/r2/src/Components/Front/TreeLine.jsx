import { useState } from "react";

function TreeLine({ tree, saveVote, com }) {

    const [vote, setVote] = useState(5);

    const clickVote = () => {
        saveVote(tree.id, vote);
    }

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>
                    <b>{(tree.sum / tree.count || 1).toFixed(2)}</b>
                    <input type="number" min="1" max="10" className="ml-2" value={vote} onChange={e=>setVote(e.target.value)}></input>
                    <button type="button" className="btn btn-outline-primary ml-2" onClick={clickVote}>Vote</button>
                    {
                        com.filter(o => o.id === tree.id).map(c => <div key={c.cid}>{c.com}</div>)
                    }
                </div>
            </div>
        </li>
    )
}

export default TreeLine;
/*import { useState } from "react";

function TreeLine({ tree, saveVote }) {

    const [vote, setVote]= useState(5);//{/*301*/

   /* const clickVote = () => {
       setVote(tree.id, vote)
    }

    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf','Spike','Palm'][tree.type - 1]}</span>
                    <b>{(tree.sum / tree.count || 1).toFixed(2)}</b> {/*300*//*}
                    <input type="number" nim="1" max="10" className="ml-2"value={vote} onChange={e => setVote(e.target.value)}></input>{/*301*/
                    /*<button type="button" className="btn btn-outline-primary m-2" onClick={clickVote} >Vote</button>{/*302*/
               /* </div>
            </div>
        </li>
    )
}

export default TreeLine;*/