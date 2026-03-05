// Button container container
const categorysContainer = document.getElementById("categorys-container")

// Button data load function
async function loadCategorios() {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/categories"
);
const data = await res.json();
data.categories.forEach(item => { 
    console.log(item)
    const btn = document.createElement("button")
    btn.className = "btn btn-success w-full";
    
});
categorysContainer.innerHTML = 'aksdjfklasdjfs'
}

loadCategorios()