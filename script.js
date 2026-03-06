// Button container container
const categorysContainer = document.getElementById("categorys-container")
const treeContainer = document.getElementById('tree-container')
const loadSpinner = document.getElementById('load-spinner')

// Button data load function
async function loadCategorios() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/categories"
);
const data = await res.json();
data.categories.forEach(item => { 
    // console.log(item)
    const btn = document.createElement("button")
    btn.className = "btn  w-full";
    btn.textContent = item.category_name;
    btn.onclick = () => selectCategory(item.id, btn)

    categorysContainer.appendChild(btn)
    
    
});
}

async function selectCategory(id, btn) {
    loading(true)
    // button style part
    const allTreeButton = document.querySelectorAll("#categorys-container button, #all-tree-btn");
    allTreeButton.forEach( (btns) => btns.classList.remove("btn-success"))
    btn.classList.add("btn-success")

    // id to fetch data and show
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data = await res.json();
    console.log(data.plants)    
}
// true false ar maddhome try korechilam
function loading(receive) {
    if(receive === true){
        loadSpinner.classList.remove('hidden')
    }else{
         loadSpinner.classList.add('hidden')

    }
}


// function showLoading() {
//     loadSpinner.classList.remove("hidden")
//     treeContainer.innerHTML = "";
// } 
// function hideLoading(){
//     loadSpinner.classList.add("hidden")
// }

async function loadTree () {
    loading(true)
    const res = await fetch ("https://openapi.programming-hero.com/api/plants")
    const data = await res.json();
    loading(false)
    displayTrees(data.plants);
}

function displayTrees (trees) {
    trees.forEach((tree) => {
    const card = document.createElement("div")
    card.className = "card bg-base-100  shadow-sm"
    card.innerHTML = `
         <figure>
             <img
             src="${tree.image}"
             alt="${tree.name}"
             title="${tree.name}"
             class="h-48 w-full object-cover"
             />
         </figure>
        
         <div class="card-body">
             <h2 class="card-title text-[#15803D]">${tree.name}</h2>
             <p class="line-clamp-2">${tree.description}</p>
             <div class="badge badge-outline badge-success">${tree.category}</div>  
             <div class="card-actions  justify-between items-center">
                 <h2 class="text-2xl font-bold text-[#15803D]">${tree.price}TK</h2>
             <button class="btn btn-success text-white">Buy Now</button>
             </div>
         </div>`

    treeContainer.appendChild(card)
    })
}
loadTree();

loadCategorios();