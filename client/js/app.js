// Modo Oscuro (Persistente con localStorage)
const darkModeToggle = document.getElementById('darkModeToggle');

// Cargar preferencia guardada
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

// Escuchar cambios en el toggle
darkModeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});