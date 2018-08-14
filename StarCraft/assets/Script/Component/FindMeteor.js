/**
 * FindMeteor
 * @auhor clairli
 */
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

	spliteScreenToBlock(num) {
		//假设屏幕的坐标原点在屏幕底部正中间
		var block = {top:databus.screenHeight, left:(0 - databus.screenWidth / 2), right:(databus.screenWidth / 2), buttom:0}
		var blockList = new Array()
		var blocktmp = null
		blockList.push(block)

		while (blockList.length < num) {
			var blockout = blockList.splice(0, 1)
			blocktmp = blockout[0]
			if (blocktmp.top - blocktmp.buttom > blocktmp.right - blocktmp.left) {
				//橫着分
				var new1 = {top:blocktmp.top, left:blocktmp.left, right:blocktmp.right, buttom:(blocktmp.top / 2)}
				var new2 = {top:blocktmp.top / 2, left:blocktmp.left, right:blocktmp.right, buttom:blocktmp.buttom}
				blockList.push(new1)
				blockList.push(new2)
			} else {
				//竖着分
				var new1 = {top:blocktmp.top, left:blocktmp.left, right:((Math.abs(blocktmp.right) - Math.abs(blocktmp.left)) / 2), buttom:blocktmp.buttom}
				var new2 = {top:blocktmp.top, left:((Math.abs(blocktmp.right) - Math.abs(blocktmp.left)) / 2), right:blocktmp.right, buttom:blocktmp.buttom}
				blockList.push(new1)
				blockList.push(new2)
			}
		}

		return blockList
	}

	CreateMeteor(num) {
		var blockList = this.spliteScreenToBlock(num)

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
		var blockList = this.spliteScreenToBlock(num)

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

