// Function to fetch and render the upsell section
function fetchUpsellSectionHTML(productID) {
  const productRecommendationsSection = document.querySelector('.drawer__recommendations-grid');
  // Clear existing content
  productRecommendationsSection.innerHTML = '';
  // fetch the new recommendations
  fetch(`${window.Shopify.routes.root}recommendations/products?product_id=${productID}&limit=4&section_id=drawer-cart-rec-products&intent=related`)
  .then(response => response.text())
  .then((text) => {
      console.log(text);
      const html = document.createElement('div');
      html.innerHTML = text;
      // Find the product recommendations section in the response HTML to use to insert in the page
      const recommendations = html.querySelector('.drawer__recommendations-grid');

      if (recommendations && recommendations.innerHTML.trim().length) {
        productRecommendationsSection.innerHTML = recommendations.innerHTML;
        console.log('Recommendations section updated');
      } else {
        console.log('No recommendations found for this product.');
      }
  });
}




// Function to fetch the cart data
function fetchCartData() {
return fetch(`${window.Shopify.routes.root}cart.json`)
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    });
}

// Function to get the product_id of the first item in the cart
function getFirstProductIdInCart() {
fetchCartData()
    .then(cart => {
    // Assuming the first item in the `items` array is the last added item
    const firstItem = cart.items[0];
    if (firstItem) {
        const productID = firstItem.product_id;
        // Here you can now call the recommendations API with this product ID
        fetchUpsellSectionHTML(productID);
    } else {
        console.log('No items in the cart.');
        // Do nothing as there are no items in cart so we don't want to init the reccomendations
    }
    })
    .catch(error => {
    console.error('Error fetching cart data:', error);
    });
}

// Handle the cart update or drawer open events to kick off the recommendations request
function initCartRecommendations() {
  getFirstProductIdInCart();
}
  
const debouncedInitCartRecommendations = debounce(initCartRecommendations, 10);

// Subscribe to the cartUpdate event using the Dawn theme's pub/sub system
subscribe(PUB_SUB_EVENTS.cartUpdate, () => {
  debouncedInitCartRecommendations();
});

// Subscribe to the cartUpdate event using the Dawn theme's pub/sub system
/* Testing ideas to pull the product id from the events data 
subscribe(PUB_SUB_EVENTS.cartUpdate, (eventData) => {
  console.log(eventData);
  console.log("product ID:" + eventData.cartData.product_id);
}); */

// Listen for when the cart drawer is opened
document.addEventListener('cartDrawerOpened', function() {
  // Call the debounced function to fetch and display recommendations
  debouncedInitCartRecommendations();
  // console.log('Cart drawer opened');
});

  
/* 
// Function to fetch and render the upsell section
function fetchUpsellSectionHTML(productID) {
  const productRecommendationsSection = document.querySelector('.drawer__recommendations-grid');

  // fetch the new recommendations
  fetch(`${window.Shopify.routes.root}recommendations/products?product_id=${productID}&limit=4&section_id=drawer-cart-recc&intent=related`)
    .then(response => response.text())
    .then((text) => {
      console.log(text);
      // Clear existing content
      productRecommendationsSection.innerHTML = '';
      // Directly set the innerHTML of the container to the fetched text
      productRecommendationsSection.innerHTML = text;

      if (productRecommendationsSection.innerHTML.trim().length) {
        console.log('Recommendations section updated');
      } else {
        console.log('No recommendations found for this product.');
      }
    })
    .catch((e) => console.error('Error fetching product recommendations:', e));
}


Shopify's reccomened way to return the recommendations then look for the same class in the html to only insert that. But in this case i want to insert the whole section
// Function to fetch and render the upsell section
function fetchUpsellSectionHTML(productID) {
  const productRecommendationsSection = document.querySelector('.product-recommendations');
  // Clear existing content
  productRecommendationsSection.innerHTML = '';
  // fetch the new recommendations
  fetch(`${window.Shopify.routes.root}recommendations/products?product_id=${productID}&limit=4&section_id=drawer-cart-recc&intent=related`)
  .then(response => response.text())
  .then((text) => {
      console.log(text);
      const html = document.createElement('div');
      html.innerHTML = text;
      // Find the product recommendations section in the response HTML to use to insert in the page
      const recommendations = html.querySelector('.product-recommendations');

      if (recommendations && recommendations.innerHTML.trim().length) {
        productRecommendationsSection.innerHTML = recommendations.innerHTML;
        console.log('Recommendations section updated');
      } else {
        console.log('No recommendations found for this product.');
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch and render the upsell section
  function fetchUpsellSection() {
    fetch(window.Shopify.routes.root + "recommendations/products?product_id=7614848860381&limit=4&section_id=drawer-cart-recc&intent=related")
      .then(response => response.text())
      .then((text) => {
        // Assuming you have a container with the ID 'upsell-section' in your cart page where you want to load the upsell items
        const upsellSectionContainer = document.getElementById('drawer__recommendations-grid');
        if (upsellSectionContainer) {
          upsellSectionContainer.innerHTML = text;
        }
      })
      .catch((e) => console.error('Error fetching upsell section:', e));
  }

  // Call this function whenever you want to refresh the upsell section,
  // for example after a cart update event
  fetchUpsellSection();
});

// You will need to implement the addToCart function to work with your cart system
function addToCart(variantId) {
// Add the item to the cart using Shopify's AJAX API or update the cart form
console.log('Adding item to cart with variant ID:', variantId);
// Implementation goes here
}

// This function could be responsible for making an API call to Shopify's recommendations endpoint
function fetchAndDisplayRecommendations(productId) {
fetch(`${window.Shopify.routes.root}recommendations/products.json?product_id=${productId}&limit=4&intent=related`)
    .then(response => response.json())
    // .then(data => {console.log(data);})
    .then(({ products }) => {
    // Now you have your recommendations data
    // You should create a function to update your cart UI with this data
    if (products.length > 0) {
        // updateCartWithRecommendations(products);
        console.log('Recommendations:', products);
    } else {
        console.log('No recommendations found for this product.');
    }
    })
    .catch(error => {
    console.error('Fetching recommendations failed:', error);
    });
}

// Function to update the cart UI with the recommendations
function updateCartWithRecommendations(recommendedProducts) {
// Assuming you have a div with the ID 'recommendations' where you want to display the products
const recommendationsContainer = document.getElementById('recommendations');
recommendationsContainer.innerHTML = ''; // Clear previous recommendations

recommendedProducts.forEach((product) => {
    // Create HTML elements for each recommended product
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.src = product.featured_image;
    productImage.alt = product.title;
    productImage.className = 'product-card__image';

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productTitle.className = 'product-card__title';

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${(product.price / 100).toFixed(2)}`;
    productPrice.className = 'product-card__price';

    // Add a button to allow users to add the recommended product to the cart
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.className = 'product-card__add-to-cart';
    addToCartButton.onclick = () => {
    // You will need to implement this function to actually add the item to the cart
    addToCart(product.variants[0].id);
    };

    // Append elements to the product card
    productCard.appendChild(productImage);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartButton);

    // Append the product card to the recommendations container
    recommendationsContainer.appendChild(productCard);
});
}

// This function could be responsible for making an API call to Shopify's recommendations endpoint
function fetchAndDisplayRecommendations(productVariantId) {
    // Call the recommendations API using the product variant ID
    fetch(`/recommendations/products.json?product_id=${productVariantId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Now you have your recommendations data
        // You should create a function to update your cart UI with this data
        updateCartWithRecommendations(data.products);
      })
      .catch(error => {
        console.error('Fetching recommendations failed: ', error);
      });
  }
  
  // This function would take the products data from the API and update the DOM accordingly
  function updateCartWithRecommendations(recommendedProducts) {
    const recommendationsContainer = document.getElementByClass('cart_recommendations--wrapper'); // Replace with your actual container ID or class
    // Clear existing recommendations
    recommendationsContainer.innerHTML = '';
  
    recommendedProducts.forEach(product => {
      // Create HTML elements for each recommended product
      // This is a simplistic example, you'll need to format it to match your site's HTML/CSS structure
      const productElement = document.createElement('div');
      productElement.className = 'recommended-product';
      productElement.innerHTML = `
        <img src="${product.image.src}" alt="${product.title}">
        <p>${product.title}</p>
        <p>$${(product.price / 100).toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      recommendationsContainer.appendChild(productElement);
    });
  }
  
  // Handle the cart update event by fetching recommendations
  function handleCartUpdate(event) {
    const lastAddedVariantId = event.cartData.variant_id; // Make sure you are getting the right ID for the API call
    console.log('Last added variant ID: ', lastAddedVariantId); // Debugging
    console.log(event); // Debugging
    // fetchAndDisplayRecommendations(lastAddedVariantId);
  }
  
  // Subscribe to the cart update event
  subscribe(PUB_SUB_EVENTS.cartUpdate, handleCartUpdate);
  */