const options = document.querySelectorAll('.game-option');
const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const result = document.querySelector('.game-result');
const computerScores = document.querySelector('.computer-scores');
const playerScores = document.querySelector('.player-scores');
const turn = document.querySelector('.turn');
const resetGame = document.querySelector('.reset-game-button');
const givePlayerPoint = document.querySelector('.give-player-point');
const giveComputerPoint = document.querySelector('.give-computer-point');

const choices = ['rock', 'paper', 'scissors'];

let playerChoice;
let computerChoice;
let playerPoints = 0;
let computerPoints = 0;

const setGame = () =>
{
    computerScores.innerHTML = 0;
    playerScores.innerHTML = 0;
    turn.innerHTML = 'Your turn. Choose your weapon :)';
    playerChoiceDisplay.innerHTML = '';
    computerChoiceDisplay.innerHTML = '';
    playerPoints = 0;
    computerPoints = 0;
}

window.onload = setGame();

options.forEach(btn => btn.addEventListener('click', (e) =>
{
    playerChoice = e.target.dataset.option;
    playerChoiceDisplay.innerHTML = 'Player choice: ' + playerChoice;

    options.forEach(option => option.classList.remove('active'));
    e.target.classList.add('active');
    
    resetGame.classList.add('inactive');
    options.forEach(option => option.classList.add('inactive'));
    setTimeout(() => 
    {
        options.forEach(option => option.classList.remove('active'));
    }, 1000);

    setTimeout(() => 
    {
        turn.innerHTML = 'Computer is selecting...';
        generateComputerChoice();
    }, 1500);

    setTimeout(() => 
    {
        options.forEach(option => option.classList.remove('inactive'));
    }, 3000);
}));

const generateComputerChoice = (e) =>
{
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceDisplay.innerHTML = 'Computer choice: ' + computerChoice;
    options.forEach(option => option.classList.remove('active'))
    
    options.forEach(option => 
    {
        // if(computerChoice === 'rock' && option.dataset.id === '0') option.classList.add('active')
        // if(computerChoice === 'paper' && option.dataset.id === '1') option.classList.add('active')
        // if(computerChoice === 'scissors' && option.dataset.id === '2') option.classList.add('active')
        // if and switch work the same way
        switch(computerChoice + option.dataset.id)
        {
            case 'rock0':
            option.classList.add('active');
            break;
            case 'paper1':
            option.classList.add('active');
            break;
            case 'scissors2':
            option.classList.add('active');
            break;
        }
    })

    setTimeout(() => 
    {
        options.forEach(option => option.classList.remove('active'));
        turn.innerHTML = 'Your turn. Choose your weapon :)';
        resetGame.classList.remove('inactive');
    }, 1000);
    getResult();
}

const givePointToPlayer = () =>
{
    givePlayerPoint.classList.add('active');

    setTimeout(() =>
    {
        givePlayerPoint.classList.remove('active');
    }, 900);
}

const givePointToComputer = () =>
{
    giveComputerPoint.classList.add('active');

    setTimeout(() =>
    {
        giveComputerPoint.classList.remove('active');
    }, 900);
}

const getResult = () =>
{
    result.classList.remove('active');
    switch(playerChoice + computerChoice)
    {
        case 'rockscissors':
        case 'scissorspaper':
        case 'paperrock':
        result.innerHTML = 'You win!';
        result.style.background = 'green';
        playerPoints++;
        playerScores.innerHTML = playerPoints;
        givePointToPlayer();
        break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
        result.innerHTML = 'You lose!';
        result.style.background = 'red';
        computerPoints++;
        computerScores.innerHTML = computerPoints;
        givePointToComputer();
        break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
        result.innerHTML = 'Its a draw';
        result.style.background = 'gray';
        break;
    }
    resetGame.classList.add('active');
}

resetGame.addEventListener('click', () =>
{
    result.classList.add('active');
    resetGame.classList.remove('active');
    setGame();
});