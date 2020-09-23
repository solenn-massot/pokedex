let allPokemon = [];
let finalTab = [];
const searchInput = document.querySelector('.search-poke input');
const listPoke = document.querySelector('.list-poke');
const loader = document.querySelector('.wrapper');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};


function fetchPokeBase(){

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(reponse => reponse.json())
    .then((allPoke) => {
        allPoke.results.forEach((pokemon) => {
            fetchAllPoke(pokemon);
            // console.log(pokemon);
        })
    })
}
fetchPokeBase();


function fetchAllPoke(pokemon){


    let objPokeFull= [];
    let url = pokemon.url;
    let name = pokemon.name;

    fetch(url)
    .then(response => response.json())
    .then((pokeData) => {
        objPokeFull.picFront = pokeData.sprites.front_default;
        objPokeFull.picBack = pokeData.sprites.back_default;
        objPokeFull.type = pokeData.types[0].type.name;
        objPokeFull.name = name;
        objPokeFull.id = pokeData.id;

        allPokemon.push(objPokeFull);


        if(allPokemon.length === 151) {
            //méthode pour trier les éléments par l'id et permettre de les récupérer dans le bon ordre
            arrayPoke = allPokemon.sort((a,b) => {
                return a.id - b.id;
            }).slice(0,21);

            createCard(arrayPoke);
            loader.style.display = "none";
        }
    })
}

function createCard(arr){

    for(let i = 0; i < arr.length; i++){

        const div = document.createElement('div');
        div.classList.add('flip-card-inner');
        const divGlobal = document.createElement('div');
        divGlobal.classList.add('flip-card');
        const card = document.createElement('div');
        card.classList.add('flip-card-front');
        let color = types[arr[i].type];
        card.style.background = color;
        const txtCard = document.createElement('h5');
        txtCard.classList.add('name-pokemon');
        txtCard.innerText = arr[i].name;
        const idCard = document.createElement('p');
        idCard.innerText = `ID #${arr[i].id}`;
        const imgCard = document.createElement('img');
        imgCard.src = arr[i].picBack;
        imgCard.id = arr[i].id;
        const cardBack = document.createElement('div');
        cardBack.classList.add('flip-card-back');
        cardBack.style.background = color;
        const imgBack = document.createElement('img');
        imgBack.src = arr[i].picFront;
        const type = document.createElement('p');
        type.innerText = arr[i].type;
        const txtCardBack = document.createElement('h5');
        txtCardBack.innerText = arr[i].name;
        
        cardBack.appendChild(imgBack);
        cardBack.appendChild(txtCardBack);
        cardBack.appendChild(type);
        card.appendChild(imgCard);
        card.appendChild(txtCard);
        card.appendChild(idCard);
        div.appendChild(card);
        div.appendChild(cardBack);
        divGlobal.appendChild(div);

        listPoke.appendChild(divGlobal);
    }

}

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(clientHeight + scrollTop >= scrollHeight - 50){
        addPoke(6);
    }
})

let index= 21;

function addPoke(nb){

    if(index > 151){
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}


searchInput.addEventListener('keyup', recherche);

function recherche(){
    if(index < 151){
        addPoke(130);
    }

    let filter, allDiv, titleValue, allTitles;

    filter = searchInput.value.toUpperCase();
    allDiv = document.getElementsByClassName('flip-card');
    allTitles = document.getElementsByClassName('name-pokemon');
    

    for(let i = 0; i < allDiv.length; i++){

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allDiv[i].style.display = "flex";
        } else {
            allDiv[i].style.display = "none";
        }
    }

}



searchInput.addEventListener('input', function(e){

    if(e.target.value !== ""){
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
})