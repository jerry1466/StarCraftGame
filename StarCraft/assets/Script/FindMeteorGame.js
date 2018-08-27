/**
 * 寻找流星游戏场景
 * @author lijun
 **/
import Scene from 'Scene'
import Databus from 'Databus'
import ResourceManager from "ResourceManager";
import FindMeteor from "FindMeteor";
import ResConfig from 'ResConfig';
import BuffBase from 'BuffBase'
import LevelManager from 'LevelManager'
import SceneManager from 'SceneManager'

let databus = new Databus()
cc.Class({
	extends: cc.Component,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        },
        bg:cc.Sprite,
    },

    onLoad() {
    	console.log("FindMeteorGame onLoad")
        SceneManager.GetInstance().SetRoot(this.node);
    	//加载流星平原背景
        //ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        var param = new LevelManager().CurrentLevelParam
        this.findMeteor = FindMeteor.GetInstance()
        this.findMeteor.CreatePlanet(this)
        this.findMeteor.CreateMeteor(this, 10)
       	/*var blackholeNum = param["level"] * 2 + 3
        if (blackholeNum > 9) {
			blackholeNum = 9
        }
        this.findMeteor.CreateBlackHole(5)*/
    },

    update() {
        BuffBase.Update();
    },

    onDestroy() {

    },

    start() {
    }
})    

