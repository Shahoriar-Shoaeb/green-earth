console.log("Hello, World!");
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then((data) => displayCategories(data.categories))
}

const removeActive = () => {
    const allBtn = document.querySelectorAll(".category_btn")
    allBtn.forEach((btn) => btn.classList.remove("active"))
}

const  manageSpinner = (status) => {
    const spinner = document.getElementById("spinner");
    if(status){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("trees_container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("trees_container").classList.remove("hidden");
    }
}

const loadCategoriesTree = (id) =>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clkBtn = document.getElementById(`category_btn_${id}`);
        clkBtn.classList.add("active")
        displayCategoriesTree(data.plants)
    } )
}

const loadTreeDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTreeDetails(data.plants))
}

const loadCart = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCart(data.plants)) 
}

const removeCart = (id) => {
    const cartItem = document.getElementById(`cart_${id}`);
    const price = cartItem.previousElementSibling.lastElementChild.innerText;
    const Total = document.getElementById("total");
    const currTotal = parseFloat(Total.innerText);
    const newTotal = currTotal - parseFloat(price);
    Total.innerText = newTotal.toFixed(2);
    cartItem.parentNode.remove();
}
const displayCart = (plants) => {
    const cartContainer = document.getElementById("cart_container")

    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
    <div class="" style="display:flex; justify-content: space-between; align-items:center">
            <div class="">
              <p>${plants.name}</p>
              <p>${plants.price}</p>
            </div>
            <div id="cart_${plants.id}" onclick="removeCart(${plants.id})" class=""><i class="fa-solid fa-xmark"></i></div>
          </div>
    `
    const Total = document.getElementById("total");
    const currentTotal = parseFloat(Total.innerText);
    const newTotal = currentTotal + parseFloat(plants.price);
    Total.innerText = newTotal.toFixed(2);
    cartContainer.appendChild(cartDiv)
}

const displayCategoriesTree = (plants) => {
    const treesContainer = document.getElementById("trees_container");
    treesContainer.innerHTML = "";

    plants.forEach((tree) => {
        const treeDiv = document.createElement("div");
        treeDiv.innerHTML = `
        <div class="trees_container_div" style="border-radius: 10px;">
        <div style="text-align: center;"><img style=" display:flex; align-items:center" src="${tree.image.replace("ibb.co.com", "ibb.co")}" alt="" width="310" height="185"></div>
        <div class="">
          <h3>${tree.name}</h3>
          <p>${tree.description}</p>
        </div>
        <div class="" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="padding: 5px 10px 5px 10px; border-radius: 400px; color: #15803D; background-color: #DCFCE7;">${tree.category}</p>
          <p style="align-items: center;">${tree.price}</p>
        </div>
        <button style="padding: 12px 111px 12px 111px ; border-radius: 999px; border-style: none; font-size: 16px;" onclick="loadCart(${tree.id})">Add To Cart</button>
      </div>
        `;
        treesContainer.appendChild(treeDiv)
        manageSpinner(false)
    })

}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category_container");
    categoryContainer.innerHTML = "";

    for(let category of categories){
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <button style=" text-align:left; width: 250px;  height: 35px;  padding: 8px 10px 8px 10px;  border-radius: 4px;  font-size: 16px; border: none;" id ="category_btn_${category.id}" onclick="loadCategoriesTree(${category.id})" class="category_btn">${category.category_name}</button>  

       `;
       categoryContainer.append(categoryDiv);
    }
}
loadCategories();