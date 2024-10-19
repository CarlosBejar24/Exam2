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
