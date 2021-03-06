import { useState } from "react";

function TreeLine({ tree, saveVote, saveComment }) {

    const [vote, setVote] = useState(5);//301 nurodom kad pradinis skaicus 5
    const [comment, setComment] = useState('');//40004 komentaro atvaizdavimas

    const clickVote = () => { //302
        saveVote(tree.id, vote); //saveVote perduoda tree.id ir vote is useState
        //setVote(''); jei noretumem kad po pirmo balsavimo nesimatytu skaiciaus 5
    }
//40004 komentaro atvaizdavimas
    const clickComment = () => {
        saveComment(tree.id, comment);//saveComment perduoda tree.id ir comment is useState
        setComment('');//kai issiunciam konentara laukeli paverciam i tuscia laukeli
    } 
    return (
        <li className="list-group-item">
            <div className="tree-line">
                <div className="tree-line__content">
                    <span>{tree.name}</span>
                    <span>{tree.height} m</span>
                    <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
                    <b>{(tree.sum / tree.count || 1).toFixed(2)}</b>{/*300 cia apsiskaiciuojam kaip tuos zmoniu balsus suskaiciuoti ir paversti i ju vertinimu vidurki ir du skaiciai po kablelio (tree.sum / tree.count jeigu cia yra 0 dalinam is vieneto*/}
                    <input type="number" min="1" max="10" className="ml-2" value={vote} onChange={e => setVote(e.target.value)}></input>{/*301 laikelis kuriame bus zmoniu balsai ir nurodom nuo kiek iki kiek galima balsuot nuo 1 iki 10*/}
                    <button type="button" className="btn btn-outline-primary ml-2" onClick={clickVote}>Vote</button>{/*302*/}
                    <button type="button" className="btn btn-outline-success ml-2" onClick={clickComment}>Comment</button>{/*40004 komentaro atvaizdavimas*/}

                    </div>

                    <div className="form-group ml-4">
                        <textarea className="form-control" onChange={e => setComment(e.target.value)} value={comment} placeholder="Comment" />{/*40004 komentaro atvaizdavimas*/}
                    </div>

                    <div className="image-holder ml-4">
                        <img alt="" style={{height:"50px"}} src={tree.photo}></img>{/*505atvaizduojam nuotrauka*/}
                    </div>
                    
                    
                    <div className="tree-line__content__comments">
                    {
                        tree.comments ? tree.comments.slice(0, -5).split('-^o^-,').map((c, i) => <div key={i}>{c}</div>) : null ////404//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai//nusiimsim ta kartinuka su kableliu//vietoje katinuko galim ka nors kito papaisyti tik skaicius pasiredaguoti
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

/*kai mes paspausim(onChange) ant setComment setinsim comenta i e.target.value ir steitas nus value={comment}*/