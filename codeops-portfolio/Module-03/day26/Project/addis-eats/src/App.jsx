import './App.css';

const menu = [
{ id: 1, name: "Doro Wat", price: 240 },
{ id: 2, name: "Shiro", price: 120 },
{ id: 3, name: "Tibs", price: 280 },
];

function Dish({id,name, price}){
  return(
  <div id={id}>
    <h3>{name}</h3>
    <p>{price}</p>
  </div>
)
}

function App(){
  return(
  <>
    {
    menu.map((value) => 
    <Dish name={value.name} price={value.price} id={value.id}/>)
    }
  </>
  );
}
export default App;