/**
 * FindMeteor
 * @auhor clairli
 */
import Databus from "Databus";
import MathUtil from "MathUtil"
import PrefabUtil from "PrefabUtil";
import Meteor from "Meteor"

let databus = new Databus()
let instance
export default class FindMeteor {
    constructor() {
        this.meteorList = new Array()
        this.blackholeList = new Array()
    }

    static GetInstance() {
        if (instance == null) {
            instance = new FindMeteor()
        }
        return instance
    }

	CreatePlanet() {
		this.loadRes("planet", function(instance) {
			var planet = instance.addComponent("planet")
			planet.init()
			this.planet = planet
		})
	}

	GetPlanet() {
		return this.planet
	}

	CreateMeteor(num) {
		var blockList = MathUtil.spliteScreenToBlock(num)

		//在每个分块里面随机出来一个流星
		var meteor = null
		for (var i = blockList.length - 1; i > 0; i--) {
			this.loadRes("meteor", function(instance) {
				meteor = instance.addComponent("meteor")
			})
			blocktmp = blockList[i]
			meteor.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
			this.meteorList.push(meteor)
		}
	}

    RemoveMeteor(meteor) {
        this.meteorList.splice(this.meteorList.indexOf(meteor), 1)
    }

    ClearAllMeteor() {
        for(var i = this.meteorList.length - 1; i >= 0; i--)
        {
            this.RemoveMeteor(this.meteorList[i]);
        }
    }

    CreateBlackHole(num) {
		var blockList = MathUtil.spliteScreenToBlock(num)

		var blackhole = null
		for (var i = blockList.length - 1; i > 0; i--) {
			this.loadRes("blackhole", function(instance) {
				blackhole = instance.addComponent("blackhole")
			})
			blocktmp = blockList[i]
			blackhole.Init(blocktmp.top, blocktmp.buttom, blocktmp.left, blocktmp.right)
			this.blackholeList.push(blackhole)
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
}

