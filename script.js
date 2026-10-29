// Sample product catalog
const products = [
  { id: 1, name: "Wireless Headphones", price: 49.99 },
  { id: 2, name: "Smart Watch", price: 89.99 },
  { id: 3, name: "Mechanical Keyboard", price: 65.00 },
  { id: 4, name: "Ergonomic Mouse", price: 29.99 }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Render products dynamically
function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Update Cart Display & Calculations
function updateCartUI() {
  // Update Item Count
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;

  // Render Cart Items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
    checkoutBtn.disabled = true;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join("");
    checkoutBtn.disabled = false;
  }

  // Update Total Price
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// Simple Checkout Simulation
checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your order! Total amount: " + cartTotalPrice.textContent);
  cart = [];
  updateCartUI();
});

// Initial Render
renderProducts();
