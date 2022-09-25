var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $resultHeader1 = document.querySelector('#result-header1')
var $gameTime = document.querySelector('#game-time')

var bastards = ['images/bastard1.jpg', 'images/bastard2.jpg', 'images/bastard3.jpg', 'images/bastard4.jpg', 'images/bastard5.jpg']
var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}


function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  $game.style.backgroundImage="url(images/trisub-background1.png)"
  //$game.style.backgroundColor = '#fff'
  hide($start)

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent)
    
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
  hide($resultHeader1)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  if (score == 1){
    show($resultHeader1)
  } else{
    show($resultHeader)
  }
  $game.style.backgroundImage="url(images/trisub-background.png)"
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  var box = document.createElement('div')
  var boxSize = 75
  var gameSize = $game.getBoundingClientRect()
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  var randomBastardIndex = getRandom(0, bastards.length)
  var bastard = bastards[randomBastardIndex]


  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundImage = `url('${bastard}')`
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = `url('images/pointer1.png'), default`;
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}