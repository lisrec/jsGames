class Invader {

	constructor(num = 0) {

		this.width = 6
		this.height = 5

		let positions = this.calcPos(num)

		this.color_arr = ['red', 'yellow', 'cyan', 'chartreuse', 'Magenta']
		this.color = this.color_arr[ Math.floor( (Math.random() * 10) % (this.color_arr.length) ) ]
		this.x = positions.x
		this.y = positions.y
		this.vx = 1
		this.gameOver = false
		this.waitTime = (7 - level) < 0 ? 0 : (7 - level)
		this.currentWait = 0
        this.min_shoot_speed = 20
        this.max_shoot_speed = (550 - (level*50)) < 60 ? 60 : (550 - (level*50))
        this.shoot_time = this.randomTime()
    }

    statusGameOver() {
    	return this.gameOver
    }

    randomTime() {
        return Math.floor(Math.random() * (this.max_shoot_speed-this.min_shoot_speed+1) + this.min_shoot_speed)
    }

    shoot() {
        bullets_invaders.push(new BulletInvader(this.x + 3, this.y + 1))
    }

    calc() {
    	this.currentWait++
        this.shoot_time--

    	if(this.currentWait < this.waitTime)
    		return false
    	else
    		this.currentWait = 0

        if(this.shoot_time < 0) {
            this.shoot()
            this.shoot_time = this.randomTime()
        }
        

    	this.x = this.x + this.vx

    	if( ((this.x + this.width) > maxX) || (this.x < 0) ) {
    		this.vx = (this.vx * -1)
    		this.y = this.y + this.height
    	}

    	if(this.y > (maxY - (this.height * 2))){
    		this.gameOver = true
        }
    }

    calcPos(num) {
    	let pos = {
    		x: 2,
    		y: 20
    	}

    	let inline = maxX / (this.width + 2)

    	pos.x = (num * (this.width + 2)) % maxX
    	pos.y = Math.floor( ((num * (this.width + 2)) / maxX)) * (this.height + 2) + 3

    	return pos
    }

    draw() {
    	ctx.fillStyle = this.color
		ctx.fillRect((this.x + 2) * scl, (this.y + 0) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 0) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 1) * scl, scl, scl)
		ctx.fillRect((this.x + 2) * scl, (this.y + 1) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 1) * scl, scl, scl)
		ctx.fillRect((this.x + 4) * scl, (this.y + 1) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 2) * scl, scl, scl)
		ctx.fillRect((this.x + 4) * scl, (this.y + 2) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 3) * scl, scl, scl)
		ctx.fillRect((this.x + 2) * scl, (this.y + 3) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 3) * scl, scl, scl)
		ctx.fillRect((this.x + 4) * scl, (this.y + 3) * scl, scl, scl)

		ctx.fillRect((this.x + 0) * scl, (this.y + 4) * scl, scl, scl)
		ctx.fillRect((this.x + 5) * scl, (this.y + 4) * scl, scl, scl)

    }

}