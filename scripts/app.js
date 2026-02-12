const nav = document.querySelector('nav');
const menuIcon = document.querySelector('.bi-list');
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});


const productGrid = document.getElementById("productGrid");

const cart = document.querySelector('.cart-icon');
const cartchange = cart.querySelector('p');

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
        
        const btn = card.querySelector('.add-to-cart');
        let count = 0;
        btn.addEventListener('click', () => {
            if (count == 0) {
            count = 1;
            showcount();
            }
        });

        function showcount() {
            
            btn.innerHTML = `<div class="cart-count">
            <button class="decrement">-</button>
            <span class="count">${count}</span>
            <button class="increment">+</button>
            </div>`;

            const decrementBtn = btn.querySelector('.decrement');
            const incrementBtn = btn.querySelector('.increment');
            const countSpan = btn.querySelector('.count');

            incrementBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                count++;
                countSpan.textContent = count;
            });

            decrementBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (count > 0) {
                    count--;
                    countSpan.textContent = count;
                    if (count === 0) {
                        btn.innerHTML = 'Add to Cart';
                    }
                }
            });

        }
      productGrid.appendChild(card);
    });
  })
  .catch(err => console.error(err));






