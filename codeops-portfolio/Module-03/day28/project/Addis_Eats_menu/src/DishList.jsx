import { useState } from 'react'
import './DishList.css'

function Dish({ name, price, spicy, onAdd }){
    const [count, setCount] = useState(0)

    function handleClick(){
        setCount(c => c + 1)
        onAdd(price)
    }

    return (
        <div className="dish-card">
            <h3>{name}</h3>
            <p>{price} ETB</p>
            {spicy && <span className="spicy">Spicy</span>}
            <button onClick={handleClick}>Add</button>
            {count > 0 && <p>{count}</p>}
        </div>
    )
}

function DishList({ dishes, onAdd }){
    if(dishes.length === 0){
        return <p className="empty-state">No dishes in this category yet.</p>
    }

    return (
        <div className="dish-grid">
            {dishes.map(d => (
                <Dish key={d.id} name={d.name} price={d.price} spicy={d.spicy} onAdd={onAdd} />
            ))}
        </div>
    )
}

export default DishList
