const pokemonName = document.getElementById('pokemon-name');
const pokemonDescription = document.getElementById('pokemon-description');
const pokemonImage = document.getElementById('pokemon-image');
const randomBtn = document.getElementById('random-btn');

randomBtn.addEventListener('click', fetchRandomPokemon);


async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // ID entre 1 y 898
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

        // Set the Pokémon data
        pokemonName.textContent = `Nombre: ${data.name}`;
        pokemonImage.src = data.sprites.front_default;
        
        // Fetch species data to get description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Obtener la descripción en inglés
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
        pokemonDescription.textContent = `Descripcion: ${description ? description.flavor_text : "No hay descripción disponible."}`;
    } catch (error) {
        console.error("Error fetching the Pokémon data:", error);
        pokemonDescription.textContent = "Failed to load Pokémon data.";
    }
}

document.addEventListener('DOMContentLoaded', fetchRandomPokemon); 
