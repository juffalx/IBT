import './Main.css'

import CatagoryBar from "./Sidebar/CatagoryBar"
import Menu from "./Menu/Menu"
import OrderForm from "./OrderForm/OrderForm"
import { useState } from 'react'

function Main() {
    const [category, setCategory] = useState("All")

    return (
        <div className="main-wrap">
            <div className="container-grid">
                <CatagoryBar selected={category} onSelect={setCategory} />
                <Menu category={category} />
            </div>
            <OrderForm />
        </div>
    )
}

export default Main
