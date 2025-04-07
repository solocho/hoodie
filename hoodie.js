// Dummy product data
const products = [
  {
    id: 1,
    title: "Men’s Hoodie",
    price: 29.99,
    category: "men",
    image: "images/hoodie/men/h1.png",
    description: "Premium cotton men’s hoodie, super comfy."
  },
  {
    id: 2,
    title: "Women’s Hoodie",
    price: 34.99,
    category: "women",
    image: "images/hoodie/women/h2.png",
    description: "Stylish and cozy hoodie for women."
  },
  {
    id: 3,
    title: "Kid’s Hoodie",
    price: 19.99,
    category: "kids",
    image: "images/hoodie/kids/h3.png",
    description: "Adorable and warm hoodie for kids."
  }
];

let cart = [];
let wishlist = [];

const productContainer = document.querySelector(".product-container");
const filterBtns = document.querySelectorAll(".filter-btn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const backToTopBtn = document.getElementById("backToTopBtn");
const quickViewModal = document.getElementById("quickViewModal");
const quickViewImage = document.getElementById("quickViewImage");
const quickViewTitle = document.getElementById("quickViewTitle");
const quickViewDescription = document.getElementById("quickViewDescription");
const closeQuickView = document.getElementById("closeQuickView");

const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const continueShopping = document.getElementById("continueShopping");

function displayProducts(productList) {
  productContainer.innerHTML = "";
  productList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <div class="buttons">
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        <button class="like-btn" data-id="${product.id}"><i class="far fa-heart"></i></button>
        <button class="quick-view" data-id="${product.id}">Quick View</button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const product = products.find(p => p.id === id);
      addToCart(product);
    });
  });

  document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      if (!wishlist.includes(id)) {
        wishlist.push(id);
        this.innerHTML = '<i class="fas fa-heart"></i>';
      } else {
        wishlist = wishlist.filter(pid => pid !== id);
        this.innerHTML = '<i class="far fa-heart"></i>';
      }
    });
  });

  document.querySelectorAll(".quick-view").forEach(button => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const product = products.find(p => p.id === id);
      quickViewImage.src = product.image;
      quickViewTitle.textContent = product.title;
      quickViewDescription.textContent = product.description;
      quickViewModal.style.display = "block";
    });
  });
}

displayProducts(products);

// Filter buttons
filterBtns.forEach(button => {
  button.addEventListener("click", function () {
    const filter = this.getAttribute("data-filter");
    if (filter === "all") {
      displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category === filter);
      displayProducts(filtered);
    }
  });
});

// Load More
loadMoreBtn.addEventListener("click", () => {
  alert("Load more logic not implemented — placeholder");
});

// Back to Top
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Quick View Modal
closeQuickView.addEventListener("click", () => {
  quickViewModal.style.display = "none";
});

// Cart Sidebar Logic
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  document.body.style.overflow = "hidden";
});
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  document.body.style.overflow = "auto";
});
continueShopping.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Add to Cart
function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  updateCartUI();
}

// Update Cart UI
function updateCartUI() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="item-details">
        <h4>${item.title}</h4>
        <div class="item-qty">
          <button class="qty-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
        </div>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.querySelector(".cart-total").textContent = `$${total.toFixed(2)}`;
  initCartButtons();
}

// Quantity and Remove Handlers
function initCartButtons() {
  document.querySelectorAll(".qty-btn.increase").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find(p => p.id === id);
      if (item) {
        item.quantity++;
        updateCartUI();
      }
    });
  });

  document.querySelectorAll(".qty-btn.decrease").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find(p => p.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        updateCartUI();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      cart = cart.filter(p => p.id !== id);
      updateCartUI();
    });
  });
}
