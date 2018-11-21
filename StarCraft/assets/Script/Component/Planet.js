/**
 * Planet
 * @author lijun
 **/
import Databus from 'Databus'
import EventUtil from 'EventUtil'
import MathUtil from 'MathUtil'
import FindMeteor from 'FindMeteor'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus();
cc.Class({
    extends: cc.Component,
    properties: {
    	icon:cc.Sprite
    },

	onLoad(){
		this.icon = this.node.getComponent(cc.Sprite);
    	ResourceManager.LoadRemoteSprite(this.icon, ResConfig.GetStarIcon(databus.userInfo.curStarId));
        EventUtil.GetInstance().DispatchEvent("HpChange", this.life);
	},

    update() {
		if (!this.is_valid || !FindMeteor.GetInstance().cdFinish)
			return;

        if(FindMeteor.GetInstance().gameOver){
            this.node.removeFromParent();
            return;
        }

		if (this.life <= 0) {
			this.is_valid = false;
			console.log("Game over");
            this.node.parent.off(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler);
            this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
            this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
            this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
			FindMeteor.GetInstance().GameOver();
		}
    },

    Init() {
    	this.node.x = 0;
    	this.node.y = 0;
    	this.is_valid = true;
		this.life = databus.gameMaxHp;
		this.node.zIndex = 50;

		this.onTouchStartHandler = this.onTouchStart.bind(this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler)
    },

    onTouchStart(event) {
    	if(FindMeteor.GetInstance().cdFinish)
		{
            this.startX = event.getLocation().x;
            this.startY = event.getLocation().y;
            this.onTouchMoveHandler = this.onTouchMove.bind(this);
            this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
            this.onTouchEndHandler = this.onTouchEnd.bind(this);
            this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
            this.onTouchCancelHandler = this.onTouchCancel.bind(this);
            this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler)
		}
    },

	onTouchMove(event) {
    	this.moveX = event.getLocation().x;
    	this.moveY = event.getLocation().y;
    	this.setPosition(this.moveX - this.startX, this.moveY - this.startY);
        this.startX = this.moveX;
        this.startY = this.moveY;
	},

	onTouchEnd(event) {
		this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
		this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
		this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
		this.startX = 0;
		this.StartY = 0;
	},

	onTouchCancel(event) {
		this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
		this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
		this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
		this.startX = 0;
		this.StartY = 0;
	},

    GetOneMeteor() {
		this.node.scaleX += 0.03;
		this.node.scaleY += 0.03;
    },

	ReduceLife() {
		this.life -= 1;
        EventUtil.GetInstance().DispatchEvent("HpChange", this.life);
	},

	setPosition(x, y) {
		this.node.x += x;
		this.node.y += y;

		var width = this.node.width * this.node.scaleX;
		var height = this.node.height * this.node.scaleY;
		var findMeteor = FindMeteor.GetInstance();

		if (MathUtil.LeftBoundaryHitTest(this.node.x - width / 2, findMeteor.gameLeft)) {
			this.node.x = findMeteor.gameLeft + width / 2
		}

		if (MathUtil.RightBoundaryHitTest(this.node.x + width / 2, findMeteor.gameRight)) {
			this.node.x = findMeteor.gameRight - width / 2
		}

		if (MathUtil.TopBoundaryHitTest(this.node.y + height / 2, findMeteor.gameTop)) {
			this.node.y = findMeteor.gameTop - height / 2
		}

		if (MathUtil.ButtomBoundaryHitTest(this.node.y - height / 2, findMeteor.gameButtom)) {
			this.node.y = findMeteor.gameButtom + height / 2
		}
	}
})    

