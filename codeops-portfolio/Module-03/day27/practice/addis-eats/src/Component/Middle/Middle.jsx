import Dish from "../Dish/Dish"

const menu = [
{ id: 1, name: "Doro Wat",category:"Main", price: 240,spicy:"true"},
{ id: 2, name: "Shiro",category:"Vegitable", price: 120,spicy:"false"},
{ id: 3, name: "Tibs",category:"Sga" ,price: 280,spicy:"True"},
];




function Middle() {

    const category = "All";


    const term = category.trim().toLowerCase()
    const show = category.trim().toLowerCase() === "all"?menu:menu.filter((value) => value.category.trim().toLowerCase().includes(term))
    console.log(show)

    return(
        <div>
            {show.map((value) => <Dish category={value.category} name={value.name} id={value.id} key={value.id} spicy={value.spicy} price={value.price}/>)}
        </div>
    )
}

export default Middle