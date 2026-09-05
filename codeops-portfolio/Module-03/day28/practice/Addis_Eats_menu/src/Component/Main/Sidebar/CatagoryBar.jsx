import './CatagoryBar.css'

function CatagoryBar({ selected, onSelect }){
    const cats = ["All", "Main", "Vegetarian", "Breakfast", "Side"]

    return(
        <div className='sidebar'>
            <h3>Sidebar</h3>
            {cats.map(cat => (
                <button
                    key={cat}
                    className={cat === selected ? "chip on" : "chip"}
                    onClick={() => onSelect(cat)}>
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default CatagoryBar;
