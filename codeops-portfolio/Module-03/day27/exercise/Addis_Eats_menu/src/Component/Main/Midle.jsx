import './Midle.css'

import Sidebar from "./Sidebar/Sidebar"
import Menu from "./Menu/Menu"

function First() {
    // Static for today's exercise — try "Vegetarian", "Side", or a
    // category with no matches (e.g. "Dessert") to see the empty state.
    // Tomorrow this becomes state, driven by clicking the Sidebar.
    const activeCategory = "All"

    return (
        <div className="container-grid">
            <Sidebar />
            <Menu category={activeCategory} />
        </div>
    )
}

export default First
