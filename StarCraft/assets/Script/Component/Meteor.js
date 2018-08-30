/**
 * Meteor
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

		var planet = FindMeteor.GetInstance().GetPlanet()
		if (MathUtil.HitTestWithScale(this.node, planet.node)) {
			console.log("meteor hit")
			this.is_valid = false
			FindMeteor.GetInstance().RemoveMeteor(this)
			planet.GetOneMeteor()
		}
    },

    Init(top, buttom, left, right) {
    	//console.log("meteor init top:", top, "buttom:", buttom, "left:", left, "right:", right)
    	this.is_valid = false
    	var height = top - buttom
		var width = Math.abs(right - left)
		var planet = FindMeteor.GetInstance().GetPlanet()
		//console.log("meteor init height:", height, "width:", width)
    	while (!this.is_valid) {
			var c = Math.floor(Math.random() * 100)
			this.node.x = left + width * c / 100
			//console.log("meteor init x:", this.node.x, "c:", c)
			c = Math.floor(Math.random() * 100)
			this.node.y = buttom + height * c / 100
			//console.log("meteor init y:", this.node.y, "c:", c)
			//console.log("meteor init node.width", this.node.width)
			//console.log("meteor init node.height", this.node.height)
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

    	this.node.zIndex = 10
    },
})


