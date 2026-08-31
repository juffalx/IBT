import { useState } from 'react'
import Button from './Button'
import Dish from './Dish/Dish'
import './RightMiddle.css'


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



function RigthMiddle() {
    const [userCategory, setUserCategory] = useState("All")   
    const show = userCategory == "All"?dish:dish.filter(value => value.category == userCategory)
     
  return (
    <div className='right-middle-grid'>
        <div className='dish-btn'>
            <Button label={"Main"} sineka_miserawn={() => setUserCategory("Main")}/>
            <Button label={"Vegetarian"} sineka_miserawn={() => setUserCategory("Vegetarian")}/>
            <Button label={"Breakfast"} sineka_miserawn={() => setUserCategory("Breakfast")}/>
        </div>
        <div className='right-middle-menu-grid'>
            {show.length == 0?<p>Not Found</p>:show.map((value) => 
            <Dish 
            name={value.name} 
            key={value.id} 
            price={value.price} 
            category={value.category}
            />)}
        </div>
    </div>
  )
}

export default RigthMiddle