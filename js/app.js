// Array de productos, inicializado vacío en caso de usar JSON
let products = [];

// Función para cargar productos
function loadProducts(products) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = '';  // Limpiar cualquier contenido previo
    
    // Recorrer los productos y crear dinámicamente las tarjetas
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col');
        productCard.innerHTML = `
            <div class="product-card" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}" onclick="viewProductImage('${product.image}')">
                <p class="product-title">${product.name}</p>
                <button class="btn btn-primary" onclick="addToCart({ id: ${product.id}, name: '${product.name}', price: ${product.price}, quantity: 1, image: '${product.image}' })">Añadir al carrito</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Función para ver la imagen del producto en el modal
function viewProductImage(image) {
    document.getElementById("modalImage").src = image;
    new bootstrap.Modal(document.getElementById('imageModal')).show();
}

// Función para agregar productos al carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Función para mostrar el carrito
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = '';  // Limpiar carrito antes de actualizar

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item');
        cartItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(cartItem);
    });

    // Actualizar el total
    document.getElementById("cartTotal").textContent = total.toFixed(2);
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Función para cargar los productos desde el archivo JSON
function loadProductsFromFile() {
    fetch('../data/productos.json')
        .then(response => response.json())
        .then(data => {
            loadProducts(data);  // Cargar los productos dinámicamente
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Llamar a la función para cargar los productos al cargar la página
window.onload = function() {
    displayCart();  // Mostrar el carrito si hay elementos guardados
    loadProductsFromFile();  // Cargar productos desde el archivo JSON
};

// Event listeners para vaciar el carrito
document.getElementById("clearCart").addEventListener('click', clearCart);


/* inicio de seccion*/
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const addProductSection = document.getElementById('addProductSection');
    const logoutButton = document.getElementById('logoutButton'); // Botón de cerrar sesión
    const productContainer = document.getElementById('productContainer');

    const validUsername = 'admin';
    const validPassword = '12345';

    // Verifica si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (isAuthenticated) {
        loginSection.style.display = 'none';  // Oculta la sección de login
        addProductSection.style.display = 'block';  // Muestra la sección para agregar productos
        loadProducts(); // Cargar productos cuando el usuario esté autenticado
    } else {
        loginSection.style.display = 'block';  // Muestra la sección de login
        addProductSection.style.display = 'none';  // Oculta la sección para agregar productos
    }

    // Evento de inicio de sesión
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('isAuthenticated', 'true');  // Establecer autenticación en localStorage
            loginSection.style.display = 'none';
            addProductSection.style.display = 'block';
            loadProducts();  // Cargar productos después de iniciar sesión
        } else {
            alert('Credenciales incorrectas. Intenta de nuevo.');
        }
    });

    // Función para cargar productos
    function loadProducts() {
        fetch('../data/productos.json')
            .then(response => response.json())
            .then(products => {
                productContainer.innerHTML = '';  // Limpiar cualquier contenido previo
                products.forEach(product => {
                    const productCard = document.createElement('div()');

                    productCard.classList.add('col');
                    productCard.innerHTML = `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                            <p class="product-title">${product.name}</p>
                            <p class="product-price">$${product.price}</p>
                            <button class="btn btn-primary">Añadir al carrito</button>
                        </div>
                    `;
                    productContainer.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error al cargar productos:', error));
    }

    // Manejar el cierre de sesión
    logoutButton.addEventListener('click', () => {
        console.log("Cerrando sesión...");
        localStorage.removeItem('isAuthenticated');  // Eliminar la autenticación
        loginSection.style.display = 'block';  // Mostrar la sección de login
        addProductSection.style.display = 'none';  // Ocultar la sección de productos
        productContainer.innerHTML = '';  // Limpiar los productos de la tienda
    });
});


