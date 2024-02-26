// Function to update both free shipping bar
function updateFreeShippingComponents(cartTotal) {
    const freeShippingThreshold = 7000;
    const remainingAmount = (freeShippingThreshold - cartTotal) / 100;
    const freeShippingBar = document.querySelector('.free-shipping-bar');
    const freeShippingBarProgress = document.querySelector('.free-shipping-bar__progress');
    /* // Tying to make an effect to distract from the jump of the progress bar but i'm not sure on this yet
    if (freeShippingBarProgress) {
        freeShippingBarProgress.classList.add('free-shipping-bar__progress--visible');
    } */

    let newProgress = (cartTotal / freeShippingThreshold * 100).toFixed(2); // Convert to percentage

    console.log(newProgress);
    // Check if the progress has changed to avoid unnecessary updates
    const currentProgress = freeShippingBarProgress.style.getPropertyValue("--progress");
    if (currentProgress !== newProgress) {
        freeShippingBarProgress.style.setProperty("--progress", `${newProgress}%`);
    }
}

// Function to fetch cart data and update UI
async function fetchCartAndUpdate() {
    try {
        const response = await fetch('/cart.json');
        const cart = await response.json();
        updateFreeShippingComponents(cart.total_price);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

// Set up event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetchCartAndUpdate();

    // Subscribe to cart update event
    subscribe(PUB_SUB_EVENTS.cartUpdate, () => {
        fetchCartAndUpdate();
    });
});
