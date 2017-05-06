class Snake {

	constructor() {
		this.color = 'white'
		this.x = 5
		this.y = 3
		this.vx = 1
		this.vy = 0
		this.direction = 'right'
		this.length = 0
		this.tail = []

		console.log(this)
    }

	calc() {

		if(this.eat()) {
			this.length++
			this.tail.push({
				x: this.x,
				y: this.y
			})
			apple.newPos()
		} else if(this.length > 0) {

			for(let i = 0; i < (this.length-1); i++)
				this.tail[i] = this.tail[i+1]

			this.tail[this.length-1] = {
				x: this.x,
				y: this.y
			}
		}

		this.x = this.x + (this.vx)
		this.y = this.y + (this.vy)
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x * scl, this.y * scl, scl, scl)

		for(let i = 0; i < this.length; i++) {
			if(this.tail[i]) {
				ctx.fillStyle = this.color
				ctx.fillRect(this.tail[i].x * scl, this.tail[i].y * scl, scl, scl)
			}
		}
	}

	eat() {
		if(this.x == apple.x && this.y == apple.y)
			return true
		else
			return false
	}

	death() {
		for(let i = 0; i < this.length; i++)
			if(this.x == this.tail[i].x && this.y == this.tail[i].y)
				return true

		return false
	}

	move(dir) {
		switch(dir) {
			case 37: //left
				if( this.direction == 'right' && this.length ) 
					break
				this.direction = 'left'
				this.vx = -1
				this.vy = 0
				break

			case 38: //up
				if( this.direction == 'down' && this.length ) 
					break
				this.direction = 'up'
				this.vx = 0
				this.vy = -1
				break

			case 39: //right
				if( this.direction == 'left' && this.length ) 
					break
				this.direction = 'right'
				this.vx = 1
				this.vy = 0
				break
				
			case 40: //down
				if( this.direction == 'up' && this.length ) 
					break
				this.direction = 'down'
				this.vx = 0
				this.vy = 1
				break
		}
	}
}