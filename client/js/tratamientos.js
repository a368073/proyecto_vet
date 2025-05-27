document.addEventListener('DOMContentLoaded', async () => {
  await cargarConsultasEnSelect();
  await cargarTratamientos();
  
  document.getElementById('form-tratamiento').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tratamientoData = {
      id_consulta: document.getElementById('tratamiento-consulta').value,
      medicamento: document.getElementById('tratamiento-medicamento').value,
      dosis: document.getElementById('tratamiento-dosis').value,
      duracion: document.getElementById('tratamiento-duracion').value
    };

    try {
      const response = await fetch('http://localhost:3000/api/tratamientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tratamientoData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al registrar tratamiento');
      }

      alert(`Tratamiento registrado con ID: ${result.id}`);
      document.getElementById('form-tratamiento').reset();
      await cargarTratamientos();
      
    } catch (error) {
      console.error('Error en frontend:', error);
      alert(`Error: ${error.message}`);
    }
  });
});

async function cargarConsultasEnSelect() {
  try {
    const response = await fetch('/api/consultas');
    const consultas = await response.json();

    const select = document.getElementById('tratamiento-consulta');
    select.innerHTML = '<option value="">Seleccione consulta...</option>';

    const consultasArray = consultas.data || consultas;
    consultasArray.forEach(consulta => {
      const option = document.createElement('option');
      option.value = consulta.ID_CONSULTA || consulta.id;
      option.textContent = `Consulta #${consulta.ID_CONSULTA || consulta.id} - ${consulta.MASCOTA || consulta.mascota} (${consulta.FECHA || consulta.fecha})`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando consultas:', error);
  }
}

async function cargarTratamientos() {
  try {
    const response = await fetch('http://localhost:3000/api/tratamientos');
    const result = await response.json();
    
    if (!response.ok) throw new Error(result.message || 'Error cargando tratamientos');

    const tbody = document.querySelector('#tabla-tratamientos tbody');
    tbody.innerHTML = '';
    
    result.data.forEach(tratamiento => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${tratamiento.id}</td>
        <td>${tratamiento.id_consulta}</td>
        <td>${tratamiento.mascota}</td>
        <td>${tratamiento.medicamento}</td>
        <td>${tratamiento.dosis}</td>
        <td>${tratamiento.duracion}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error cargando tratamientos:', error);
  }
}