// Cargar los datos del catálogo
fetch('./datos/productos.json')
  .then(response => response.json())
  .then(productos => {
    const catalogo = document.getElementById('catalogo');
    productos.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('producto');
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p><strong>Precio: $${producto.precio.toFixed(2)}</strong></p>
      `;
      catalogo.appendChild(div);
    });
  })
  .catch(error => console.error('Error al cargar el catálogo:', error));
