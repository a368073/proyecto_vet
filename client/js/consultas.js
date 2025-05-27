document.addEventListener('DOMContentLoaded', async () => {
  // Cargar datos iniciales
  await cargarSelectData();
  await cargarCitas();
  await cargarMascotasEnSelect();
  await cargarConsultas();

  // Formulario de Cita
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citaData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error al agendar cita');

      alert(`Cita agendada con ID: ${result.id}`);
      document.getElementById('form-cita').reset();
      await cargarCitas();
    } catch (error) {
      console.error('Error en frontend (cita):', error);
      alert(`Error: ${error.message}`);
    }
  });

  // Formulario de Consulta
  document.getElementById('form-consulta').addEventListener('submit', async (e) => {
    e.preventDefault();

    const consultaData = {
      id_mascota: document.getElementById('consulta-mascota').value,
      diagnostico: document.getElementById('consulta-diagnostico').value,
      observaciones: document.getElementById('consulta-observaciones').value
    };

    try {
      const response = await fetch('http://localhost:3000/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error al registrar consulta');

      alert(`Consulta registrada con ID: ${result.id}`);
      document.getElementById('form-consulta').reset();
      await cargarConsultas();
    } catch (error) {
      console.error('Error en frontend (consulta):', error);
      alert(`Error: ${error.message}`);
    }
  });
});

// Funciones auxiliares
async function cargarSelectData() {
  try {
    const response = await fetch('http://localhost:3000/api/citas/select-data');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error cargando datos');

    const mascotasSelect = document.getElementById('cita-mascota');
    mascotasSelect.innerHTML = '<option value="">Seleccione mascota...</option>';
    result.data.mascotas.forEach(mascota => {
      const option = document.createElement('option');
      option.value = mascota.id;
      option.textContent = mascota.nombre;
      mascotasSelect.appendChild(option);
    });

    const veterinariosSelect = document.getElementById('cita-veterinario');
    veterinariosSelect.innerHTML = '<option value="">Seleccione veterinario...</option>';
    result.data.veterinarios.forEach(veterinario => {
      const option = document.createElement('option');
      option.value = veterinario.id;
      option.textContent = veterinario.nombre;
      veterinariosSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando datos de select:', error);
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

async function cargarMascotasEnSelect() {
  try {
    const response = await fetch('http://localhost:3000/api/consultas/mascotas');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error cargando mascotas');

    const select = document.getElementById('consulta-mascota');
    select.innerHTML = '<option value="">Seleccione mascota...</option>';
    result.data.forEach(mascota => {
      const option = document.createElement('option');
      option.value = mascota.id;
      option.textContent = mascota.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando mascotas:', error);
  }
}

async function cargarConsultas() {
  try {
    const response = await fetch('http://localhost:3000/api/consultas');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error cargando consultas');

    const tbody = document.querySelector('#tabla-consultas tbody');
    tbody.innerHTML = '';
    result.data.forEach(consulta => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${consulta.id}</td>
        <td>${consulta.mascota}</td>
        <td>${consulta.fecha}</td>
        <td>${consulta.diagnostico}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error cargando consultas:', error);
  }
}
