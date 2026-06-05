let cart = [];
  console.log("Coffee Shop Website Loaded");
  const products = [
    {
        id: 1,
        name: "Cappuccino",
        description: "Rich espresso with steamed milk.",
        price: 150,
        category: "hot",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500"
    },

    {
        id: 2,
        name: "Latte",
        description: "Smooth coffee with creamy milk.",
        price: 180,
        category: "hot",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
    },

    {
        id: 3,
        name: "Cold Coffee",
        description: "Refreshing chilled coffee.",
        price: 200,
        category: "cold",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },

    {
        id: 4,
        name: "Brownie",
        description: "Chocolate dessert served fresh.",
        price: 120,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"
    }
];

const menuContainer =
    document.getElementById("menu-container");

function displayProducts(productList) {

    menuContainer.innerHTML = "";

    if (productList.length === 0) {

        menuContainer.innerHTML = `
            <h3>
                No products found
            </h3>
        `;

        return;
    }

    productList.forEach(product => {

        menuContainer.innerHTML += `
            <div class="card">

                <img src="${product.image}"
                     alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <span>₹${product.price}</span>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>
        `;
    });
}
function saveCart() {

    localStorage.setItem(
        "coffeeCart",
        JSON.stringify(cart)
    );

}

displayProducts(products);
loadCart();
function addToCart(id) {
showToast(
    "Added to cart!"
);
    const existingItem = cart.find(
        item => item.id === id
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        const product = products.find(
            item => item.id === id
        );

        cart.push({
            ...product,
            quantity: 1
        });
    }

   saveCart();
updateCart();
}
function updateCart() {
if(cart.length === 0){

    cartItems.innerHTML = `
        <p>
            Your cart is empty.
        </p>
    `;
}
    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const navCount =
        document.getElementById("cart-count-nav");

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        `;
    });

    cartCount.textContent = totalItems;
    navCount.textContent = totalItems;

    document.getElementById("total-price")
        .textContent = totalPrice;
}
function increaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );

    item.quantity++;
saveCart();
    updateCart();
}
function decreaseQuantity(id) {

    const item = cart.find(
        item => item.id === id
    );

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );
    }
saveCart();
    updateCart();
}
function removeItem(id) {

    cart = cart.filter(
        item => item.id !== id
    );
saveCart();
    updateCart();
}
function loadCart() {

    const storedCart =
        localStorage.getItem("coffeeCart");

    if (storedCart) {

        cart = JSON.parse(storedCart);

    }

    updateCart();
}
function clearCart() {

    cart = [];

    saveCart();

    updateCart();
}
function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }

    const filteredProducts =
        products.filter(product =>
            product.category === category
        );

    displayProducts(filteredProducts);

}
document
    .getElementById("clear-cart-btn")
    .addEventListener(
        "click",
        clearCart
    );
    const searchInput =
    document.getElementById("search-input");
    searchInput.addEventListener(
    "keyup",
    function() {

        const searchText =
            searchInput.value.toLowerCase();

        const filteredProducts =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(searchText)
            );

        displayProducts(filteredProducts);

    }
);
document
    .getElementById("checkout-btn")
    .addEventListener(
        "click",
        openCheckout
    );
    function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;
    }

    document
        .getElementById("checkout-section")
        .style.display = "block";

    generateOrderSummary();

    window.scrollTo({
        top:
            document.getElementById(
                "checkout-section"
            ).offsetTop,
        behavior: "smooth"
    });

}
function generateOrderSummary() {

    const summary =
        document.getElementById(
            "order-summary"
        );

    summary.innerHTML = "";

    cart.forEach(item => {

        summary.innerHTML += `

            <p>

                ${item.name}
                ×
                ${item.quantity}

                =
                ₹${item.price * item.quantity}

            </p>

        `;

    });

}
document
    .getElementById("checkout-form")
    .addEventListener(
        "submit",
        placeOrder
    );
    function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "customer-name"
        ).value;

    if (!name.trim()) {

        alert(
            "Please enter your name"
        );

        return;
    }

    cart = [];

    saveCart();

    updateCart();

    document
        .getElementById(
            "checkout-section"
        )
        .style.display = "none";

    document
        .getElementById(
            "success-section"
        )
        .style.display = "block";

    document
        .getElementById(
            "checkout-form"
        )
        .reset();

}
const orderId =
    Math.floor(
        Math.random() * 100000
    );
    function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";

    setTimeout(() => {

        toast.style.display = "none";

    }, 2000);

}
const hamburger =
    document.querySelector(
        ".hamburger"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );

hamburger.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "show"
        );

    }
);