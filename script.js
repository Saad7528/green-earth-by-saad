// Button container container
const categorysContainer = document.getElementById("categorys-container")
const treeContainer = document.getElementById('tree-container')
const loadSpinner = document.getElementById('load-spinner')
const allCategoryBtn = document.getElementById("all-Categorys-btn")
const treeDetailsModal = document.getElementById("tree-details-modal")

const modalImage = document.getElementById("modal-image")
const modalTitle = document.getElementById("modal-title")
const modalCategory = document.getElementById("modal-category")
const modalDescription = document.getElementById("modal-description")
const modalPrice = document.getElementById("modal-price")

const cartContainer = document.getElementById("cart-container")
let cart = [];


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
    const allTreeButton = document.querySelectorAll("#categorys-container button, #all-Categorys-btn");
    allTreeButton.forEach( (btns) => btns.classList.remove("btn-success"))
    btn.classList.add("btn-success")

    // id to fetch data and show
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data = await res.json();
    console.log(data.plants)   
    displayTrees(data.plants)
    loading(false)     
}
// true false ar maddhome try korechilam
function loading(receive) {
    if(receive === true){
        loadSpinner.classList.remove('hidden')
        treeContainer.innerHTML = "";

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

allCategoryBtn.addEventListener("click", (event) => {
    loading(true)

    const allTreeButton = document.querySelectorAll("#categorys-container button, #all-Categorys-btn");
    allTreeButton.forEach( (btns) => btns.classList.remove("btn-success"))
    allCategoryBtn.classList.add("btn-success")

    loadTree()
    loading(false)     

})

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
             class="h-48 w-full object-cover hover:cursor-pointer"
             onclick="openTreeModal(${tree.id})"
             />
         </figure>
        
         <div class="card-body">
             <h2 class="card-title text-[#15803D] cursor-pointer hover:text-green-500" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
             <p class="line-clamp-2">${tree.description}</p>
             <div class="badge badge-outline badge-success">${tree.category}</div>  
             <div class="card-actions  justify-between items-center">
                 <h2 class="text-2xl font-bold text-[#15803D]">${tree.price}TK</h2>
             <button class="btn btn-success text-white" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">Cart</button>
             </div>
         </div>`

    treeContainer.appendChild(card)
    })
}


async function openTreeModal (treeId) {
    // console.log(treeId)
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
    const data = await res.json();
    const plantsDtails = data.plants
    treeDetailsModal.showModal();
    // console.log("data", plantsDtails);
    console.log(modalTitle)
    
    modalTitle.innerText = plantsDtails.name;
    modalCategory.innerText = plantsDtails.category;
    modalImage.src = plantsDtails.image;
    modalDescription.textContent = plantsDtails.description;
    modalPrice.textContent = plantsDtails.price;


}

function addToCart(id, name, price) {
    console.log(id, name, price)

      const existingItem = cart.find((item) => item.id === id);
     if(existingItem){
        existingItem.quantity += 1;
     }else{
        
         cart.push({
             id,
             name,
             price,
             quantity: 1,
         })
     }

    updateCart()
}

function updateCart() {
    cartContainer.innerHTML = "";
    console.log(cart)
  
    cart.forEach(item => {

        const cartItem = document.createElement("div")
        cartItem.className = "card card-body shadow-sm";
        cartItem.innerHTML = `<div class="flex justify-between items-center">
                                <div>
                                    <h2>${item.name}</h2>
                                    <p>${item.price} x ${item.quantity}}</p>
                                </div>
                                <button class="btn btn-ghost" onclick="removeFromCart(${item.id})" >X</button>
                            </div>
                            <p class="text-right font-semibold text-xl">${item.price * item.quantity} TK</p>`;
    cartContainer.appendChild(cartItem)
    })
}

function removeFromCart(treeId) {
    console.log("amivat khai", treeId)
    const updatedCartArray = cart.filter(item => item.id != treeId);
    cart = updatedCartArray;
    updateCart()


}

loadTree();

loadCategorios();