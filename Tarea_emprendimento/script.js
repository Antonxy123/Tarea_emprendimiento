    // ⚠️ CAMBIA este número por tu WhatsApp real (código de país + número, sin +, sin espacios)
    const NUMERO_WHATSAPP = "51926383610";

    let carrito = [];

    function agregarAlCarrito(nombre, precio) {
        const itemExistente = carrito.find(item => item.nombre === nombre);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
        abrirCarrito();
    }

    function cambiarCantidad(nombre, delta) {
        const item = carrito.find(i => i.nombre === nombre);
        if (!item) return;
        item.cantidad += delta;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.nombre !== nombre);
        }
        actualizarCarrito();
    }

    function eliminarDelCarrito(nombre) {
        carrito = carrito.filter(i => i.nombre !== nombre);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const contador = document.getElementById('carrito-contador');
        const itemsContainer = document.getElementById('carrito-items');
        const vacioMsg = document.getElementById('carrito-vacio');
        const totalEl = document.getElementById('carrito-total');
        const btnFinalizar = document.getElementById('btn-finalizar');

        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;

        if (carrito.length === 0) {
            itemsContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío 🦆</p>';
            btnFinalizar.disabled = true;
        } else {
            itemsContainer.innerHTML = carrito.map(item => `
                <div class="carrito-item">
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                        <span class="carrito-item-precio">S/ ${item.precio.toFixed(2)} c/u</span>
                    </div>
                    <div class="carrito-item-controles">
                        <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', -1)">−</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                        <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">🗑️</button>
                    </div>
                </div>
            `).join('');
            btnFinalizar.disabled = false;
        }

        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalEl.textContent = `S/ ${total.toFixed(2)}`;
    }

    function abrirCarrito() {
        document.getElementById('carrito-overlay').classList.add('activo');
    }

    function cerrarCarrito() {
        document.getElementById('carrito-overlay').classList.remove('activo');
    }

    function cerrarCarritoFuera(event) {
        if (event.target.id === 'carrito-overlay') {
            cerrarCarrito();
        }
    }

    function finalizarCompra() {
        if (carrito.length === 0) return;

        let mensaje = "¡Hola! 🦆 Quiero hacer este pedido en La Tiendita de Pipe:\n\n";
        carrito.forEach(item => {
            mensaje += `• ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
        });
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        mensaje += `\n*Total: S/ ${total.toFixed(2)}*`;

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }