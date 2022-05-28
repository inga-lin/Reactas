
function SizeList({sizes}) {

    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>Size List</h2>
            </div>
            <div className="card-body">

            <ul className="list-group mt-4">
                        {
                        sizes.map(c => (
                            <li className="list-group-item" key={c.id}>
                                {c.size}
                            </li>
                        ))
                    }
            </ul>
            </div>
        </div>
    )
}
export default SizeList;