class BulletInvader {

	constructor(strX, strY) {
		this.color = 'red'
		this.x = strX
		this.y = strY
		this.vy = 1
		this.waitTime = 2
		this.currentWait = 0
    }

    calc() {
    	this.currentWait++

    	if(this.currentWait < this.waitTime)
    		return false
    	else
    		this.currentWait = 0

    	this.y = this.y + this.vy
    }

    draw() {
    	ctx.fillStyle = this.color
		ctx.fillRect((this.x + 0) * scl, (this.y + 0) * scl, scl, scl)
		ctx.fillRect((this.x + 0) * scl, (this.y + 1) * scl, scl, scl)
    }

    checkColision() {

    	return new Promise((mainRes, mainRej) => {
    		if(this.y > maxY)
	    		mainRes(true)
	    	else {
				let left = player.x + 1
		    	let right = player.x + player.width - 2 
		    	let top = player.y - 1
		    	let bottom = player.y + player.height

		    	if(this.x <= right && this.x >= left && this.y <= bottom && this.y >= top) {
		    		lives_left--
					mainRes(true)
				} else {
					mainRes(false)
				}
		    }
    	})
    	
    }
}