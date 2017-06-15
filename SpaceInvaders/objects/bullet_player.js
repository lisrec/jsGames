class BulletPlayer {

	constructor(strX, strY) {
		this.color = 'white'
		this.x = strX
		this.y = strY
		this.vy = -1
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
    		if(this.y < 0)
	    		mainRes(true)
	    	else {
	    		let resp = false
		    	let p = new Promise((resolve, reject) => {
		    		invaders.forEach((obj, index) => {
			    		if(resp) return resp

			    		let left = obj.x + 1
			    		let right = obj.x + obj.width - 2
			    		let top = obj.y + 1
			    		let bottom = obj.y + obj.height - 1

			    		if(this.x <= right && this.x >= left && this.y <= bottom && this.y >= top) {
			    			invaders.splice(index, 1)
			    			score += (10 * level)
			    			resp = true; 
			    			resolve(resp)
			    			return true
			    		} else if(index == (invaders.length-1)) {
			    			resolve(resp)
			    		}
			    	})
			    })

			    p.then(resp => { mainRes(resp) })
		    }
    	})
    	
    }
}