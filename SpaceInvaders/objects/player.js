class Player {

	constructor() {

		this.width = 5
		this.height = 5
		this.color = 'white'
		this.x = maxX / 2
		this.y = maxY - 5
		this.vx = 0
		this.vy = 0
    }

    shoot() {
    	return new BulletPlayer(this.x + 2, this.y + 1)
    }

    movePlayer(x) {
    	if(x == 1) {
    		this.x++
    		if((this.x + this.width) > maxX){
    			this.x = maxX - this.width
    		}
    	} else if(x == -1) {
    		this.x--
    		if((this.x) < 0){
    			this.x = 0
    		}
    	}
    }

    move(dir) {
    	switch(dir) {
    		case 'l':
    			this.movePlayer(-1)
    			break
    		case 'r':
    			this.movePlayer(1)
    			break
    		default:
    			break
    	}
    }

    draw() {
    	ctx.fillStyle = this.color
		ctx.fillRect((this.x + 2) * scl, (this.y + 0) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 1) * scl, scl, scl)
		ctx.fillRect((this.x + 2) * scl, (this.y + 1) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 1) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 2) * scl, scl, scl)
		ctx.fillRect((this.x + 2) * scl, (this.y + 2) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 2) * scl, scl, scl)

		ctx.fillRect((this.x + 1) * scl, (this.y + 3) * scl, scl, scl)
		ctx.fillRect((this.x + 3) * scl, (this.y + 3) * scl, scl, scl)

		ctx.fillRect((this.x + 0) * scl, (this.y + 4) * scl, scl, scl)
		ctx.fillRect((this.x + 4) * scl, (this.y + 4) * scl, scl, scl)
    }
}