document.getElementById('form-veterinario').addEventListener('submit', async (e) => {
  e.preventDefault(); // Esto es para que la página no se recargue cuando se envie el formulario
  
  // Aqui se obtienenen los datos que se consiguen por medio del formulario
  const veterinarioData = {
    nombre: document.getElementById('veterinario-nombre').value, // Guarda el nombre del veterinario
    especialidad: document.getElementById('veterinario-especialidad').value // Guarda la especialidad del veterinario
  };

  try {
    // Se envian los datos al backend usando fetch
    const response = await fetch('http://localhost:3000/api/veterinarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(veterinarioData)
    });

    // Espera la respuesta del servidor
    const result = await response.json();

    // En caso de que la respuesta no sea exitosa, lanza un error
    if (!response.ok) {
      throw new Error(result.message || 'Error al registrar veterinario');
    }

    // Si todo sale bien, muestra un mensaje de éxito
    alert(`Veterinario registrado con ID: ${result.id}`);
    document.getElementById('form-veterinario').reset(); // Esto limpia el formulario para que se puedan seguir agregando cosas
    cargarVeterinarios(); // Esta parte es para que se actualice la tabla inferior y aparezcan los veterinarios agregados

  } catch (error) {
    // Si algo falla, lo captura y se lo muestra al usuario
    console.error('Error en frontend:', error);
    alert(`Error: ${error.message}`);
  }
});

// Función para cargar y mostrar veterinarios en la tabla
async function cargarVeterinarios() {
  try {
    const response = await fetch('http://localhost:3000/api/veterinarios');
    const veterinarios = await response.json();

    const tbody = document.querySelector('#tabla-veterinarios tbody');
    tbody.innerHTML = ''; // Limpia el conteido anterior para no tener datos iguales

    // Esta es la sección donde por cada veterinario crea una fila y la agrega a la tabla
    veterinarios.forEach(vet => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${vet.id}</td>
        <td>${vet.nombre}</td>
        <td>${vet.especialidad}</td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    // Si sucede algún problema al cargar los veterinarios, muestra el error
    console.error('Error cargando veterinarios:', error);
  }
}

// Carga la lista en cuanto se carga la página
document.addEventListener('DOMContentLoaded', cargarVeterinarios);
