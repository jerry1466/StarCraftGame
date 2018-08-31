/**
 * FindMeteor
 * @auhor clairli
 */
import Databus from "Databus";
import MathUtil from "MathUtil"
import PrefabUtil from "PrefabUtil";
import Meteor from "Meteor"
import ModuleManager from "ModuleManager"
import SceneManager from "SceneManager"


let databus = new Databus()
let instance
export default class FindMeteor {
    constructor() {
        this.meteorList = new Array()
        this.blackholeList = new Array()
        this.gameOver = false
        this.meteorList = new Array()
        this.ReBlackHoleCnt = 0
    }

    static GetInstance() {
        if (instance == null) {
            instance = new FindMeteor()
        }
        return instance
    }

	CreatePlanet(component) {
		var _this = this
		this.loadRes("Planet", function(instance) {
			var planet = instance.addComponent("Planet")
			planet.Init()
			_this.planet = planet
			component.node.addChild(instance)
		})
	}

	GetPlanet() {
		return this.planet
	}

	CreateMeteor(component, num) {
		var blockList = MathUtil.spliteScreenToBlock(databus.screenHeight, databus.screenWidth, num)

		//在每个分块里面随机出来一个流星
		var meteor = null
		var _this = this
		for (let i = blockList.length - 1; i >= 0; i--) {
			this.loadRes("Meteor", function(instance) {
				meteor = instance.addComponent("Meteor")
				component.node.addChild(instance)
				var blocktmp = blockList[i]
				meteor.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
				_this.meteorList.push(meteor)
			})
			
		}
	}

    RemoveMeteor(meteor) {
        this.meteorList.splice(this.meteorList.indexOf(meteor), 1)
        meteor.node.removeFromParent(true)
        meteor.node.destroy()
    }

    ClearAllMeteor() {
        for(var i = this.meteorList.length - 1; i >= 0; i--)
        {
            this.RemoveMeteor(this.meteorList[i])
        }
    }

    CreateBlackHole(component, num) {
		var blockList = MathUtil.spliteScreenToBlock(databus.screenHeight, databus.screenWidth, num)

		var blackhole = null
		var _this = this
		for (let i = blockList.length - 1; i >= 0; i--) {
			this.loadRes("BlackHole", function(instance) {
				blackhole = instance.addComponent("BlackHole")
				component.node.addChild(instance)
				var blocktmp = blockList[i]
				blackhole.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
				_this.blackholeList.push(blackhole)
			})
			
		}
    }

	ReCreateBlackHoleCntAdd() {
		this.ReBlackHoleCnt += 1
	}

	ReCreateBlackHoleCntDel() {
		this.ReBlackHoleCnt -= 1
	}

	GetReCreateBlackHoleCnt() {
		return this.ReBlackHoleCnt
	}
	
	RemoveBlackHole(blackhole) {
		this.blackholeList.splice(this.blackholeList.indexOf(blackhole), 1)
		blackhole.node.removeFromParent(true)
		blackhole.node.destroy()
	}
    
	ClearAllBlackHole() {
		for(var i = this.blackholeList.length - 1; i >= 0; i--)
		{
			this.RemoveBlackHole(this.blackholeList[i]);
		}
	}

    loadRes(resName, callback) {
        PrefabUtil.GetPrefabInstance(resName, function(success, instance){
            if(success)
            {
                if(callback != null)
                {
                    callback(instance)
                }
            }
        })
    }

    GameOver() {
		this.gameOver = true
    }

    IsGameOver() {
		return this.gameOver
    }

    ShowResult(win) {
		ModuleManager.GetInstance().ShowModule("GameResultPanel", true)
    }
}

