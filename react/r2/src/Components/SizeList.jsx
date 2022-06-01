
function SizeList({sizes}) {
//801 Size List lentele
    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>Size List</h2>
            </div>
            <div className="card-body">

                <ul className="list-group mt-4">
                    {
                          sizes.map(c => (<li className="list-group-item" key={c.id}>{c.size}
                         <div>
                            <button type="button"  className="btn btn-outline-danger mt-3 deletle">Delete</button>{/*700 komentaro istrinimas*/}
                         </div>
                           </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
export default SizeList;