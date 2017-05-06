class Apple {

	constructor(maxW, maxH) {
		this.maxW = maxW
		this.maxH = maxH
		this.color = 'green'
		this.x = Math.ceil(Math.random() * (this.maxW - 1))
		this.y = Math.ceil(Math.random() * (this.maxH - 1))

		console.log(this)
	}

	newPos() {
		this.x = Math.ceil(Math.random() * (this.maxW - 1))
		this.y = Math.ceil(Math.random() * (this.maxH - 1))
	}

	calc() {}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x * scl, this.y * scl, scl, scl)
	}

}