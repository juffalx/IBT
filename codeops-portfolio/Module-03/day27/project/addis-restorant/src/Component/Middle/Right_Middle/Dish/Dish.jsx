import { useState } from "react"
import Card from "./Card"
import './Dish.css'


function Dish({name, price, category, spicy}) {

  const [count, setCounts] = useState(0)

  return (
    <Card>
        <h3>{name}</h3>
        <p>{price}</p>
        <p className="category">{category}</p>
        {Boolean(spicy) && <p>Spicy </p>}
        <button onClick={() => setCounts( count + 1)}>Add</button>
        {Boolean(count)&& <p>{count}</p>}
    </Card>
  )
}

export default Dish