API = "https://cdn.jsdelivr.net/gh/juffalx/TESTsss@main/day01/api.json"
KEY = "forLocalStorate"

const state = {
        dishes:[],
        cart:[],
        search:""
};

const menuE1 = document.querySelector("#menu")
// menuE1.innerHTML = "<P>test</P>"

async function  loadMenu(){
    try {
        const res = await fetch(API)
        console.log(res)
        if(!res.ok) {throw new Error("HTTP"+ res.ok)}

        state.dishes = await res.json();
        render()
    } catch (error) {
        menuE1.textContent = `Could not load the menue b/c of ${error.message}`
    }

}


loadMenu()
// loadMenu() for check if loadmenu is working



function render(){
    // const term = state.search.toLowerCase();
    // search wst yalewn wede lower case qeyrot term lay yasqemtewal
    // const shown = state.dishes.filter(data => 
    //     data.name.toLowerCase().includes(term)
    // )
    // eyandandun state.dishes wst yalutn loop eyaderege keza buhala
    //  term wst kalut gar smachewn yamesaslewal ena true yametutn hulunm return yadergal 

        const shown = state.dishes
    menuE1.innerHTML = shown.map(data => 
        `<section id="menu" aria-label="Menu">
        <article class="dish" data-id=${data.id}
          <h3>${data.name}</h3>
          <p class="category">${data.catagory}</p>
          <p class="spicy">${data.spicy?data.spicy:""}</p>
          <p class="price">${data.price} ETB</p>
          <button class="add">Add</button>
        </article>`
    ).join("")
    // renderCart()

}


// const searchE1 = document.querySelector("#search")

// searchE1.addEventListener("input", (e) => {

//     state.search = e.target.value;
//     render()
// }
// )
// menuE1.addEventListener("click", (e) => {
//     if(!e.target.matches(".add")) return;
//     const id = Number(e.target.closest(".dish").dataset.id)
//     const dish = state.dishes.find(d => d.id == id);
//     const line = state.cart.find(i => i == id);

//     if (line) line.qty++;

//     else state.cart.push({...dish,qty:1});

//     save();
//     render()
// })

// remove handled the same way on the cart panel

// const cartE1 = document.querySelector("#cart")

// cartE1.addEventListener("click", (e) => {
//     if(!e.target.match(".rm")) return;
    
//     const id = Number(e.target.closest("li").dataset.id)
//     state.cart =   state.cart.filter(data => data.id !== id)
//     save()
//     render()
// })

