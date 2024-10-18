document.addEventListener("DOMContentLoaded", () => {
    let currentCharacterId = 1;

    // Botón de búsqueda
    document.getElementById("search-btn").addEventListener("click", () => {
        const query = document.getElementById("search-bar").value;
        if (query) {
            console.log(`Searching for character: ${query}`);
            fetchCharacterByName(query);
        }
    });

    // Botones de navegación
    document.getElementById("prev-btn").addEventListener("click", () => {
        currentCharacterId = currentCharacterId === 1 ? 213 : currentCharacterId - 1;
        console.log(`Fetching previous character with ID: ${currentCharacterId}`);
        fetchCharacterById(currentCharacterId);
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentCharacterId = currentCharacterId === 213 ? 1 : currentCharacterId + 1;
        console.log(`Fetching next character with ID: ${currentCharacterId}`);
        fetchCharacterById(currentCharacterId);
    });

    // Función para buscar un personaje por nombre
    function fetchCharacterByName(name) {
        fetch(`/infoGOT/search?name=${name}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(`Character found:`, data);
                if (data.error) {
                    alert(data.error);
                } else {
                    displayCharacter(data);
                    currentCharacterId = data.id;
                }
            })
            .catch((error) => console.error("Error fetching character by name:", error));
    }

    // Función para obtener un personaje por ID
    function fetchCharacterById(id) {
        fetch(`/infoGOT/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(`Character with ID ${id} fetched:`, data);
                displayCharacter(data);
            })
            .catch((error) => console.error("Error fetching character by ID:", error));
    }

    // Mostrar información del personaje en el DOM
    function displayCharacter(character) {
        document.getElementById("character-name").innerText = `${character.firstName || character.name} ${character.lastName || ''}`;
        document.getElementById("character-info").innerHTML = `
            <p><strong>ID:</strong> ${character.id || 'N/A'}</p>
            <p><strong>Born:</strong> ${character.born || "Unknown"}</p>
            <p><strong>Died:</strong> ${character.died || "Unknown"}</p>
            <p><strong>Titles:</strong> ${character.titles ? character.titles.join(", ") : 'No titles'}</p>
            <p><strong>Aliases:</strong> ${character.aliases ? character.aliases.join(", ") : 'No aliases'}</p>
            <p><strong>Family:</strong> ${character.family || 'Unknown'}</p>
        `;
        document.getElementById("character-image").src = character.imageUrl || "images/default.jpeg";
    }

    // Fetch the first character on page load
    fetchCharacterById(currentCharacterId);
});
