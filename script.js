const catalogo = document.getElementById('catalogo');
const formulario = document.getElementById('registro-producto');
const inicioSesion = document.getElementById('inicio-sesion');
const adminSection = document.getElementById('admin');
const gestoraSection = document.getElementById('gestora');
const errorLogin = document.getElementById('error-login');
let productos = [];

// Usuarios registrados
const usuarios = {
  admin: { password: 'admin123', role: 'admin' },
  gestora: { password: 'gestora123', role: 'gestora' },
};

// Cargar datos iniciales del JSON
fetch('./datos/productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
  })
  .catch(error => console.error('Error al cargar el catálogo:', error));

// Función para mostrar los productos
function mostrarProductos(productos) {
  catalogo.innerHTML = '';
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
}

// Manejo del inicio de sesión
const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir recarga de la página

  const usuario = formLogin.usuario.value;
  const password = formLogin.password.value;

  if (usuarios[usuario] && usuarios[usuario].password === password) {
    // Usuario válido
    errorLogin.style.display = 'none'; // Ocultar mensaje de error
    inicioSesion.style.display = 'none'; // Ocultar la pantalla de inicio de sesión

    if (usuarios[usuario].role === 'admin') {
      adminSection.style.display = 'block'; // Mostrar sección de administrador
    } else if (usuarios[usuario].role === 'gestora') {
      gestoraSection.style.display = 'block'; // Mostrar sección de gestora
    }
  } else {
    // Credenciales incorrectas
    errorLogin.style.display = 'block'; // Mostrar mensaje de error
  }
});

// Manejo del formulario para agregar productos (Administrador)
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nuevoProducto = {
    nombre: formulario.nombre.value,
    precio: parseFloat(formulario.precio.value),
    imagen: formulario.imagen.value,
    descripcion: formulario.descripcion.value,
  };

  productos.push(nuevoProducto);
  mostrarProductos(productos);
  formulario.reset();
});
