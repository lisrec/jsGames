const KEY_LEFT = 37
const KEY_RIGHT = 39
const KEY_SPACE = 32
const KEY_R = 82

var player_fps = 30
var canvas, ctx, width, height, maxX, maxY
var fps, scl, click, invaders_number
var gameLoop
var player, invaders
var nextMove, shoot_check, bullet_player_timer
var lives_left, score, level
var bullets, bullets_invaders

var drawStatus = function() {
	ctx.font = "20px Comic Sans MS"
	ctx.fillStyle = "yellow"
	ctx.textAlign = "center"
	ctx.fillText(`Lives: ${lives_left}`, width-60, height-60)
	ctx.fillText(`Score: ${score}`, width-60, height-30)

	ctx.font = "24px Comic Sans MS"
	ctx.fillText(`Level ${level}`, width/2, 25)
}

var gameOver = function() {
	let res = false;
	if(lives_left <= 0)
		res = true
	else
		invaders.forEach((object) => {
			if(object.statusGameOver())
				res = true
		})
	return res
}

var calc = function() {
	player.move(nextMove)

	if(bullet_player_timer > 0)
		bullet_player_timer--

	if(shoot_check && !bullet_player_timer) {
		bullets.push(player.shoot())
		bullet_player_timer = (70 - level * 10) <= 25 ? 25 : (70 - level * 10)
	}

	invaders.forEach((object) => {
		object.calc()
	})

	bullets.forEach((object, index) => {
		object.calc()
		object.checkColision().then(status => {
			if(status) {
				bullets.splice(index, 1)
			}
		})
	})

	bullets_invaders.forEach((object, index) => {
		object.calc()
		object.checkColision().then(status => {
			if(status) {
				bullets_invaders.splice(index, 1)
			}
		})
	})

	if(!invaders.length) {
		level++
		for (let i = 0; i < invaders_number; i++)
			invaders.push(new Invader(i))
	}
}

var draw = function() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, width, height)

	player.draw()

	invaders.forEach((object) => {
		object.draw()
	})

	bullets.forEach((object) => {
		object.draw()
	})

	bullets_invaders.forEach((object) => {
		object.draw()
	})

	drawStatus()
}

var update = function() {
	if(!gameOver()) {
		let status = `Level ${level} <br> (Score: ${score})`
		$('#status').html(status)
		calc()
		draw()
	} else {
		let status = `Game Over! <br> You score: ${score}`
		$('#status').html(status)
	}
}

var newGame = function() {
	clearInterval(gameLoop)
	gameLoop = null
	init()
}

var setFPS = function(fps_set) {
	$(".button_fps").removeAttr("disabled")
	$(".button_fps_"+fps_set).attr("disabled", true)

	console.log($(".button_fps_"+fps_set))

	player_fps = fps_set
	fps = player_fps
	newGame()
}

var init = function() {
	$('#app').focus()

	fps = player_fps
	$("#fps").html(`(${fps} fps)`)
	scl = 10
	click = false

	maxX = 80
	maxY = 60

	canvas = $('#app')[0]
	canvas.width = width = maxX * scl
	canvas.height = height = maxY * scl
	ctx = canvas.getContext('2d')

	invaders_number = 30
	lives_left = 3

	level = 1
	score = 0
	bullets = []
	bullets_invaders = []
	invaders = []
	bullet_player_timer = 0

	for (let i = 0; i < invaders_number; i++)
		invaders.push(new Invader(i))
	
	player = new Player()

	gameLoop = setInterval(update, 1000 / fps)

	$(document).keydown((e) => {
		if(e.keyCode == KEY_R) //R - reset
			newGame()
		if(e.keyCode == KEY_LEFT)
			nextMove = 'l'
		if(e.keyCode == KEY_RIGHT)
			nextMove = 'r'
		if(e.keyCode == KEY_SPACE)
			shoot_check = true
	})

	$(document).keyup((e) => {
		if(e.keyCode == KEY_LEFT && nextMove == 'l')
			nextMove = null
		if(e.keyCode == KEY_RIGHT && nextMove == 'r')
			nextMove = null
		if(e.keyCode == KEY_SPACE)
			shoot_check = false
	})

	$('#resetGame').click(() => {
		newGame()
	})
}

$(document).ready(init)
