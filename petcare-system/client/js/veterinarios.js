// Función para cargar veterinarios en la tabla
async function cargarVeterinarios() {
  try {
    const response = await fetch('http://localhost:3000/api/veterinarios');
    
    if (!response.ok) {
      throw new Error('Error al cargar veterinarios');
    }

    const veterinarios = await response.json();
    const tbody = document.querySelector('#tabla-veterinarios tbody');
    tbody.innerHTML = '';

    veterinarios.forEach(vet => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${vet.ID_VETERINARIO || vet.id_veterinario}</td>
        <td>${vet.NOMBRE || vet.nombre}</td>
        <td>${vet.ESPECIALIDAD || vet.especialidad}</td>
        <td>
          <button class="btn-editar" data-id="${vet.ID_VETERINARIO || vet.id_veterinario}">✏️</button>
          <button class="btn-eliminar" data-id="${vet.ID_VETERINARIO || vet.id_veterinario}">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Agregar eventos a los botones (opcional)
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', eliminarVeterinario);
    });

  } catch (error) {
    console.error('Error:', error);
    alert(`Error al cargar veterinarios: ${error.message}`);
  }
}

// Registrar nuevo veterinario
document.getElementById('form-veterinario').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const vetData = {
    nombre: document.getElementById('veterinario-nombre').value,
    especialidad: document.getElementById('veterinario-especialidad').value
  };

  try {
    const response = await fetch('http://localhost:3000/api/veterinarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // ¡IMPORTANTE!
      },
      body: JSON.stringify(vetData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar veterinario');
    }

    const result = await response.json();
    alert(`✅ Veterinario registrado con ID: ${result.id}`);
    document.getElementById('form-veterinario').reset();
    await cargarVeterinarios(); // Actualizar la tabla

  } catch (error) {
    console.error('Error en frontend:', error);
    alert(`❌ Error: ${error.message}`);
  }
});

// Función para eliminar veterinario (opcional)
async function eliminarVeterinario(event) {
  const id = event.target.getAttribute('data-id');
  
  if (!confirm('¿Eliminar este veterinario?')) return;

  try {
    const response = await fetch(`http://localhost:3000/api/veterinarios/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar');
    }

    alert('Veterinario eliminado');
    await cargarVeterinarios(); // Refrescar tabla
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarVeterinarios);