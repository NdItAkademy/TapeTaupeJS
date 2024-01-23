let timer;
let timeLeft = 120;
let level = 1;
let score = 0;
let PlayerName;
let block = document.querySelector('.block');
let board = document.querySelector('#boardGame');
let nbBlock = 16;
let sqrt = 100 / Math.sqrt(nbBlock);
let rand;
let startButton;
let victory = document.getElementById("afficheVictoire");
let interval = 1000;
let characterTypes = ['character', 'character2'];
let currentCharacterType = characterTypes[Math.floor(Math.random() * characterTypes.length)];


// Démarrage du jeu en cliquant sur le bouton start
document.querySelector('#startGame').addEventListener('click', () => {
    document.querySelector('#startGame').classList.add('none');
// création de la case random pour l'apparition du character
    rand = randomCase();

// affiche le character actuel dans le block en fonction du rand / 
// avec un interval de 1 secondes entre chaque déplacement
    function displayCharacter() {
        let block = document.querySelector(`[data-id='${rand}']`);
        block.classList.add(currentCharacterType);
        setInterval(characterRandomMove, 1000);
    }

// Définition des variables victoire et défaite
    victory = false;
    defeat = false;

// Création d'une boucle permettant de créer les classes de block dépendant du NbBlock définit en haut de page
    for (let i = 1; i <= nbBlock; i++) {
        let element = `<div class="block" data-id="${i}"></div>`;
        board.innerHTML += element;
    }


// Je définis ici la place que prendront les blocs dans le tableau #boardGame
    document.querySelectorAll('.block').forEach((block) => {
        block.style.width = `${sqrt - 1}%`;
        block.style.height = `${sqrt}%`;
    });

// Déclaration des fonctions  
    displayCharacter();
    startTimer();
});

// S'active lorsque je clique à l'intérieur de l'élément #boardGame
document.querySelector("#boardGame").addEventListener('click', (el) => {
    el = el.target;

// Si la classe contient les éléments character ou character3 je rentre dans la condition
    if (el.classList.contains('character') || el.classList.contains('character3') || el.classList.contains('character4')) {
        score++;
        clickTaupe();
    } 
    else if (el.classList.contains('character2')){
        score--;
        clickTaupe();
    }
    else {
        if (score > 0) {
            score--;
        }
    }

    document.querySelector('#score').innerHTML = score;

// Si mon score est de 20 alors je rentre dans ma condition et passe au niveau suivant
    if (score >= 10 && level == 1) {
        level++;
        console.log(level)
        setupNewLevel();
    }

// si mon score attetint 40 alors je passe au niveau suivant
    if (score >= 20 && level == 2) {
        level ++;
        console.log(level);
        setupNewLevel();
    }
});


// Fonction permettant de retourner une valeur aléatoire entre 1 et le nombre de blocs du tableau, en l'occurence 16 (voir nbBlock)
function randomCase() {
    return Math.floor(Math.random() * nbBlock) + 1;
}

// Fonction permettant de faire un rand de l'affichage des personnages 
function randomCharacter() {
    return currentCharacterType = characterTypes[Math.floor(Math.random() * characterTypes.length)];
}


// fonction clickTaupe fait réapparaître le character dans un nouveau rand lorsqu'il est cliqué
function clickTaupe() {

    let oldBlock = document.querySelector(`[data-id='${rand}']`);
    oldBlock.classList.remove(currentCharacterType);

    rand = randomCase();
    console.log(rand);

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add(randomCharacter());
}

function characterRandomMove() {
    let oldBlock = document.querySelector(`[data-id='${rand}']`);
    oldBlock.classList.remove(currentCharacterType);

    rand = randomCase();

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add(randomCharacter());

}

// Permet de démarrer le timer définit par la variable timeLeft
function startTimer() {
    timer = setInterval(() => {
        updateTimer();

        // condition si le temps se termine, remettre le compteur à zéro
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeLeft = 120;
            document.querySelector('#timer').innerHTML = '2:00';

            if (score < 20) {
                alert("Le temps est écoulé ! Appuyez ici pour recommencer :(");
                resetGame();  // Appel de la fonction pour réinitialiser le jeu
            }
        }
    }, 1000);
}


function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.querySelector('#timer').innerHTML = formattedTime;

    timeLeft--;
}


function setupNewLevel() {
    // Supprimer la classe CSS associée au niveau précédent
    removeCurrentBackground();

    // Mettre à jour la liste des types de caractères pour inclure 'character3' au niveau 2
    if (level === 2) {
        characterTypes = ['character3'];
    }

    if (level === 3) {
        characterTypes = ['character4']
    }

    // Ajouter ici le code pour configurer le nouveau niveau
    displayCharacter();
}

function removeCurrentBackground() {
    // Supprimer la classe CSS associée au niveau actuel
    switch (level) {
        case 2:
            document.querySelector('.level1').classList.add('none');
            break;
        case 3:
            document.querySelector('.level2').classList.add('none');
            break;
    }
}

function resetGame() {
    score = 0;
    document.querySelector('#score').innerHTML = score;

    level = 1;
    characterTypes = ['character', 'character2'];

    // Masquer le tableau #boardGame
    document.querySelector('#boardGame').classList.add('none');

    document.querySelector('#boardGame').innerHTML = ''; // Supprimer le contenu du tableau

    for (let i = 1; i <= nbBlock; i++) {
        let element = `<div class="block" data-id="${i}"></div>`;
        board.innerHTML += element;
    }

    // Réinitialiser les styles des blocs
    document.querySelectorAll('.block').forEach((block) => {
        block.style.width = `${sqrt - 1}%`;
        block.style.height = `${sqrt}%`;
    });

    // Afficher à nouveau le bouton "start"
    document.querySelector('#startGame').classList.remove('none');

    startGame();
}

// Ajouter une fonction pour démarrer le jeu
function startGame() {

        // Réinitialiser le bouton Start
        document.querySelector('#startGame').classList.remove('none');

        // réinitialiser le tableau #boardGame
        document.querySelector('#boardGame').classList.add('none');

    // Réinitialiser le caractère actuel
    currentCharacterType = characterTypes[Math.floor(Math.random() * characterTypes.length)];

    // Réinitialiser le timer
    clearInterval(timer);
    tempsRestant = 120;
    document.querySelector('#timer').innerHTML = '2:00';

    if (level >=2) {
        document.querySelector('.level2').classList.add('none');
    }

}
