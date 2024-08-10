let cartItemCount = 0; // Initialize a cart item count

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
    const sizeMessage = document.getElementById('size-message');
    sizeMessage.style.display = 'none'; // Hide size message when closing
}

// Function to open the popup
function openPopup(imageSrc, name, price) {
    document.getElementById("popup-image").src = imageSrc;
    document.getElementById("popup-name").innerText = name;
    document.getElementById("popup-price").innerText = price;
    document.getElementById("popup").style.display = "flex";
    
    // Reset size selection when opening a new product
    resetSizeSelection();
}

// Function to handle key press events
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closePopup(); // Close the popup if "ESC" is pressed
    }
});

// Function to reset size selection
function resetSizeSelection() {
    const sizeOptions = document.querySelectorAll(".size-option");
    sizeOptions.forEach(option => {
        option.style.backgroundColor = ""; // Clear background color
        option.classList.remove("selected"); // Remove selected class if you want to use it for styles
    });
}

// Function to select size
function selectSize(selected) {
    // Deselect other sizes
    resetSizeSelection();
    
    // Mark the selected size
    selected.style.backgroundColor = "gray"; // Change to gray for selected
    selected.classList.add("selected");
}

// Function to add the product to the cart
function addToCart() {
    const selectedSize = document.querySelector(".size-option.selected");
    const sizeMessage = document.getElementById('size-message');
    
    if (!selectedSize) {
        sizeMessage.style.display = 'block'; // Show the message
        return; // Exit the function if no size is selected
    }

    // Get product details
    const productName = document.getElementById("popup-name").innerText;
    const productImage = document.getElementById("popup-image").src;
	const productPrice = document.getElementById("popup-price").innerText;

	const product = {
        name: productName,
        size: selectedSize.innerText,
        image: productImage,
        price: productPrice
    };

	let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));



    // Add product to cart (this is just a placeholder; you'll implement cart logic later)
    console.log(`Added to cart: ${productName}, Size: ${selectedSize.innerText}, Image: ${productImage}`);

    // Increment cart item count
    cartItemCount++;
    
    // Update cart count display
    document.getElementById("cart-count").innerText = cartItemCount;
    document.getElementById("cart-count").style.visibility = 'visible'; // Show the count

    // Close the popup after adding to cart
    closePopup();
}

// Function to enable size selection
document.querySelectorAll(".size-option").forEach(option => {
    option.addEventListener("click", function() {
        selectSize(this);
    });
});

// Optional: Prevent default scroll behavior for the popup if needed
document.getElementById("popup").addEventListener("wheel", function(event) {
    event.preventDefault();
});

// Function to filter products
function filterProducts() {
    const filterValue = document.getElementById("product-filter").value;
    const products = document.querySelectorAll(".product");
    
    products.forEach(product => {
        const tag = product.getAttribute("data-tag");
        
        if (filterValue === "all" || tag === filterValue) {
            product.style.display = "block"; // Show the product
        } else {
            product.style.display = "none"; // Hide the product
        }
    });
}

// Display message for size selection
document.getElementById('add-to-cart').onclick = function() {
    const selectedSize = document.querySelector('.size-option.selected');
    const sizeMessage = document.getElementById('size-message');
    
    if (!selectedSize) {
        sizeMessage.style.display = 'block'; // Show the message
    } else {
        sizeMessage.style.display = 'none'; // Hide the message
        addToCart(); // Call addToCart function if size is selected
    }
};

// Hide size message after 5 seconds
function hideSizeMessage() {
    const sizeMessage = document.getElementById('size-message');
    setTimeout(() => {
        sizeMessage.style.display = 'none';
    }, 5000);
}

// Call hideSizeMessage when closing the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
    hideSizeMessage(); // Call the function to hide the message
}

// Add event listener to the cart icon
document.getElementById("cart-icon").addEventListener("click", function() {
    window.location.href = "cart.html"; // Redirect to cart.html
});
