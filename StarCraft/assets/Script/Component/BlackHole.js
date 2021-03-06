/**
 * Blackhole
 * @author lijun
 **/
import Databus from 'Databus'
import FindMeteor from 'FindMeteor'
import MathUtil from 'MathUtil'
import TweenAlpha from "TweenAlpha"
import BGMConfig from "BGMConfig"
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
    	icon:cc.Sprite,
        id:0
    },

	onLoad(){
        
	},

	start() {
		// ResourceManager.LoadRemoteSprite(this.icon, ResConfig.BrokeIcon(databus.userInfo.maxStarId));
	},

    update() {
    	if (!this.is_valid || !FindMeteor.GetInstance().cdFinish) {
			return
    	}

		this.move()

    	if(FindMeteor.GetInstance().gameOver){
            FindMeteor.GetInstance().RemoveBlackHole(this);
            return;
		}

    	var planet = FindMeteor.GetInstance().GetPlanet()
    	if (MathUtil.HitTestWithBlendingScale(this.node, planet.node, 0.8, 1)) {
    		BGMConfig.BgmPlay(this.soundChnl)
			planet.ReduceLife()
			this.is_valid = false
			var tweenAlpha = TweenAlpha.begin(this.node, 255, 1, 0.2, 1)
            tweenAlpha.onFinishCallBack = function() {
            	FindMeteor.GetInstance().RemoveBlackHole(this)
            	FindMeteor.GetInstance().ReCreateBlackHoleCntAdd()
            }
    	}
    },

    Init(top, buttom, left, right) {
    	this.is_valid = false
    	this.timer = 0
    	this.soundChnl = BGMConfig.BgmInit(BGMConfig.GetBgm("hitBlackHole"))
    	var height = top - buttom
		var width = Math.abs(right - left)
		var planet = FindMeteor.GetInstance().GetPlanet();

		var iter = 0;
    	while (!this.is_valid && iter <= 2000) {
			var c = Math.floor(Math.random() * 100)
			this.node.x = left + (width * c / 100)
			c = Math.floor(Math.random() * 100)
			this.node.y = buttom + (height * c / 100)

			if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, left)) {
				this.node.x = left + this.node.width / 2 + 5	
			}

			if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, right)) {
				this.node.x = right - this.node.width / 2 - 5
			}

			if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, top)) {
				this.node.y = top - this.node.height / 2 - 5	
			}

			if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, buttom)) {
				this.node.y = buttom + this.node.height / 2 + 5	
			}

			iter++;
			if (MathUtil.HitTestWithBlendingScale(this.node, planet.node, 2.5, 1)) {
				continue;
			}
			this.is_valid = true;
    	}

		var positive = Math.floor(Math.random() * 10) % 2
		if (0 == positive) {
			this.speed_x = 1
		} else {
			this.speed_x = 0 - 1
		}

		positive = Math.floor(Math.random() * 10) % 2
    	if (0 == positive) {
			this.speed_y = 1
		} else {
			this.speed_y = 0 - 1
		}
		this.node.zIndex = 1
    },

    move() {
		this.node.x += this.speed_x
		this.node.y += this.speed_y

		var findMeteor = FindMeteor.GetInstance()

		if (MathUtil.LeftBoundaryHitTest(this.node.x - this.node.width / 2, databus.screenLeft)) {
			this.node.x = databus.screenLeft + this.node.width / 2
			this.speed_x = 0 - this.speed_x
		}

		if (MathUtil.RightBoundaryHitTest(this.node.x + this.node.width / 2, databus.screenRight)) {
			this.node.x = databus.screenRight - this.node.width / 2
			this.speed_x = 0 - this.speed_x
		}

		if (MathUtil.TopBoundaryHitTest(this.node.y + this.node.height / 2, findMeteor.gameTop)) {
			this.node.y = findMeteor.gameTop - this.node.height / 2
			this.speed_y = 0 - this.speed_y
		}

		if (MathUtil.ButtomBoundaryHitTest(this.node.y - this.node.height / 2, databus.screenButtom)) {
			this.node.y = databus.screenButtom + this.node.height / 2
			this.speed_y = 0 - this.speed_y
		}
    }
})


