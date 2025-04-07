document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Change header style on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Product data - This would normally come from a backend/database
    const products = [
        {
            id: 1,
            title: "Urban Classic Hoodie",
            price: 4999, // Price in KES
            oldPrice: 6999,
            discount: 29,
            image: "images/hoodie/all/h2.png",
            category: "men",
            rating: 4,
            description: "Classic urban style hoodie with premium cotton blend for ultimate comfort."
        },
        {
            id: 2,
            title: "Pastel Dream Hoodie",
            price: 5499,
            oldPrice: 6499,
            discount: 15,
            image: "images/hoodie/all/h3.png",
            category: "women",
            rating: 5,
            description: "Soft pastel hoodie with oversized fit for a cozy and stylish look."
        },
        {
            id: 3,
            title: "Graphic Print Hoodie",
            price: 5999,
            image: "images/hoodie/all/h4.png",
            category: "unisex",
            rating: 4,
            description: "Bold graphic print hoodie that makes a statement wherever you go."
        },
        {
            id: 4,
            title: "Athletic Fit Hoodie",
            price: 4499,
            oldPrice: 5999,
            discount: 25,
            image: "images/hoodie/all/h5.png",
            category: "men",
            rating: 4.5,
            description: "Performance hoodie designed for both workouts and casual wear."
        },
        {
            id: 5,
            title: "Oversized Comfort Hoodie",
            price: 5299,
            image: "images/hoodie/all/h6.png",
            category: "women",
            rating: 5,
            description: "Ultra-comfy oversized hoodie perfect for lounging or layering."
        },
        {
            id: 6,
            title: "Vintage Wash Hoodie",
            price: 4799,
            oldPrice: 5999,
            discount: 20,
            image: "images/hoodie/all/h7.png",
            category: "unisex",
            rating: 4,
            description: "Vintage-inspired hoodie with distressed details for a retro vibe."
        },
        {
            id: 7,
            title: "Fleece-Lined Hoodie",
            price: 6499,
            image: "images/hoodie/all/h8.png",
            category: "men",
            rating: 4.5,
            description: "Extra warm fleece-lined hoodie for chilly days and nights."
        },
        {
            id: 8,
            title: "Cropped Hoodie",
            price: 4999,
            oldPrice: 6499,
            discount: 23,
            image: "images/hoodie/all/h9.png",
            category: "women",
            rating: 4,
            description: "Trendy cropped hoodie that pairs perfectly with high-waisted bottoms."
        }
    ];
    
    // Display products
    const productsContainer = document.getElementById('products-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let visibleProducts = 8; // Initial number of visible products
    let allProducts = [...products]; // Copy of all products
    
    // Helper function to format KES prices
    function formatKESPrice(price) {
        return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price);
    }
    
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        productsToDisplay.slice(0, visibleProducts).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            
            let discountBadge = '';
            if (product.discount) {
                discountBadge = `<div class="product-badge">${product.discount}% OFF</div>`;
            }
            
            let oldPrice = '';
            if (product.oldPrice) {
                oldPrice = `<span class="old-price">${formatKESPrice(product.oldPrice)}</span>`;
            }
            
            let ratingStars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    ratingStars += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                    ratingStars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    ratingStars += '<i class="far fa-star"></i>';
                }
            }
            
            productCard.innerHTML = `
                ${discountBadge}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-actions">
                        <button class="action-btn quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn add-to-wishlist" data-id="${product.id}"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">${formatKESPrice(product.price)}</span>
                        ${oldPrice}
                    </div>
                    <div class="product-rating">
                        ${ratingStars}
                        <span>(${Math.floor(Math.random() * 50) + 10})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Show/hide load more button
        if (visibleProducts >= productsToDisplay.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Initialize product buttons
        initProductButtons();
    }
    
    // Filter products
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                allProducts = [...products];
            } else if (filter === 'sale') {
                allProducts = products.filter(product => product.discount);
            } else {
                allProducts = products.filter(product => product.category === filter);
            }
            
            visibleProducts = 8; // Reset visible products when filtering
            displayProducts(allProducts);
        });
    });
    
    // Load more products
    loadMoreBtn.addEventListener('click', function() {
        visibleProducts += 4;
        displayProducts(allProducts);
    });
    
    // Initialize product buttons (add to cart and wishlist)
    function initProductButtons() {
        // Add to cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
                
                // Add animation to button
                this.innerHTML = '<i class="fas fa-check"></i> Added';
                this.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
        
        // Add to wishlist buttons
        const addToWishlistBtns = document.querySelectorAll('.add-to-wishlist');
        
        addToWishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToWishlist(product, this);
            });
        });
        
        // Quick view buttons
        const quickViewBtns = document.querySelectorAll('.quick-view');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                showQuickView(product);
            });
        });
    }
    
    // Cart functionality
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const continueShopping = document.querySelector('.continue-shopping');
    let cart = [];
    
    // Open/close cart
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    continueShopping.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Add to cart function
    function addToCart(product, quantity = 1) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCart();
        showNotification(`${product.title} added to cart`);
    }
    
    // Update cart display
    function updateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalPrice = document.querySelector('.total-price');
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = '';
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">${formatKESPrice(item.price * item.quantity)}</div>
                        <div class="cart-item-quantity">
                            <button class="decrement">-</button>
                            <span>${item.quantity}</span>
                            <button class="increment">+</button>
                        </div>
                    </div>
                    <div class="remove-item" data-id="${item.id}">&times;</div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
                
                // Add event listeners to quantity buttons
                const decrementBtn = cartItem.querySelector('.decrement');
                const incrementBtn = cartItem.querySelector('.increment');
                const quantitySpan = cartItem.querySelector('.cart-item-quantity span');
                const removeBtn = cartItem.querySelector('.remove-item');
                
                decrementBtn.addEventListener('click', function() {
                    if (item.quantity > 1) {
                        item.quantity--;
                        quantitySpan.textContent = item.quantity;
                        cartItem.querySelector('.cart-item-price').textContent = formatKESPrice(item.price * item.quantity);
                        updateCartTotal();
                    }
                });
                
                incrementBtn.addEventListener('click', function() {
                    item.quantity++;
                    quantitySpan.textContent = item.quantity;
                    cartItem.querySelector('.cart-item-price').textContent = formatKESPrice(item.price * item.quantity);
                    updateCartTotal();
                });
                
                removeBtn.addEventListener('click', function() {
                    cart = cart.filter(cartItem => cartItem.id !== item.id);
                    updateCart();
                    showNotification(`${item.title} removed from cart`);
                });
            });
        }
        
        // Update total price
        updateCartTotal();
    }
    
    // Update cart total
    function updateCartTotal() {
        const totalPrice = document.querySelector('.total-price');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPrice.textContent = formatKESPrice(total);
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
        } else {
            showNotification('Proceeding to checkout...');
            // In a real app, this would redirect to checkout page
            setTimeout(() => {
                cart = [];
                updateCart();
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 1500);
        }
    });
    
    // Wishlist functionality
    const wishlistSidebar = document.querySelector('.wishlist-sidebar');
    const wishlistIcon = document.querySelector('.wishlist-icon');
    const closeWishlist = document.querySelector('.close-wishlist');
    let wishlist = [];
    
    // Open/close wishlist
    wishlistIcon.addEventListener('click', function(e) {
        e.preventDefault();
        wishlistSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeWishlist.addEventListener('click', function() {
        wishlistSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Add to wishlist function
    function addToWishlist(product, button) {
        const existingItem = wishlist.find(item => item.id === product.id);
        
        if (existingItem) {
            wishlist = wishlist.filter(item => item.id !== product.id);
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.style.color = '';
            showNotification(`${product.title} removed from wishlist`);
        } else {
            wishlist.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            });
            button.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
            showNotification(`${product.title} added to wishlist`);
        }
        
        updateWishlist();
    }
    
    // Update wishlist display
    function updateWishlist() {
        const wishlistItemsContainer = document.querySelector('.wishlist-items');
        const wishlistCount = document.querySelector('.wishlist-count');
        
        // Update wishlist count
        wishlistCount.textContent = wishlist.length;
        
        // Update wishlist items
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = `
                <div class="empty-wishlist">
                    <i class="far fa-heart"></i>
                    <p>Your wishlist is empty</p>
                </div>
            `;
        } else {
            wishlistItemsContainer.innerHTML = '';
            
            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <div class="wishlist-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="wishlist-item-details">
                        <h4 class="wishlist-item-title">${item.title}</h4>
                        <div class="wishlist-item-price">${formatKESPrice(item.price)}</div>
                    </div>
                    <div class="remove-item" data-id="${item.id}">&times;</div>
                `;
                
                wishlistItemsContainer.appendChild(wishlistItem);
                
                // Add event listener to remove button
                const removeBtn = wishlistItem.querySelector('.remove-item');
                removeBtn.addEventListener('click', function() {
                    wishlist = wishlist.filter(wishlistItem => wishlistItem.id !== item.id);
                    updateWishlist();
                    showNotification(`${item.title} removed from wishlist`);
                    
                    // Also update the heart icon in the product card
                    const productBtn = document.querySelector(`.add-to-wishlist[data-id="${item.id}"]`);
                    if (productBtn) {
                        productBtn.innerHTML = '<i class="far fa-heart"></i>';
                    }
                });
            });
        }
    }
    
    // View cart button in wishlist
    const viewCartBtn = document.querySelector('.view-cart-btn');
    viewCartBtn.addEventListener('click', function() {
        wishlistSidebar.classList.remove('active');
        cartSidebar.classList.add('active');
    });
    
    // Quick view modal
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function showQuickView(product) {
        document.getElementById('modal-product-title').textContent = product.title;
        document.getElementById('modal-product-price').textContent = formatKESPrice(product.price);
        document.getElementById('modal-product-description').textContent = product.description;
        
        if (product.oldPrice) {
            document.getElementById('modal-product-old-price').textContent = formatKESPrice(product.oldPrice);
            document.getElementById('modal-product-old-price').style.display = 'inline';
            document.getElementById('modal-product-discount').textContent = `${product.discount}% OFF`;
            document.getElementById('modal-product-discount').style.display = 'inline';
        } else {
            document.getElementById('modal-product-old-price').style.display = 'none';
            document.getElementById('modal-product-discount').style.display = 'none';
        }
        
        document.getElementById('modal-main-image').src = product.image;
        
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === cartSidebar) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === wishlistSidebar) {
            wishlistSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize the page
    displayProducts(products);
});
