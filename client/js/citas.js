document.addEventListener('DOMContentLoaded', async () => {
  await cargarSelectData();
  await cargarCitas();
  
  document.getElementById('form-cita').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const citaData = {
      id_mascota: document.getElementById('cita-mascota').value,
      id_veterinario: document.getElementById('cita-veterinario').value,
      fecha: document.getElementById('cita-fecha').value,
      hora: document.getElementById('cita-hora').value,
      motivo: document.getElementById('cita-motivo').value
    };

    try {
      const response = await fetch('http://localhost:3000/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citaData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al agendar cita');
      }

      alert(`Cita agendada con ID: ${result.id}`);
      document.getElementById('form-cita').reset();
      await cargarCitas();
      
    } catch (error) {
      console.error('Error en frontend:', error);
      alert(`Error: ${error.message}`);
    }
  });
});

async function cargarSelectData() {
  try {
    console.log('Iniciando carga de datos para selects...'); // Debug 1
    
    const response = await fetch('http://localhost:3000/api/citas/select-data');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la respuesta del servidor');
    }

    const result = await response.json();
    console.log('Datos recibidos del API:', result); // Debug 2

    // 1. Verificar si los elementos select existen
    const mascotasSelect = document.getElementById('cita-mascota');
    const veterinariosSelect = document.getElementById('cita-veterinario');
    
    if (!mascotasSelect || !veterinariosSelect) {
      throw new Error('No se encontraron los elementos select en el DOM');
    }

    // 2. Llenar select de mascotas
    mascotasSelect.innerHTML = '<option value="">Seleccione mascota...</option>';
    
    if (result.data && result.data.mascotas && result.data.mascotas.length > 0) {
      result.data.mascotas.forEach(mascota => {
        const option = new Option(mascota.nombre, mascota.id);
        mascotasSelect.add(option);
      });
      console.log('Mascotas cargadas:', result.data.mascotas); // Debug 3
    } else {
      console.warn('No hay mascotas registradas');
    }

    // 3. Llenar select de veterinarios
    veterinariosSelect.innerHTML = '<option value="">Seleccione veterinario...</option>';
    
    if (result.data && result.data.veterinarios && result.data.veterinarios.length > 0) {
      result.data.veterinarios.forEach(vet => {
        const option = new Option(vet.nombre, vet.id);
        veterinariosSelect.add(option);
      });
      console.log('Veterinarios cargados:', result.data.veterinarios); // Debug 4
    }

  } catch (error) {
    console.error('Error en cargarSelectData:', error);
    alert(`Error al cargar datos: ${error.message}`);
  }
}

async function cargarCitas() {
  try {
    const response = await fetch('http://localhost:3000/api/citas');
    const result = await response.json();
    
    if (!response.ok) throw new Error(result.message || 'Error cargando citas');

    const tbody = document.querySelector('#tabla-citas tbody');
    tbody.innerHTML = '';
    
    result.data.forEach(cita => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cita.mascota}</td>
        <td>${cita.veterinario}</td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.motivo}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error cargando citas:', error);
  }
}

