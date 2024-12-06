
//--------------------------------------------//
// Función para añadir al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;  // Si el producto ya está, solo aumentar la cantidad
    } else {
        cart.push(product);  // Si el producto no está, añadirlo al carrito
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar carrito en localStorage
    displayCart();  // Actualizar la vista del carrito
}

// Función para obtener productos del carrito
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Función para mostrar productos en el carrito
function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = ''; // Limpiar carrito actual

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const productElement = document.createElement('li');
            productElement.classList.add('list-group-item');
            productElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;" />
                <span>${item.name}</span>
                <span> - $${item.price}</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" />
                <button onclick="removeFromCart(${index})" class="btn btn-danger btn-sm float-end">Eliminar</button>
            `;
            cartItems.appendChild(productElement);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);  // Actualizar total
    }
}

// Función para actualizar la cantidad de un producto
function updateQuantity(index, newQuantity) {
    let cart = getCart();
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar en localStorage
    displayCart();  // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);  // Eliminar producto
    localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar en localStorage
    displayCart();  // Actualizar la vista del carrito
}

// Función para vaciar el carrito
document.getElementById('clearCart').addEventListener('click', function() {
    localStorage.removeItem('cart');
    displayCart();  // Limpiar vista del carrito
});

// Cargar el carrito al recargar la página
window.onload = function() {
    displayCart();
};

