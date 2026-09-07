import './Midle.css'
import PropTypes from 'prop-types'

import Sidebar from "./Sidebar/Sidebar"
import Menu from "./Menu/Menu"

function First({ onAdd }) {
    return (
        <div className="container-grid">
            <Sidebar />
            <Menu onAdd={onAdd} />
        </div>
    )
}

First.propTypes = {
    onAdd: PropTypes.func.isRequired,
}

export default First
