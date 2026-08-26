import './App.css'
import Header from './Component/Header/Header'
import First from './Component/Main/First'
import Footer from './Component/Footer/Footer'

function App(){
    return(
        <div className='containers' id='test'>
            <Header/>
            <First/>
            <Footer/>
        </div>
    )
}

export default App