/**
 * Planet
 * @author lijun
 **/
import Databus from 'Databus'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        id:0
    },

    update() {
		if (!this.is_valid)
			return

		if (this.life <= 0) {
			this.is_valid = false
		}
		
    },

    Init() {
    	this.node.x = 0
    	this.node.y = databus.screenHeight / 2
    	this.is_valid = true
		this.life = 3
		this.meteorNum = 0
    },

    GetMeteor() {
		this.meteorNum += 1
    }
})    

