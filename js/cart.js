// Get cart items from session storage
let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        itemDiv.innerHTML = `
            <span class="close-item" onclick="removeItem(${index})">&times;</span>
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size}</p>
                <p>Price: ${item.price}</p>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    updateCartSummary(); // Update cart summary
}

// Function to remove item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update session storage
    displayCartItems(); // Refresh the cart display
}

// Function to update cart summary
function updateCartSummary() {
    const subtotal = cartItems.reduce((total, item) => {
        return total + parseFloat(item.price.replace('$', ''));
    }, 0);

    const tax = subtotal * 0.08938; // 8.938% tax
    const shipping = 9.99;
    const total = subtotal + tax + shipping;

    document.getElementById('item-count').innerText = cartItems.length; // Update item count
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

// Display the items when the page loads
window.onload = function() {
    displayCartItems();
};
