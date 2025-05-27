document.getElementById('form-dueno').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const duenoData = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value
  };

  try {
    const response = await fetch('http://localhost:3000/api/duenos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Este header es CRÍTICO
      },
      body: JSON.stringify(duenoData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al registrar dueño');
    }

    alert(`Dueño registrado con ID: ${result.id}`);
    document.getElementById('form-dueno').reset();

  } catch (error) {
    console.error('Error en frontend:', error);
    alert(`Error: ${error.message}`);
  }
});