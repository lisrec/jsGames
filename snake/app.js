var canvas, ctx, fps, gameLoop, click
var width, height, maxX, maxY, background, scl
var snake, apple

var score = function() {
	return snake.length
}

var newGame = function() {

	$('#status').html('')
	$('#resetGame').blur()
	$('#app').focus()

	clearInterval(gameLoop)

	init()
}

var gameOver = function() {
	if (snake.x < 0 || snake.x >= maxX || snake.y < 0 || snake.y >= maxY || snake.death())
		return true
	else
		return false
}

var showScore = function() {
	let status = 'Score: ' + score()
	$('#status').html(status)
}

var calc = function() {
	snake.calc()
	apple.calc()
	click = false
}

var draw = function() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, width, height)

	snake.draw()
	apple.draw()

	showScore()
}

var update = function() {
	if(!gameOver()) {
		calc()
		draw()
	} else {
		let status = 'Game Over' + ' (score: ' + score() + ')'
		$('#status').html(status)
	}
}

var init = function() {

	$('#app').focus()

	fps = 10
	scl = 10
	maxX = 30
	maxY = 25
	click = false

	canvas = $('#app')[0]
	canvas.width = width = maxX * scl
	canvas.height = height = maxY * scl
	ctx = canvas.getContext('2d')

	snake = new Snake()
	apple = new Apple(maxX, maxY)
	gameLoop = setInterval(update, 1000 / fps)

	$(document).keydown((e) => {
		let key = e.keyCode

		if(key == 82) //R - reset
			newGame()

		if(!click)
			snake.move(key)

		click = true
	})

	$('#resetGame').click(() => {
		newGame()
	})
}

$(document).ready(init)






