import './CategoryBar.css'

function CategoryBar({ selected, onSelect }){
    const cats = ["All", "Main", "Vegetarian", "Breakfast", "Side"]

    return (
        <div className="category-bar">
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

export default CategoryBar
