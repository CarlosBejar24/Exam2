// Obtener el ID actual desde la URL
const urlParts = window.location.pathname.split('/');
let currentId = parseInt(urlParts[urlParts.length - 1]) || 0;  // Toma el último segmento como el ID o 0 por defecto

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentId > 0) {
    currentId--;
  } else {
    currentId = 52;  // Si llega a 0, vuelve a 52
  }
  window.location.href = `/infoGOT/${currentId}`;
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentId < 52) {
    currentId++;
  } else {
    currentId = 0;  // Si llega a 52, vuelve a 0
  }
  window.location.href = `/infoGOT/${currentId}`;
});

//Buscar con lupa
document.getElementById('searchForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const searchValue = document.getElementById('searchInput').value;

  // Verifica que se haya ingresado un valor
  if (!searchValue) {
    alert("Por favor, ingresa un nombre");
    return;
  }

  try {
    // Realiza la petición a la API de Thrones
    const response = await fetch(`https://thronesapi.com/api/v2/Characters`);
    const data = await response.json();

    // Buscar el personaje por nombre (busca coincidencia con el nombre ingresado)
    const character = data.find(character => character.fullName.toLowerCase() === searchValue.toLowerCase());

    if (!character) {
      alert(`No se encontró ningún personaje con el nombre: ${searchValue}`);
      return;
    }

    const characterId = character.id;
    alert(`El ID del personaje es: ${characterId}, serás redireccionado`);

    // Redirige al usuario a la página correspondiente con el ID
    window.location.href = `/infoGOT/${characterId}`;

  } catch (error) {
    console.error('Error al buscar el personaje:', error);
    alert('Hubo un error al buscar el personaje.');
  }
});
