
document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const filterButtons = document.querySelectorAll('.filter-btn');

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      // Limit title to 2 words
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
              <button class="add-cart-btn">Add to Cart</button>
            </div>
          `;
          productList.appendChild(productCard);
        });
      };

      // Initial render
      renderProducts(products);

      // Filtering
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
