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
    const response = await fetch('http://localhost:3000/api/citas/select-data');
    const result = await response.json();
    
    if (!response.ok) throw new Error(result.message || 'Error cargando datos');

    // Llenar select de mascotas
    const mascotasSelect = document.getElementById('cita-mascota');
    mascotasSelect.innerHTML = '<option value="">Seleccione mascota...</option>';
    result.data.mascotas.forEach(mascota => {
      const option = document.createElement('option');
      option.value = mascota.id;
      option.textContent = mascota.nombre;
      mascotasSelect.appendChild(option);
    });

    // Llenar select de veterinarios
    const veterinariosSelect = document.getElementById('cita-veterinario');
    veterinariosSelect.innerHTML = '<option value="">Seleccione veterinario...</option>';
    result.data.veterinarios.forEach(veterinario => {
      const option = document.createElement('option');
      option.value = veterinario.id;
      option.textContent = veterinario.nombre;
      veterinariosSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando datos:', error);
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