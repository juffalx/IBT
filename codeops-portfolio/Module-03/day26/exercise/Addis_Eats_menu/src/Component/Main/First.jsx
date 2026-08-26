import './First.css'

import Sidebar from "./Sidebar/Sidebar"
import Menu from "./Menu/Menu"

function First(){
    return(
        <div className="container-grid">
            <Sidebar/>
            <Menu/>
        </div>
    )
}

export default First