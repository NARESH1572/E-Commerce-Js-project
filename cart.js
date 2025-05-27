document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Load cart from localStorage or initialize with sample data
  let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      id: 1,
      title: 'Apple iPhone 13 Pro',
      price: 999.00,
      quantity: 1,
      image: 'https://m.media-amazon.com/images/I/61jLiCovxVL._SL1500_.jpg'
    },
    {
      id: 2,
      title: 'Sony WH-1000XM4 Headphones',
      price: 349.99,
      quantity: 1,
      image: 'https://m.media-amazon.com/images/I/61vD07w1XkL._SL1500_.jpg'
    }
  ];

  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    const cartTitle = document.createElement('h2');
    cartTitle.innerHTML = `My Cart (<span id="cart-count">${cart.length}</span>)`;
    cartItemsContainer.appendChild(cartTitle);

    if (cart.length === 0) {
      const emptyCart = document.createElement('div');
      emptyCart.className = 'empty-cart';
      emptyCart.innerHTML = `
        <p>Your cart is empty</p>
        <p>Add items to your cart to see them here</p>
      `;
      cartItemsContainer.appendChild(emptyCart);
      return;
    }

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h3>${item.title}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <div class="quantity-control">
            <button class="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}">REMOVE</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });
  }

  function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = subtotal.toFixed(2);
    shippingEl.textContent = shipping.toFixed(2);
    taxEl.textContent = tax.toFixed(2);
    totalEl.textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.length;
  }

  cartItemsContainer.addEventListener('click', (e) => {
    if (!e.target.hasAttribute('data-id')) return;
    
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);

    if (e.target.classList.contains('increase')) {
      item.quantity += 1;
    } else if (e.target.classList.contains('decrease')) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter(item => item.id !== id);
      }
    } else if (e.target.classList.contains('remove-btn')) {
      cart = cart.filter(item => item.id !== id);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateSummary();
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Proceeding to checkout!');
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
      updateSummary();
    }
  });

  // Initialize cart on page load
  renderCartItems();
  updateSummary();
});

 

 
