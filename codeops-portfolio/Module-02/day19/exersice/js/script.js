// for visualise if my input or item aray is 
//   { id: 1, text: "ዶዎወ", done: false },
//   { id: 2, text: "እንጀራ", done: false },
//   { id: 3, text: "እንቁላል", done: true }

// TODO: Hold items in an array (this is your single source of truth)
let items = [];  // 
let nextId = 1; // i use this for every id is unique by inccrements

// TODO: Select necessary DOM elements (form, input, list, count)
const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("list");
const count = document.getElementById("count");


// TODO: Write a render() function to rebuild the list from the array
// 1. Clear the current list (innerHTML = "")
// 2. Loop through the items array
// 3. Create elements, use data-id on each row, and append to the list
// 4. Update the live count paragraph


function render() {
  list.innerHTML = "";  // ሁሉንም ባዶ እናደርጋቸዋለን ምክንያቱም ዳታ መውሰድ ያለበት ከ item ብቻ ነው
 
  items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;  // dataset id ሚባል አትሪቢዩት id="" ሚባል ክሬት ያደርግ እና value ከ item ላይ ወስዶ ያስቀምጠዋል
    if (item.done) {
      li.classList.add("done");  // done ሚባለውን ክላስ add ያደርገዋል ምክንያቱም done = true ከሆነ css ፋይላችን ላይ text-decoration line-through ወይም መስመር ያደርግበታል
    }
 
    const span = document.createElement("span"); // ስፓን ታግ ክሬት አድርገን
    span.textContent = item.text;  // ስፓን ያደረኘው ውስጥ ኮንተንቱን ከ አይተም አሬይ ላይ እንሰጠዋለን
    li.appendChild(span);   // ከዛ list ታግ ላይ እንጨምረዋለን
 
    const deleteButton = document.createElement("button");  // dellte button create እናደርጋለን
    deleteButton.textContent = "Remove";  // ስሙን Remove እናደርገዋለን
    deleteButton.className = "del"; // del ሚባል ክላስ create እናደርጋለን ምክንያቱም css ላይ ያሉ apply እንዲሆኑ
    li.appendChild(deleteButton);
 
    list.appendChild(li);  //  ከዛ ከላይ የሰራናቸው ሁሉም ማለትም li list ላይ append እናደርጋቸዋለን ማለትም ul ላይ
  });
 
  const remaining = items.filter((item) => !item.done).length;  // የቀሩትን filter አድርገን ከዛ የነሱን length ማለት ብዛታቸውን እናስቀምጣለን 
  count.textContent = `${remaining} item${remaining === 1 ? "" : "s"} remaining (${items.length} total)`; // ብዛታቸው 1 ከሆነ ምንም አያደርግም ግን ከ1 በላይ ከሆነ item ላይ s ይጨምርልናል፤ ብዜትን ለማሳየት
}
// TODO: Handle form submission
// 1. preventDefault to stop page reload
// 2. Read and validate the input
// 3. Push a new object to the items array (include a unique id and done: false)
// 4. Call render()
form.addEventListener("submit", (e) => {
  e.preventDefault(); //browser sayhone ene erase control aregewalew እንደማለት ምክንያቱም ብሮዘሩ submit ሲደረግ refresh ያደርገዋል ፤ ሶ እንደዛ ከሆነ ደግሞ ዳታ ይጠፋል
 
  const text = input.value.trim();  //trim()  alasfelagi space remove yadergal 
  if (text === "") { // ባዶ ከሆነ ምንም አይነት ስራ አይሰራም ቀጥታ return በማለት እንዲወጣ ወይም ምንም እንዳይሰራ ከሱ በታች ያሉትን skip አድርጎ እንዲወጣ እናደርጋለን ባዶ ካልሆነ ግን
    return;
  }
 
  items.push({ id: nextId++, text, done: false }); // item ሚባለው ሊስት ላይ ያስቀምጠዋል ፤ nextId ለእያንዳንዱ unique የሆነ id ከ1 ጀምሮ በተርታ ይሰጠዋል
  input.value = ""; // ከዛ ቡሃላ value ባዶ ያደርገዋል
  input.focus(); // ከዛ input ላይ ፎከስ ያደርገዋል ምክንያቱም ቀጣይ ላይ እራሱ ፎርም ላይ ይወስደናል 
 
  render();
});

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
// 2. Use e.target and closest() to find the clicked row
// 3. Determine if the user is toggling ".done" or removing a row
// 4. Update the items array accordingly
// 5. Call render()
list.addEventListener("click", (e) => {
  const li = e.target.closest("li"); // ተመሳሳይ ነው ግን ሊስን ሚያደርገው submit ሳይሆን click ነው እና list ላይ ነው
  if (!li) return; // ena li ካልሆነ ደግሞ ምንም አያደርግም
 
  const id = Number(li.dataset.id);  // li ያለውን id intigger value
 
  if (e.target.classList.contains("del")) {  // del ሚባል ክላስ አለ ወይስ የለም ሚለው ቼክ ያደርግ እና ካለ
    
    items = items.filter((item) => item.id !== id); //ከ id ጋር  ተመሳሳይ ያልሆንትን ስለማይመርጣቸው በሌላ ቋንቋ የተነካውን ብቻ ሰሌክት ያደርገው እና ለ items ቫሪያብል ይሰጠዋል
  } else {
    
    const item = items.find((item) => item.id === id); // ካልሆን ሌላ ቦታ የተነካውን ለ item ይሰጠዋል
    if (item) {
      item.done = !item.done; // item.done reverse አድርገው 
    }
  }
 
  render(); 
});
 

render();








