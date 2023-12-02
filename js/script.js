let next;
let prev;
const app = document.getElementById('app')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const resetBtn = document.getElementById('resetBtn')
const inputField = document.getElementById('searchInput')


const print = (pokemon, url) => {
        url = `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`
        app.innerHTML += `
        <div class="card">
        <img src="${url}" alt="image of ${pokemon}" />
        <p>${pokemon}</p>
        </div>
        `
}

const apiPokemon = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error ('Ha surgido un problema.')
        }
        const pokemons = await res.json()
        app.innerHTML = ''
        for (let pokemon of pokemons.results) {
            print(pokemon.name)
            console.log(pokemon.url)
        }
        next = pokemons.next
        prev = pokemons.previous
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
}

apiPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
nextBtn.addEventListener('click', () => {
    if (next) {
        apiPokemon(next)
    }
})
prevBtn.addEventListener('click', () => {
    if (prev) {
        apiPokemon(prev)
    }
})
searchBtn.addEventListener('click', () => {
    url = `https://pokeapi.co/api/v2/pokemon/${inputField.value}`
})

