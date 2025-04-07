// JavaScript for cart and wishlist functionality
const cartBtn = document.querySelector('#cart-btn');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const cartCount = document.querySelector('.cart-count');
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('.navbar');
const wishlist = new Set();

let cartItems = [];

// Toggle cart visibility
cartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('active');
});

// Mobile nav toggle
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Add to wishlist
wishlistButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    button.classList.toggle('wishlisted');

    if (wishlist.has(productId)) {
      wishlist.delete(productId);
    } else {
      wishlist.add(productId);
    }
  });
});

// Add to cart
function addToCart(id, name, price, image) {
  const existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, name, price, image, quantity: 1 });
  }

  updateCartUI();
}

// Update cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>KES ${item.price.toLocaleString()}</p>
        <div class="item-controls">
          <button onclick="changeQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalPrice.textContent = `KES ${total.toLocaleString()}`;
  cartCount.textContent = count;
}

// Change quantity
function changeQuantity(id, delta) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cartItems = cartItems.filter(i => i.id !== id);
  }

  updateCartUI();
}

// Attach event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    addToCart(id, name, price, image);
  });
});
