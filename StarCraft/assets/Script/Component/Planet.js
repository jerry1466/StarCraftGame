/**
 * Planet
 * @author lijun
 **/
import Databus from 'Databus'
import EventUtil from 'EventUtil'
import MathUtil from 'MathUtil'
import FindMeteor from 'FindMeteor'

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

		var _this = this
        EventUtil.GetInstance().AddEventListener("CANVAS_TOUCH_START", function(x:number, y:number){
			//here x refers to e.touch._point.x
			_this.setPosition(x, y);
		})

		EventUtil.GetInstance().AddEventListener("CANVAS_TOUCH_MOVE", function(x:number, y:number){
			//here x refers to e.touch._point.x
			_this.setPosition(x, y);
		})
    },

    GetOneMeteor() {
		this.meteorNum += 1
    }

	ReduceLife() {
		this.lift -= 1
	}

	setPosition(x, y) {
		this.node.x = x
		this.node.y = y

		if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, databus.screenLeft)) {
			this.node.x = databus.screeLeft + this.node.width / 2
		}

		if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, databus.screenRight)) {
			this.node.x = databus.screenRight - this.node.width / 2
		}

		if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, databus.screenTop)) {
			this.node.y = databus.screenTop - this.node.height / 2
		}

		if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, databus.screenButtom)) {
			this.node.y = databus.screenButtom + this.node.height / 2
		}
	}
})    

