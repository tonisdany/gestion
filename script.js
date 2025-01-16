const inicioSesion = document.getElementById('inicio-sesion');
const registro = document.getElementById('registro');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const errorLogin = document.getElementById('error-login');
const volverLogin = document.getElementById('volver-login');
const registrarse = document.getElementById('registrarse');
const adminSection = document.getElementById('admin');
const gestoraSection = document.getElementById('gestora');

// Recuperar usuarios registrados del localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Añadir el administrador predeterminado si no existe
const adminPredeterminado = { usuario: 'admin', password: 'tonisdany861003*', role: 'admin' };
if (!usuarios.some(user => user.usuario === 'admin')) {
  usuarios.push(adminPredeterminado);
  guardarUsuarios();
}

// Función para guardar usuarios en localStorage
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Mostrar formulario de registro
registrarse.addEventListener('click', () => {
  inicioSesion.style.display = 'none';
  registro.style.display = 'block';
});

// Volver al inicio de sesión
volverLogin.addEventListener('click', () => {
  registro.style.display = 'none';
  inicioSesion.style.display = 'block';
});

// Manejar el formulario de registro
formRegistro.addEventListener('submit', (event) => {
  event.preventDefault();

  const nuevoUsuario = formRegistro['nuevo-usuario'].value;
  const nuevoPassword = formRegistro['nuevo-password'].value;
  const nuevoRol = formRegistro['nuevo-rol'].value;

  // Verificar si el usuario ya existe
  if (usuarios.some(user => user.usuario === nuevoUsuario)) {
    alert('El usuario ya está registrado.');
    return;
  }

  // Agregar nuevo usuario
  usuarios.push({ usuario: nuevoUsuario, password: nuevoPassword, role: nuevoRol });
  guardarUsuarios();

  alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');

  // Limpiar formulario y volver al inicio de sesión
  formRegistro.reset();
  registro.style.display = 'none';
  inicioSesion.style.display = 'block';
});

// Manejar el formulario de inicio de sesión
formLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const usuario = formLogin['usuario'].value;
  const password = formLogin['password'].value;

  // Buscar usuario
  const usuarioValido = usuarios.find(user => user.usuario === usuario && user.password === password);

  if (usuarioValido) {
    errorLogin.style.display = 'none';
    inicioSesion.style.display = 'none';

    // Redirigir según el rol
    if (usuarioValido.role === 'admin') {
      adminSection.style.display = 'block';
    } else if (usuarioValido.role === 'gestora') {
      gestoraSection.style.display = 'block';
    }
  } else {
    errorLogin.style.display = 'block';
  }
});

 
