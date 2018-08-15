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
		if (MathUtil.HitTest(this, planet)) {
			this.is_valid = false
			FindMeteor.GetInstance().RemoveMeteor(this)
			planet.GetOneMeteor()
		}
    },

    Init(top, buttom, left, right) {
    	this.is_valid = false
    	var height = top - buttom
		var width = Math.abs(right - left)
		var planet = FindMeteor.GetPlanet()

    	while (!this.is_valid) {
			var c = Math.floor(Math.random() * 100)
			this.node.x = buttom + (height * c / 100)
			c = Math.floor(Math.random() * 100)
			this.node.y = left + (width * c / 100)

			if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, left)) {
				this.node.x = left + this.node.width / 2 + 1	
			}

			if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, right)) {
				this.node.x = right - this.node.width / 2 - 1	
			}

			
			if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, top)) {
				this.node.y = top - this.node.height / 2 - 1	
			}

			if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, buttom)) {
				this.node.y = buttom + this.node.height / 2 + 1	
			}

			if (MathUtil.HitTest(this, planet)) {
				continue;
			}
			this.is_valid = true;
    	}
    },
})


