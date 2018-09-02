/**
 * 寻找流星游戏场景
 * @author lijun
 **/
import Scene from 'Scene'
import Databus from 'Databus'
import ResourceManager from "ResourceManager"
import FindMeteor from "FindMeteor"
import ResConfig from 'ResConfig'
import BuffBase from 'BuffBase'
import LevelManager from 'LevelManager'
import SceneManager from 'SceneManager'
import GameMeteorCnt from "GameMeteorCnt"

let databus = new Databus()
cc.Class({
	extends: cc.Component,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        },
        bg:cc.Sprite,
        gameMeteor_bg:GameMeteorCnt,
        gameHpCon_bg:cc.Sprite,
    },

    onLoad() {
        SceneManager.GetInstance().SetRoot(this.node);
        this.gameMeteor_bg.Init(ResConfig.MeteorConBg())
        //this.gameHpCon_bg.Init(ResConfig.GameHpConBg())
    	//加载流星平原背景
        //ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        var param = new LevelManager().CurrentLevelParam
        this.findMeteor = FindMeteor.GetInstance()
        var that = this
        this.findMeteor.CreatePlanet(this, function(){
            that.findMeteor.CreateMeteor(that, 5);
            /*var blackholeNum = param["level"] * 2 + 3
            if (blackholeNum > 9) {
                blackholeNum = 9
            }*/
            that.findMeteor.CreateBlackHole(that, 3);
        });
        
    },

    update() {
        BuffBase.Update();

        if (this.findMeteor.GetReCreateBlackHoleCnt() > 0) {
			this.findMeteor.CreateBlackHole(this, 1)
			this.findMeteor.ReCreateBlackHoleCntDel()
        }
    },

    onDestroy() {

    },

    start() {
    }
})    

