import './App.css'
import Header from './Component/Header/Header'
import Main from './Component/Main/Main'
import Footer from './Component/Footer/Footer'
import CartProvider from './cart/CartProvider'

function App(){
    return(
        <CartProvider>
            <div className='containers'>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </CartProvider>
    )
}

export default App 