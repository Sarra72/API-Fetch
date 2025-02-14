const apiUrl = 'https://fakestoreapi.com/products';
var closeCart = document.querySelector(".close");
var closeCartEvent = document.getElementById("products-cart");
var cartIcon = document.getElementById("cart-icon");
var seachInput = document.querySelector(".search-input");
var addToCartBtn =document.querySelector(".add-to-cart");
var prodContainer = document.querySelector(".products-container");
var prodInCart = document.querySelector(".products-cart");


closeCart.addEventListener("click",()=>{
    closeCartEvent.classList.replace("cart","cart-close");
});

cartIcon.addEventListener("click",()=>{
    closeCartEvent.classList.replace("cart-close","cart");
});

var dataList=[];

async function fetchData() {
    let response = await fetch(apiUrl);
    if(response.ok){
    const data = await response.json();
    dataList = data;
    displayProducts();
    }
}

function productInHomePage(i){
    return `<div class="products d-flex flex-column shadow p-4" id="products-container">
            <img src="${dataList[i].image}" alt="${dataList[i].title}" class="product-image m-auto">
            <div class="info-products d-flex justify-content-between">
                <h4 class="product-title"><b>${dataList[i].title}</b></h4>
                <p class="product-price">${dataList[i].price}$</p>
            </div>
            <p class="description">${dataList[i].description}</p>
            <button class="btn btn-dark add-to-cart" onclick="addToCart(${i})">Add To Cart</button>
        </div>`
}

function displayProducts() {
    
    let element= '';
    for(i=0; i<dataList.length ;i++){
        element+= productInHomePage(i);
    }
    prodContainer.innerHTML=element;
}

seachInput.addEventListener("input",(m)=>{
    var value = m.target.value;
    var element ='';

    for(i=0 ; i< dataList.length ;i++ ){
        if(dataList[i].title.toLowerCase().includes(value.toLowerCase())){
            element+= productInHomePage(i);
        }
    }

    prodContainer.innerHTML=element;

})

function createProductInCart(i ,quantity = 1, totalPrice = dataList[i].price){
    return`<div class="product-cart text-light d-flex align-items-center border-2 border gap-3 " data-id="${i}">
                    <img class="img-cart w-25" src="${dataList[i].image}" alt="${dataList[i].title}">
                    <div class="product-info d-flex flex-column ">
                        <p class="title my-3" ><b>${dataList[i].title}</b></p>
                        <p class="price">${dataList[i].price}$</p>
                    </div>
                    <div class="prod-cart-controls d-flex gap-0 align-items-center">
                        <button class="minus  border-1 border px-1" onclick="subtractSameProduct(${i})" >-</button>
                        <span class="num  border-1 border px-1">${quantity}</span>
                        <button class="plus  border-1 border px-1"  onclick="addSameProduct(${i})" >+</button>
                    </div> 
                    <i class="fa-solid fa-trash p-2" onclick="Delete(this)"></i>
                </div>`
}


let cartItems = []; 
let cartCount = 0; 
let eleCart =[];
function addToCart(index){
    let itemElement = document.querySelector(`.product-cart[data-id="${index}"]`);
            if (itemElement) {
                updateProductQuantityAndPrice(index);
            } else{
                prodInCart.innerHTML += createProductInCart(index);
                updateCount(index);
            }
   
}

function updateProductQuantityAndPrice(index) {
    const itemElement = document.querySelector(`.product-cart[data-id="${index}"]`);
    const numSpan = itemElement.querySelector('.num');
    const priceSpan = itemElement.querySelector('.price');
    
    let currentQuantity = parseInt(numSpan.textContent) || 1;
    let currentPrice = parseFloat(priceSpan.textContent) || dataList[index].price;

    currentQuantity += 1;
    currentPrice += dataList[index].price;

    numSpan.textContent = currentQuantity;
    priceSpan.textContent = currentPrice.toFixed(2);  // Update price with 2 decimals

    cartCount += 1;
    document.getElementById("cart-count").innerHTML = cartCount;
}

 function addSameProduct(index) {
    const itemElement = document.querySelector(`.product-cart[data-id="${index}"]`);
    const numSpan = itemElement.querySelector('.num');
    let currentQuantity = parseInt(numSpan.textContent) || 1;
    currentQuantity += 1;
    numSpan.textContent = currentQuantity;

    const priceSpan = itemElement.querySelector('.price');
    const unitPrice = dataList[index].price;
    let currentPrice = parseFloat(priceSpan.textContent);
    currentPrice += unitPrice;

    priceSpan.textContent = currentPrice.toFixed(2);

    cartCount += 1;
    document.getElementById("cart-count").innerHTML = cartCount;
}

// Decrease product quantity
function subtractSameProduct(index) {
    const itemElement = document.querySelector(`.product-cart[data-id="${index}"]`);
    const numSpan = itemElement.querySelector('.num');
    let currentQuantity = parseInt(numSpan.textContent) || 1;

    if (currentQuantity > 1) {
        currentQuantity -= 1;
        numSpan.textContent = currentQuantity;

        // Update the price based on quantity
        const priceSpan = itemElement.querySelector('.price');
        const unitPrice = dataList[index].price;
        let currentPrice = parseFloat(priceSpan.textContent);
        currentPrice -= unitPrice;

        priceSpan.textContent = currentPrice.toFixed(2);

        // Update the cart count
        cartCount -= 1;
        document.getElementById("cart-count").innerHTML = cartCount;
    }
}

function updateCount(i){
    let count = document.getElementById("cart-count");

    cartItems.push(i);
    cartCount += 1;

    count.innerHTML = cartCount; 
}

function Delete(trashIcon){
    let itemElement = trashIcon.closest('.product-cart');
    const itemIndex = itemElement.getAttribute('data-id');

    const numSpan = itemElement.querySelector('.num');
    let currentQuantity = parseInt(numSpan.textContent);

    cartItems = cartItems.filter(item => item.index !== parseInt(itemIndex));
    cartCount -= currentQuantity;

    document.getElementById("cart-count").innerHTML = cartCount;

    itemElement.remove();
}


fetchData(); 
