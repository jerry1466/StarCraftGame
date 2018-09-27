/**
 * FindMeteor
 * @auhor clairli
 */
import Databus from "Databus";
import MathUtil from "MathUtil"
import PrefabUtil from "PrefabUtil";
import Meteor from "Meteor"
import ModuleManager from "ModuleManager"
import LevelManager from "LevelManager"

let databus = new Databus()
let instance
export default class FindMeteor {
    constructor() {
        this.meteorList = new Array()
        this.blackholeList = new Array()
        this.gameOver = false
        this.meteorList = new Array()
        this.ReBlackHoleCnt = 0
        this.gameTop = 0
        this.gameButtom = 0
        this.gameLeft = 0
        this.gameRight = 0
        this.cdFinish = false
    }

    static GetInstance() {
        if (instance == null) {
            instance = new FindMeteor()
        }
        return instance
    }

    Destroy(){
    	this.gameOver = false;
        this.totalCollectMeteor = 0;
	}

	CreatePlanet(component, callback) {
		var _this = this
		
		this.loadRes("Planet", function(instance) {
			var planet = instance.addComponent("Planet")
			planet.Init()
			_this.planet = planet
			component.node.addChild(instance);
			callback();
		})
	}

	GetPlanet() {
		return this.planet
	}

	CreateMeteor(component, num) {
		var blockList = MathUtil.spliteScreenToBlock(this.gameTop - this.gameButtom, this.gameRight - this.gameLeft, num)
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
        this.meteorList.splice(this.meteorList.indexOf(meteor), 1);
        meteor.node.removeFromParent(true)
        meteor.node.destroy()
		if(this.meteorList.length == 0) {
        	this.GameOver();
		}
    }

    ClearAllMeteor() {
        for(var i = this.meteorList.length - 1; i >= 0; i--)
        {
            this.RemoveMeteor(this.meteorList[i])
        }
    }

    CreateBlackHole(component, num) {
		var blockList = MathUtil.spliteScreenToBlock(this.gameTop - this.gameButtom, this.gameRight - this.gameLeft, num)

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

	ChangeBlackHoleSpeed() {
		for (var i = this.blackholeList.length - 1; i >= 0; i--) {
			if (this.blackholeList[i].speed_x >= 0) {
				this.blackholeList[i].speed_x += 0.5
			} else {
				this.blackholeList[i].speed_x -= 0.5
			}

			if (this.blackholeList[i].speed_y >= 0) {
				this.blackholeList[i].speed_y += 0.5
			} else {
				this.blackholeList[i].speed_y -= 0.5
			}
		}
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

    AddCollectMeteor(meteorNum){
    	if(this.totalCollectMeteor == null)
		{
            this.totalCollectMeteor = 0;
		}
        this.totalCollectMeteor += meteorNum;
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
    	if(this.gameOver)
		{
			return;
		}
        this.gameOver = true;
        // ModuleManager.GetInstance().ShowModule("GameResultPanel", this.totalCollectMeteor)
        ModuleManager.GetInstance().ShowModule("MeteorSettleBox", {title:"游戏结束", meteorNum:this.totalCollectMeteor, callback:function(){
			new LevelManager().SwitchLevel("maze");
		}});
    }
}

