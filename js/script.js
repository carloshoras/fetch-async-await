let next;
let prev;
const app = document.getElementById('app')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const resetBtn = document.getElementById('resetBtn')
const inputField = document.getElementById('searchInput')

function chequeaPokemonFav() {
    const listaPkmn = document.querySelectorAll(".card")
    const estrella = document.querySelectorAll(".card .fav")
    listaPkmn.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (localStorage.getItem(card.id)) {
                localStorage.removeItem(card.id)
                estrella[index].style="display:none"
            } else {
                localStorage.setItem(card.id, card.id)
                estrella[index].style="display:visible"
            }
        })
    })
}

const print = (pokemon) => {
    let pokemonName = pokemon.toUpperCase()
    const url = `https://img.pokemondb.net/sprites/home/normal/${pokemon}.png`
    app.innerHTML += `
    <div class="card" id="${pokemon}">
    <img src="${url}" alt="${pokemonName}" />
    <div class="nameFav">
    <p>${pokemonName}</p>
    <img src="./assets/img/star.png" style="display:none" alt="fav" class="fav" />
    </div>
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
        if(!pokemons.results && res.ok) {
            return true
        }
        for (let pokemon of pokemons.results) {
            print(pokemon.name)
        }
        chequeaPokemonFav()
        next = pokemons.next
        prev = pokemons.previous
    } catch (error) {
        if('0123456789'.indexOf(url[(url.length)-1]) == -1) {
            return false
        }
        console.log('Error al obtener los datos ', error);
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
    const wantedPokemon = inputField.value.toLowerCase()
    url = `https://pokeapi.co/api/v2/pokemon/${wantedPokemon}`
    apiPokemon(url).then((resp) => {
        if (resp == true) {
            print(wantedPokemon)
            chequeaPokemonFav()
        } else if (resp==false){
            app.innerHTML = `
            <div class="card">
            <p>Ese pokemon no existe</p>
            </div>
            `
        }
    })
})
resetBtn.addEventListener('click', () => {
    apiPokemon('https://pokeapi.co/api/v2/pokemon?limit=10')
    localStorage.clear()
})

