



document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Update cart counter
  const updateCartCounter = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-counter').textContent = `(${cart.length})`;
  };

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const getShortTitle = (title) => {
        const words = title.split(' ');
        return words.slice(0, 2).join(' ') + (words.length > 2 ? '...' : '');
      };

      const renderProducts = (filteredProducts) => {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${getShortTitle(product.title)}</h3>
            <p class="description">${product.description}</p>
            <hr>
            <p class="price">$${product.price}</p>
            <hr>
            <div class="card-actions">
              <button class="details-btn">Details</button>
              <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
          `;
          productList.appendChild(productCard);
        });

        document.querySelectorAll('.add-cart-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const product = products.find(p => p.id == id);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
          });
        });
      };

      renderProducts(products);
      updateCartCounter();

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          const filtered = category === 'all'
            ? products
            : products.filter(p => p.category === category);
          renderProducts(filtered);
        });
      });
    })
    .catch(err => console.error('Error loading products:', err));
});