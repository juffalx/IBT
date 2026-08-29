import './App.css'
import { useState } from 'react'
import Header from './Component/Header/Header'
import Midle from './Component/Main/Midle'
import Footer from './Component/Footer/Footer'

function App(){
    const [cartCount, setCartCount] = useState(0)
    const [orderTotal, setOrderTotal] = useState(0)

    function handleAdd(price) {
        setOrderTotal(total => total + price)
        setCartCount(c => c + 1)
    }

    return(
        <div className='containers' id='test'>
            <Header cartCount={cartCount} orderTotal={orderTotal} />
            <Midle onAdd={handleAdd} />
            <Footer/>
        </div>
    )
}

export default App
