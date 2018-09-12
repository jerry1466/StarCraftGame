/**
 * Meteor
 * @author lijun
 **/
import Databus from 'Databus'
import FindMeteor from 'FindMeteor'
import MathUtil from 'MathUtil'
import BGMConfig from "BGMConfig"
import EventUtil from "EventUtil";
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
        // ResourceManager.LoadRemoteSprite(this.icon, ResConfig.MeteorIcon());
	},

    update() {
    	if (!this.is_valid || !FindMeteor.GetInstance().cdFinish) {
			return
    	}

		var findMeteor = FindMeteor.GetInstance()
        if(findMeteor.gameOver){
            findMeteor.RemoveMeteor(this)
            return;
        }

		var planet = findMeteor.GetPlanet()
		if (MathUtil.HitTestWithScale(this.node, planet.node)) {
			this.is_valid = false
			BGMConfig.BgmPlay(this.soundChnl)
			EventUtil.GetInstance().DispatchEvent("CatchMeteor", this)
            planet.GetOneMeteor()
		}
    },

    Init(top, buttom, left, right) {
    	this.is_valid = false
    	this.soundChnl = BGMConfig.BgmInit(BGMConfig.GetBgm("collectMeteor"))
    	var height = top - buttom
		var width = Math.abs(right - left)
		var planet = FindMeteor.GetInstance().GetPlanet()
    	while (!this.is_valid) {
			var c = Math.floor(Math.random() * 100)
			this.node.x = left + width * c / 100
			c = Math.floor(Math.random() * 100)
			this.node.y = buttom + height * c / 100
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

			if (MathUtil.HitTestWithScale(this.node, planet.node)) {
				continue;
			}
			this.is_valid = true;
    	}

    	this.node.zIndex = 10
    },
})


