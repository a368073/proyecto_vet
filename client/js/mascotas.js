document.addEventListener('DOMContentLoaded', async () => {
  await cargarDuenosEnSelect();
  await cargarMascotas();
  
  document.getElementById('form-mascota').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const mascotaData = {
      nombre: document.getElementById('mascota-nombre').value,
      especie: document.getElementById('mascota-especie').value,
      raza: document.getElementById('mascota-raza').value,
      edad: document.getElementById('mascota-edad').value,
      id_dueno: Number(document.getElementById('mascota-dueno').value)
    };

    try {
      const response = await fetch('http://localhost:3000/api/mascotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mascotaData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al registrar mascota');
      }

      alert(`Mascota registrada con ID: ${result.id}`);
      document.getElementById('form-mascota').reset();
      await cargarMascotas();
      
    } catch (error) {
      console.error('Error en frontend:', error);
      alert(`Error: ${error.message}`);
    }
  });
});

async function cargarDuenosEnSelect() {
  try {
    const res = await fetch('/api/mascotas/duenos');
    const duenosResp = await res.json();
    // Si la respuesta es { data: [...] }, usa duenosResp.data; si es un array directo, usa duenosResp
    const duenos = duenosResp.data || duenosResp;
    const select = document.getElementById('mascota-dueno');
    select.innerHTML = '<option value="">Seleccione dueño...</option>'; // Limpia el select

    duenos.forEach(dueno => {
      const option = document.createElement('option');
      option.value = dueno.id;
      option.textContent = dueno.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando dueños:', error);
  }
}

async function cargarMascotas() {
  try {
    const response = await fetch('http://localhost:3000/api/mascotas');
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error cargando mascotas');

    const tbody = document.querySelector('#mascotas .table tbody');
    tbody.innerHTML = '';
    
    result.data.forEach(mascota => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${mascota.id}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.especie}</td>
        <td>${mascota.raza || '-'}</td>
        <td>${mascota.edad || '-'}</td>
        <td>${mascota.dueno}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error cargando mascotas:', error);
  }
}