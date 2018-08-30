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
			FindMeteor.GetInstance().GameOver()
		}
    },

    Init() {
    	console.log("planet init")
    	this.node.x = 0
    	this.node.y = 0
    	this.is_valid = true
		this.life = 3
		this.meteorNum = 0

		this.onTouchStartHandler = this.onTouchStart.bind(this)
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler)
    },

    onTouchStart(event) {
    	this.startX = event.getLocation().x
    	this.startY = event.getLocation().y
    	this.onTouchMoveHandler = this.onTouchMove.bind(this)
    	this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler)
		this.onTouchEndHandler = this.onTouchEnd.bind(this);
		this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler)
		this.onTouchCancelHandler = this.onTouchCancel.bind(this)
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler)

    },

	onTouchMove(event) {
    	this.setPosition(event.getLocation())
	},

	onTouchEnd(event) {
		this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler)
		this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler)
		this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler)
		this.startX = 0
		this.StartY = 0
	},

	onTouchCancel(event) {
		this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler)
		this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler)
		this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler)
		this.startX = 0
		this.StartY = 0
	},

    GetOneMeteor() {
		this.meteorNum += 1
    },

    GetMeteorNum() {
		return this.meteorNum
    },

	ReduceLife() {
		this.life -= 1
	},

	setPosition(position) {
		this.node.x += position.x - this.startX
		this.node.y += position.y - this.startY
		this.startX = position.x
		this.startY = position.y

		var width = this.node.width * this.node.scaleX
		var height = this.node.height * this.node.scaleY

		if (MathUtil.LeftBoundaryHitTest(this.node.x - width / 2, databus.screenLeft)) {
			this.node.x = databus.screenLeft + width / 2
		}

		if (MathUtil.RightBoundaryHitTest(this.node.x + width / 2, databus.screenRight)) {
			this.node.x = databus.screenRight - width / 2
		}

		if (MathUtil.TopBoundaryHitTest(this.node.y + height / 2, databus.screenTop)) {
			this.node.y = databus.screenTop - height / 2
		}

		if (MathUtil.ButtomBoundaryHitTest(this.node.y - height / 2, databus.screenButtom)) {
			this.node.y = databus.screenButtom + height / 2
		}
	}
})    

