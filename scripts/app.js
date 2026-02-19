const nav = document.querySelector('nav');
const menuIcon = document.querySelector('.bi-list');


menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const productGrid = document.getElementById("productGrid");
const cart = document.querySelector('.cart-icon p');

let cartTotal = 0; // GLOBAL CART COUNT
let cartamount = 0;
let count = 0;
let cartItems = [];

fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(products => {

products.forEach(product => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="${product.image}" alt="${product.title}">
<h3>${product.title}</h3>
<p>₹ ${Math.ceil(product.price)}</p>
<button class="add-btn">Add to Cart</button>
`;
const btn = card.querySelector('.add-btn');

btn.addEventListener('click', addFirstTime);

function addFirstTime() {

let existing = cartItems.find(i => i.id === product.id);

if(existing){
    existing.qty++;
}else{
    cartItems.push({
        ...product,
        qty:1
    });
}

cartTotal++;
cartamount += product.price;

updateCart();
renderCounter();
}


function renderCounter() {

let item = cartItems.find(i => i.id === product.id);

btn.innerHTML = `
<div class="cart-count">
<button class="dec">-</button>
<span>${item.qty}</span>
<button class="inc">+</button>
</div>
`;

const dec = btn.querySelector('.dec');
const inc = btn.querySelector('.inc');
const span = btn.querySelector('span');

inc.addEventListener('click', (e)=>{
e.stopPropagation();

item.qty++;
cartTotal++;
cartamount += product.price;

span.textContent = item.qty;

updateCart();
});

dec.addEventListener('click', (e)=>{
e.stopPropagation();

if(item.qty > 0){
item.qty--;
cartTotal--;
cartamount -= product.price;

span.textContent = item.qty;
updateCart();
}

if(item.qty === 0){
cartItems = cartItems.filter(i=>i.id !== product.id);

btn.innerHTML = "Add to Cart";
btn.addEventListener('click', addFirstTime);
}
});
}


productGrid.appendChild(card);

});
});
 const carti = document.querySelector(".cart-icon");
function updateCart(){  

    if(cartTotal === 0){
        cart.textContent = 'Cart';
        carti.classList.remove("update");
        cart.classList.remove("cupdate")
    }else{ 
    cart.innerHTML = `<a class="details">${cartTotal} items <br> ₹ ${Math.ceil(cartamount)}</a>`;
    cart.classList.add("cupdate")
    carti.classList.add("update")
    }
    cartdata();
    syncButtons();  
}   

function syncButtons(){

document.querySelectorAll(".card").forEach(card=>{

const title = card.querySelector("h3").textContent;
const btn = card.querySelector("button");

const item = cartItems.find(i=>i.title===title);

if(!item){
btn.textContent="Add to Cart";
return;
}

btn.innerHTML = `
<div class="cart-count">
<button class="dec">-</button>
<span>${item.qty}</span>
<button class="inc">+</button>
</div>
`;

});
}

nav.addEventListener("click",()=>{
    cartpage.style.display = "none";
})

const cartpage = document.createElement("div");
cartpage.classList.add("cartpage");

const productsum= document.createElement("div");
productsum.classList.add("productsum")
const productdetails = document.createElement("div");
productdetails.classList.add("productdetails")

const cartmenu = document.querySelector(".cartmenu");

cart.addEventListener("click",()=>{
    cartpage.style.display= "flex";
    cartmenu.appendChild(cartpage);
    cartmenu.classList.toggle("cartmenu_none");
    cartpage.classList.toggle("enter");
    if(cartTotal === 0){
        cartpage.innerHTML = `<p class="empty">Your cart is empty</p>`;
    }else{
    cartdata();
    syncButtons();

    }
})


function cartdata(){
    cartpage.innerHTML = "";
    productdetails.innerHTML = "";
    cartItems.forEach(item=>{
        productdetails.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" width="60">
            <p>${item.title}</p>
            <span>₹${Math.ceil(item.price)} × ${item.qty} <button>Remove</button></span>
        </div>
        `;
        const removeBtns = productdetails.querySelectorAll("button");
        removeBtns.forEach((btn,index)=>{
            btn.onclick=()=>{
                const item = cartItems[index];

                cartTotal -= item.qty;
                cartamount -= item.price * item.qty;

                cartItems = cartItems.filter(i=>i.id!==item.id);

                updateCart();
            };
        });
        cartpage.appendChild(productdetails);
    });
   
    const platform = Math.ceil(cartamount<500?cartamount/20:25);
    const discount = Math.ceil(cartamount/10);
    const sumcart = Math.ceil(cartamount+platform-discount);

    productsum.innerHTML = `
    <div class="productmenu">
        <h4>Price details</h4>
        <p><text><span style='border-bottom: 1px dashed gray;'>MRP</span><span>₹${Math.ceil(cartamount)}<span></text>
        <text><span style='border-bottom: 1px dashed gray;'>Platform Fee </span><span>₹${platform}</text> 
        <text><span style='border-bottom: 1px dashed gray;'>Discount </span><span>₹${discount}</text> 
        <text style='font-weight:bold;border-top: 1px solid gray;'><span>Total Amount </span><span>₹${sumcart}</span></text></p>
    </div>
    <button class="oderplace">Place Order</button>
    `;
    cartpage.appendChild(productdetails);
    cartpage.appendChild(productsum);
}

