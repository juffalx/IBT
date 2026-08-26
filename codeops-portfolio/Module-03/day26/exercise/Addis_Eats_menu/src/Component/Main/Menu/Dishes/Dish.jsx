import './Dish.css'

function Dish({id,name,price}){
    return(
        <div className='card' id={id}>
            <div className='card-title'>
                <h3>{name}</h3>
            </div>
            <p>{price}</p>
            <button>Add</button>
      </div>
    )
}

export default Dish