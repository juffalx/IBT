import './Menu.css'
import Dish from './Dishes/Dish'
import { useState } from 'react'

const dish = [
  { "id": 1, "name": "Doro Wat", "category": "Main", "price": 240, "spicy": true },
  { "id": 2, "name": "Shiro", "category": "Vegetarian", "price": 120, "spicy": false },
  { "id": 3, "name": "Kitfo", "category": "Main", "price": 320, "spicy": true },
  { "id": 4, "name": "Tibs", "category": "Main", "price": 280, "spicy": true },
  { "id": 5, "name": "Injera Firfir", "category": "Breakfast", "price": 100, "spicy": true },
  { "id": 6, "name": "Beyaynetu", "category": "Vegetarian", "price": 150, "spicy": false },
  { "id": 7, "name": "Misir Wat", "category": "Vegetarian", "price": 110, "spicy": true },
  { "id": 8, "name": "Gomen", "category": "Vegetarian", "price": 90, "spicy": false },
  { "id": 9, "name": "Atkilt Wot", "category": "Vegetarian", "price": 100, "spicy": false },
  { "id": 10, "name": "Derek Tibs", "category": "Main", "price": 310, "spicy": true },
  { "id": 11, "name": "Key Wat", "category": "Main", "price": 220, "spicy": true },
  { "id": 12, "name": "Alicha Wat", "category": "Main", "price": 210, "spicy": false },
  { "id": 13, "name": "Bozena Shiro", "category": "Main", "price": 180, "spicy": true },
  { "id": 14, "name": "Ayibe", "category": "Side", "price": 70, "spicy": false },
  { "id": 15, "name": "Kocho", "category": "Side", "price": 60, "spicy": false },
  { "id": 16, "name": "Enkulal Firfir", "category": "Breakfast", "price": 110, "spicy": true },
  { "id": 17, "name": "Fuul", "category": "Breakfast", "price": 90, "spicy": true },
  { "id": 18, "name": "Genfo", "category": "Breakfast", "price": 130, "spicy": true },
  { "id": 19, "name": "Chechebsa", "category": "Breakfast", "price": 120, "spicy": true },
  { "id": 20, "name": "Kik Alicha", "category": "Vegetarian", "price": 100, "spicy": false }
]

function Products({ category }) {
    const [total, setTotal] = useState(0)

    function addTotal(price){
        setTotal(b => b + price)
    }

    const filteredDishes = category === "All"
        ? dish
        : dish.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase())

    return (
        <div className='dish-grid'>
            <h3 className="menu">Products Menu</h3>
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
                            countBtn={addTotal}
                        />
                    ))
                )}
            </div>
            <p className='order-total'>Total: {total} ETB</p>
        </div>
    )
}

export default Products
