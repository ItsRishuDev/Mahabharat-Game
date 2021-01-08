console.log('Mahabharat - The Board Game');
console.log('by Rishabh Soni');

const gridContainer = document.querySelector('.grid-container');
//Battle Start Element
let battleStartMessage = $('#start-battle-message-container');
battleStartMessage.hide();
//Game Over Element
let gameOverElem = $("#game-over-container");
gameOverElem.hide();

const row = 10, column = 10;
let fight = false;
// Creating Weapons 
// Create Weapons Class
class Weapon {
    constructor(weaponName, weaponDamage) {
        this.name = weaponName;
        this.damage = weaponDamage;
    }
}

// Creating Weapon Object 
bahubal = new Weapon('Bahubal', 10);
khadag = new Weapon('Khadag', 25);
gada = new Weapon('Gada', 20);
dhanushBan = new Weapon('DhanushBan', 30);
trishul = new Weapon('Trishul', 40);
chakra = new Weapon('Chakra', 40)

// Creating Array of weapons 
let weapons = [khadag, gada, dhanushBan, trishul, chakra];

// Create Players 
// Creating Player Class 
class Player {
    constructor(playerName, playerWeapon, playerLife) {
        this.name = playerName;
        this.weapon = playerWeapon;
        this.life = playerLife;
        this.positionX = randomNum(row)
        this.positionY = randomNum(column)
    }
}
let max_life = 100;

// Creating Player Object 
pandav = new Player('Pandav', bahubal, max_life);
kaurav = new Player('Kaurav', bahubal, max_life);

// Creating Array of players 
let players = [pandav, kaurav];

//Generating Random Number
function randomNum(val) {
    return Math.floor(Math.random() * val)
}

//Creating board Item (all class will be store in it)
let boardItem = [];

//To clear Board Item        
function clearBoard() {
    gridContainer.innerHTML = "";
}

function addItem() {
    clearBoard()
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            let gridItem = document.createElement('div')
            gridItem.setAttribute('class', 'grid-item ' + boardItem[i][j]);
            gridItem.setAttribute('x', i);
            gridItem.setAttribute('y', j);
            gridContainer.appendChild(gridItem);
        }
    }
}

function generateGame() {
    boardItem = [];
    createFreeArea();
    createBarrier();
    placeWeapon();
    placePlayer();
    setPlayerData();
}

//Set Player Variable jQuery
let player1NameElem = $("#player-1-data-div .player-name");
let player1PictureElem = $("#player-1-data-div .player-img");
let player1HealthValueElem = $("#player-1-data-div .player-health");
let player1WeaponPictureElem = $("#player-1-data-div .player-weapon-img");
let player1WeaponNameElem = $("#player-1-data-div .player-weapon");
let player1WeaponDamageValueElem = $("#player-1-data-div .player-weapon-damage");
let player1TurnMessageElem = $("#player-1-data-div .turn-message");
let player1FightMessageElem = $("#player-1-data-div .fight-message");
let player1FightButtonsElem = $("#player-1-data-div .buttons");
let player1DefendButtonElem = $("#player-1-data-div .button-defend");
//Player 2 Variable
let player2NameElem = $("#player-2-data-div .player-name");
let player2PictureElem = $("#player-2-data-div .player-img");
let player2HealthValueElem = $("#player-2-data-div .player-health");
let player2WeaponNameElem = $("#player-2-data-div .player-weapon");
let player2WeaponPictureElem = $("#player-2-data-div .player-weapon-img");
let player2WeaponDamageValueElem = $("#player-2-data-div .player-weapon-damage");
let player2TurnMessageElem = $("#player-2-data-div .turn-message");
let player2FightMessageElem = $("#player-2-data-div .fight-message");
let player2FightButtonsElem = $("#player-2-data-div .buttons");
let player2DefendButtonElem = $("#player-2-data-div .button-defend");

//Set Player Data
function setPlayerData() {
    // Player 1 Data
    player1NameElem.text(players[0].name);
    player1PictureElem.html("<img src=\"images/pandav.png\">");
    player1HealthValueElem.text('Health : '+players[0].life);
    player1WeaponPictureElem.html("<img src=images/" + players[0].weapon.name + ".png>");
    player1WeaponNameElem.text(players[0].weapon.name);
    player1WeaponDamageValueElem.text('Damage : '+players[0].weapon.damage);
    // Player 2 Data
    player2NameElem.text(players[1].name);
    player2PictureElem.html("<img src=\"images/kaurav.png\">");
    player2HealthValueElem.text('Health : '+players[1].life);
    player2WeaponPictureElem.html("<img src=images/" + players[1].weapon.name + ".png>");
    player2WeaponNameElem.text(players[1].weapon.name);
    player2WeaponDamageValueElem.text('Damage : '+players[1].weapon.damage);
}

//Creating free space in board
function createFreeArea() {
    for (let i = 0; i < row; i++) {
        boardItem.push([]);
        for (let j = 0; j < column; j++) {
            boardItem[i][j] = 'free';
        }
    }
}

//Creating Barriers
function createBarrier() {
    const barrierQuantity = 10;
    let addedBarrier = 0;
    while (addedBarrier < barrierQuantity) {
        let randomX = randomNum(row);
        let randomY = randomNum(column);
        if (boardItem[randomX][randomY] == 'free') {
            boardItem[randomX][randomY] = 'blockage';
            addedBarrier += 1;
        }
    }
}

//Placing Weapons
function placeWeapon() {
    let placedWeapon = 0;
    while (placedWeapon < weapons.length) {
        let randomX = randomNum(row);
        let randomY = randomNum(column);
        if (boardItem[randomX][randomY] == 'free') {
            boardItem[randomX][randomY] = weapons[placedWeapon].name;
            placedWeapon += 1;
        }
    }
}

function placePlayer() {
    let placedPlayer = 0;
    while (placedPlayer < players.length) {
        let randomX = randomNum(row);
        let randomY = randomNum(column);
        if (boardItem[randomX][randomY] == 'free') {
            boardItem[randomX][randomY] = players[placedPlayer].name;
            players[placedPlayer].positionX = randomX;
            players[placedPlayer].positionY = randomY;
            placedPlayer += 1;
        }
    }
}

let currentPlayer = players[0];
let nonActivePlayer = players[1];

//Switch player
function switchPlayer() {
    if (currentPlayer == players[0]) {
        nonActivePlayer = players[0];
        currentPlayer = players[1];
        player1TurnMessageElem.addClass('hide');
        player2TurnMessageElem.removeClass('hide');
    }
    else if (currentPlayer == players[1]) {
        nonActivePlayer = players[1];
        currentPlayer = players[0];
        player1TurnMessageElem.removeClass('hide');
        player2TurnMessageElem.addClass('hide');
    }
}

//Creating Movement Fields for active player
function createMovementArea() {
    positionX = parseInt(currentPlayer.positionX);
    positionY = parseInt(currentPlayer.positionY);

    let maximumMovementArea = 3;
    let movement;
    let playerMovementArea = [];

    //Available Movement field in y right direction
    movement = positionY + 1;
    let repeat = true;
    while (repeat) {
        if (movement < row && movement <= positionY + maximumMovementArea) {
            if (boardItem[positionX][movement] == 'blockage') {
                repeat = false;
            } else {
                let availableArea = [positionX, movement]
                playerMovementArea.push(availableArea);
                movement += 1;
            }
        } else {
            repeat = false;
        }
    }

    //Available Movement field in y left direction
    movement = positionY - 1;
    repeat = true;
    while (repeat) {
        if (movement >= 0 && movement >= positionY - maximumMovementArea) {
            if (boardItem[positionX][movement] == 'blockage') {
                repeat = false;
            } else {
                let availableArea = [positionX, movement]
                playerMovementArea.push(availableArea);
                movement -= 1;
            }
        } else {
            repeat = false;
        }
    }

    //Available Movement field in y down direction
    movement = positionX + 1;
    repeat = true;
    while (repeat) {
        if (movement < column && movement <= positionX + maximumMovementArea) {
            if (boardItem[movement][positionY] == 'blockage') {
                repeat = false;
            } else {
                let availableArea = [movement, positionY];
                playerMovementArea.push(availableArea);
                movement += 1;
            }
        } else {
            repeat = false;
        }
    }

    //Available Movement field in y up direction
    movement = positionX - 1;
    repeat = true;
    while (repeat) {
        if (movement >= 0 && movement >= positionX - maximumMovementArea) {
            if (boardItem[movement][positionY] == 'blockage') {
                repeat = false;
            } else {
                let availableArea = [movement, positionY];
                playerMovementArea.push(availableArea);
                movement -= 1;
            }
        } else {
            repeat = false;
        }
    }
    return playerMovementArea
}

// Show available movement area for active player 
function showMovementArea() {
    playerMovementArea = createMovementArea();
    playerMovementArea.forEach(item => {
        if (boardItem[item[0]][item[1]] != 'free') {
            boardItem[item[0]][item[1]] = boardItem[item[0]][item[1]] + ' available';
        } else {
            boardItem[item[0]][item[1]] = 'available';
        }
    });
    addItem();
}

// Hiding available movement area on a game board when player choose destination
function hideMovementArea() {
    playerMovementArea.forEach(item => {
        if (boardItem[item[0]][item[1]].includes(currentPlayer.name) ||
            boardItem[item[0]][item[1]].includes(nonActivePlayer.name)
        ) {
            boardItem[item[0]][item[1]] = boardItem[item[0]][item[1]].replace('available', '');
        }
        else if (boardItem[item[0]][item[1]].includes(weapons[0].name) ||
            boardItem[item[0]][item[1]].includes(weapons[1].name) ||
            boardItem[item[0]][item[1]].includes(weapons[2].name) ||
            boardItem[item[0]][item[1]].includes(weapons[3].name) ||
            boardItem[item[0]][item[1]].includes(weapons[4].name)
        ) {
            boardItem[item[0]][item[1]] = boardItem[item[0]][item[1]].replace('available', '');
        }
        else {
            boardItem[item[0]][item[1]] = 'free';
        }
    });
    addItem();
}

//Start Game
function startGame() {
    showMovementArea();
}

//Check War Status
function checkWarStatus() {
    if ((players[0].positionX == players[1].positionX && players[0].positionY == players[1].positionY) ||
        (players[0].positionX == (players[1].positionX - 1) && players[0].positionY == (players[1].positionY - 1)) ||
        (players[0].positionX == (players[1].positionX - 1) && players[0].positionY == players[1].positionY) ||
        (players[0].positionX == players[1].positionX && players[0].positionY == (players[1].positionY - 1)) ||
        (players[0].positionX == (players[1].positionX - 1) && players[0].positionY == (players[1].positionY + 1)) ||
        (players[0].positionX == (players[1].positionX + 1) && players[0].positionY == (players[1].positionY - 1)) ||
        (players[0].positionX == (players[1].positionX + 1) && players[0].positionY == (players[1].positionY + 1)) ||
        (players[0].positionX == (players[1].positionX + 1) && players[0].positionY == players[1].positionY) ||
        (players[0].positionX == players[1].positionX && players[0].positionY == (players[1].positionY + 1))
    ) {
        fight = true;
        battleStartMessage.show();
        battleMessageHide = setTimeout(hideBattleMessage, 2000);
    }
}

function hideBattleMessage() {
    clearTimeout(battleMessageHide);
	battleStartMessage.hide();
	startFight();
}

//Change Weapon
function changeWeapon(oldPositionX, oldPositionY, weaponType) {
    let oldWeapon = currentPlayer.weapon.name;
    for (let weapon = 0; weapon < weapons.length; weapon++) {
        if (weaponType.includes(weapons[weapon].name)) {
            newWeapon = weapons[weapon];
            break;
        }

    }

    //Assigning New Weapon to player
    currentPlayer.weapon = newWeapon;

    //Left old weapon
    if (oldWeapon == 'Bahubal') {
        boardItem[oldPositionX][oldPositionY] = 'free';
    }
    else {
        boardItem[oldPositionX][oldPositionY] = oldWeapon;
    }
    setPlayerData();
}

//Movement of Players
let kurukshetra = document.querySelector('.grid-container');
kurukshetra.addEventListener('click', movePlayer);

// Players Movement
function movePlayer(event) {
    let clickedCell = event.target;
    let newPositionX = parseInt(clickedCell.getAttribute("x"));
    let newPositionY = parseInt(clickedCell.getAttribute("y"));
    let oldPositionX = currentPlayer.positionX;
    let oldPositionY = currentPlayer.positionY;

    //Conditions for free space
    if (boardItem[newPositionX][newPositionY] == 'available') {
        boardItem[oldPositionX][oldPositionY] = 'free';
        currentPlayer.positionX = newPositionX;
        currentPlayer.positionY = newPositionY;
        hideMovementArea();
        checkWarStatus();
        boardItem[newPositionX][newPositionY] = currentPlayer.name;
        switchPlayer();
        addItem();
        if (!fight) {           
            showMovementArea();
        }
    }
    //Condition for weapons
    if (boardItem[newPositionX][newPositionY] == weapons[0].name + " available" ||
        boardItem[newPositionX][newPositionY] == weapons[1].name + " available" ||
        boardItem[newPositionX][newPositionY] == weapons[2].name + " available" ||
        boardItem[newPositionX][newPositionY] == weapons[3].name + " available" ||
        boardItem[newPositionX][newPositionY] == weapons[4].name + " available") {
        let oldPositionX = currentPlayer.positionX;
        let oldPositionY = currentPlayer.positionY;
        let weaponType = boardItem[newPositionX][newPositionY];
        currentPlayer.positionX = newPositionX;
        currentPlayer.positionY = newPositionY;
        changeWeapon(oldPositionX, oldPositionY, weaponType)
        boardItem[newPositionX][newPositionY] = currentPlayer.name;
        hideMovementArea();
        checkWarStatus();
        switchPlayer();
        addItem();
        if (!fight) {           
            showMovementArea();
        }
    }
}

//Hiding Fighting button
function hideFightButtons() {
    player1FightButtonsElem.hide();
	player2FightButtonsElem.hide();
}

//Player Defend Variables
let player1Defend = false;
let player2Defend = false;

//Start Fight
function startFight() {
    if (currentPlayer == players[0]) {
        player1FightButtonsElem.show();
    } else {
        player2FightButtonsElem.show();
    }
    player1FightButtonsElem[0].addEventListener("click", player1FightTurn);
	player2FightButtonsElem[0].addEventListener("click", player2FightTurn);
}

function player1FightTurn(event) {
    if (event.target.classList.contains('button-attack')) {
        if (player2Defend) {
            damage = players[0].weapon.damage / 2;
			player2Defend = false;
        }
        else{
            damage = players[0].weapon.damage;
        }
        player1Defend = false;
        players[1].life -= damage;
        player1FightMessageElem.text(`You attacked and made ${damage} points of damage to Kaurav`);
		if (players[1].life <= 0) {
			player2HealthValueElem[0].innerHTML = 0;
			player2FightMessageElem.text("You lost !!!");
			player1FightMessageElem.text("You won !!!");
			gameOver();
			return;
        } 
        else {
			player2HealthValueElem[0].innerHTML =`Health : ${players[1].life}`;
			player2FightMessageElem.text(`You have lost ${damage} points of your Life`);
        }
    }
    else {
        player1Defend = true;
        player1FightMessageElem.text("You are defending against next atack");
    }
    player1FightButtonsElem.hide();
    player2FightButtonsElem.show();
    if (player2Defend) {
        player2DefendButtonElem.hide();
    } else {
        player2DefendButtonElem.show();
    }
    switchPlayer();
}

function player2FightTurn(event) {
    if (event.target.classList.contains('button-attack')) {
        if (player1Defend) {
            damage = players[1].weapon.damage / 2;
			player1Defend = false;
        }
        else{
            damage = players[1].weapon.damage;
        }
        player2Defend = false;
        players[0].life -= damage;
        player2FightMessageElem.text(`You attacked and made ${damage} points of damage to Pandav`);
		if (players[0].life <= 0) {
			player1HealthValueElem[0].innerHTML = 0;
			player1FightMessageElem.text("You lost !!!");
			player2FightMessageElem.text("You won !!!");
			gameOver();
			return;
        } 
        else {
			player1HealthValueElem[0].innerHTML =`Health : ${players[0].life}`;
			player1FightMessageElem.text(`You have lost ${damage} points of your Life`);
        }
    }
    else {
        player2Defend = true;
        player2FightMessageElem.text("You are defending against next atack");
    }
    player2FightButtonsElem.hide();
    player1FightButtonsElem.show();
    if (player1Defend) {
        player1DefendButtonElem.hide();
    } else {
        player1DefendButtonElem.show();
    }
    switchPlayer();
}

//Winner Variables
let winnerNameElem = $("#game-over .player-name");
let winnerPictureElem = $("#game-over .player-picture");

function gameOver() {
    player1FightButtonsElem[0].removeEventListener("click", player1FightTurn);
	player2FightButtonsElem[0].removeEventListener("click", player2FightTurn);
	hideFightButtons();
	player1TurnMessageElem[0].innerHTML = "";
    player2TurnMessageElem[0].innerHTML = "";
    gameOverElem.show();
    if (currentPlayer == players[0]) {
        winnerNameElem.text(players[0].name);
        winnerPictureElem.html("<img src=\"images/pandav.png\">");
    } else {
        winnerNameElem.text(players[0].name);
        winnerPictureElem.html("<img src=\"images/kaurav.png\">");
    }    
}

generateGame();
addItem();
startGame();