import './Menu.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Dish from './Dishes/Dish'
import CategoryBar from './CategoryBar/CategoryBar'
import OrderForm from './OrderForm/OrderForm'
import { dishes, categories } from './data'

function Products({ onAdd }) {
    const [category, setCategory] = useState("All")

    const filteredDishes = category === "All"
        ? dishes
        : dishes.filter(item => item.category === category)

    return (
        <div className='dish-grid'>
            <h3 className="menu">Products Menu</h3>

            <CategoryBar
                categories={categories}
                selected={category}
                onSelect={setCategory}
            />

            <div className='item'>
                {filteredDishes.length === 0 ? (
                    <p className="empty-state">No dishes found for "{category}".</p>
                ) : (
                    filteredDishes.map(value => (
                        <Dish
                            key={value.id}
                            id={value.id}
                            name={value.name}
                            price={value.price}
                            spicy={value.spicy}
                            onAdd={onAdd}
                        />
                    ))
                )}
            </div>

            <OrderForm />
        </div>
    )
}

Products.propTypes = {
    onAdd: PropTypes.func.isRequired,
}

export default Products
