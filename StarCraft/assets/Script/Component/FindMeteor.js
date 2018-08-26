/**
 * FindMeteor
 * @auhor clairli
 */
import Databus from "Databus";
import MathUtil from "MathUtil"
import PrefabUtil from "PrefabUtil";
import Meteor from "Meteor"
import ModuleManager from "ModuleManager"

let databus = new Databus()
let instance
export default class FindMeteor {
    constructor() {
        this.meteorList = new Array()
        this.blackholeList = new Array()
        this.gameOver = false
    }

    static GetInstance() {
        if (instance == null) {
            instance = new FindMeteor()
        }
        return instance
    }

	CreatePlanet() {
		var _this = this
		this.loadRes("planet", function(instance) {
			var planet = instance.addComponent("planet")
			planet.init()
			_this.planet = planet
		})
	}

	GetPlanet() {
		return this.planet
	}

	CreateMeteor(num) {
		var blockList = MathUtil.spliteScreenToBlock(data.screenHeight, data,screenWidth, num)

		//在每个分块里面随机出来一个流星
		var meteor = null
		var _this = this
		for (var i = blockList.length - 1; i > 0; i--) {
			this.loadRes("meteor", function(instance) {
				meteor = instance.addComponent("meteor")
			})
			blocktmp = blockList[i]
			meteor.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
			_this.meteorList.push(meteor)
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
			blocktmp = blockList[i]
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

