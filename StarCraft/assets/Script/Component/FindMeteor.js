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
    }

    static GetInstance() {
        if (instance == null) {
            instance = new FindMeteor()
        }
        return instance
    }

	CreatePlanet(component) {
		console.log("createplanet")
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
		console.log("createMeteor Height:", databus.screenHeight, "Width:", databus.screenWidth)
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
    }

    ClearAllMeteor() {
        for(var i = this.meteorList.length - 1; i >= 0; i--)
        {
            this.RemoveMeteor(this.meteorList[i])
        }
    }

    CreateBlackHole(num) {
		var blockList = MathUtil.spliteScreenToBlock(num)

		var blackhole = null
		var _this = this
		for (var i = blockList.length - 1; i > 0; i--) {
			this.loadRes("blackhole", function(instance) {
				blackhole = instance.addComponent("blackhole")
			})
			var blocktmp = blockList[i]
			blackhole.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
			_this.blackholeList.push(blackhole)
		}
    }

	
	RemoveBlackHole(blackhole) {
		this.blackholeList.splice(this.blackholeList.indexOf(blackhole), 1)
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

