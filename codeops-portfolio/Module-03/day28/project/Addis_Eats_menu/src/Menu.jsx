import { useState } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'
import { dishes } from './data'
import './Menu.css'

function Menu(){
    const [category, setCategory] = useState("All")
    const [total, setTotal] = useState(0)

    const shown = category === "All"
        ? dishes
        : dishes.filter(d => d.category === category)

    function addToOrder(price){
        setTotal(t => t + price)
    }

    return (
        <div className="menu-page">
            <h2>Addis Eats Menu</h2>
            <CategoryBar selected={category} onSelect={setCategory} />
            <DishList dishes={shown} onAdd={addToOrder} />
            <p className="order-total">Order total: {total} ETB</p>
            <OrderForm />
        </div>
    )
}

export default Menu
