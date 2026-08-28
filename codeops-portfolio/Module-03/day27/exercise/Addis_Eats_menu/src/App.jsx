import './App.css'
import Header from './Component/Header/Header'
import Midle from './Component/Main/Midle'
import Footer from './Component/Footer/Footer'

function App(){
    return(
        <div className='containers' id='test'>
            <Header/>
            <Midle/>
            <Footer/>
        </div>
    )
}

export default App