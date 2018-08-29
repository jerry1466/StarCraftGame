/**
 * Blackhole
 * @author lijun
 **/
import Databus from 'Databus'
import FindMeteor from 'FindMeteor'
import MathUtil from 'MathUtil'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        id:0
    },

    update() {
    	if (!this.is_valid) {
			return
    	}

    	this.move()

    	var planet = FindMeteor.GetInstance().GetPlanet()
    	//if (MathUtil.HitTest(this, planet)) {
			//planet.ReduceLife()
    	//}
    },

    Init(top, buttom, left, right) {
    	console.log("black hole init left:", databus.screenLeft, "right:", databus.screenRight, "top:", databus.screenTop, "buttom:", databus.screenButtom)
    	this.is_valid = false
    	var height = top - buttom
		var width = Math.abs(right - left)
		var planet = FindMeteor.GetInstance().GetPlanet()

    	while (!this.is_valid) {
			var c = Math.floor(Math.random() * 100)
			this.node.x = left + (width * c / 100)
			c = Math.floor(Math.random() * 100)
			this.node.y = buttom + (height * c / 100)

			if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, left)) {
				this.node.x = left + this.node.width / 2 + 10	
			}

			if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, right)) {
				this.node.x = right - this.node.width / 2 - 10
			}

			if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, top)) {
				this.node.y = top - this.node.height / 2 - 10	
			}

			if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, buttom)) {
				this.node.y = buttom + this.node.height / 2 + 10	
			}

			if (MathUtil.HitTest(this.node, planet.node)) {
				continue;
			}
			this.is_valid = true;
    	}

		var positive = Math.floor(Math.random() * 10) % 2
		if (0 == positive) {
			this.speed_x = Math.floor(Math.random() * 10) % 1 + 1
		} else {
			this.speed_x = 0 - (Math.floor(Math.random() * 10) % 1 + 1)
		}

		positive = Math.floor(Math.random() * 10) % 2
    	if (0 == positive) {
			this.speed_y = Math.floor(Math.random() * 10) % 1 + 1
		} else {
			this.speed_y = 0 - (Math.floor(Math.random() * 10) % 1 + 1)
		}
		this.node.zIndex = 1
    },

    move() {
		this.node.x += this.speed_x
		this.node.y += this.speed_y

		if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, databus.screenLeft)) {
			this.node.x = databus.screenLeft + this.node.width / 2
			this.speed_x = 0 - this.speed_x
		}

		if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, databus.screenRight)) {
			this.node.x = databus.screenRight - this.node.width / 2
			this.speed_x = 0 - this.speed_x
		}

		if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, databus.screenTop)) {
			this.node.y = databus.screenTop - this.node.height / 2
			this.speed_y = 0 - this.speed_y
		}

		if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, databus.screenButtom)) {
			this.node.y = databus.screenButtom + this.node.height / 2
			this.speed_y = 0 - this.speed_y
		}
    }
})


