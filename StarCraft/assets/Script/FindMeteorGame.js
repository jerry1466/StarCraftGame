/**
 * 寻找流星游戏场景
 * @author lijun
 **/
import EventUtil from 'EventUtil'
import Databus from 'Databus'
import ResourceManager from "ResourceManager"
import FindMeteor from "FindMeteor"
import ResConfig from 'ResConfig'
import LevelManager from 'LevelManager'
import SceneManager from 'SceneManager'
import GameHpCon from "GameHpCon"
import Coin from "Coin"
import StarConfig from "StarConfig";
import TweenPosition from "TweenPosition";

let databus = new Databus()
cc.Class({
	extends: cc.Component,
    properties: {
        bgm: {
            default: null,
            type: cc.AudioSource
        },
        bg:cc.Sprite,
        gameMeteorCon:Coin,
        gameHpCon:GameHpCon,
    },

    onLoad() {
    	console.log("game start")
        SceneManager.GetInstance().SetRoot(this.node);
        this.gameMeteorCon.Init(ResConfig.MeteorConBg());
        this.gameHpCon.Init(ResConfig.GameHpConBg());
    	//加载流星平原背景
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        //var param = new LevelManager().CurrentLevelParam
        this.findMeteor = FindMeteor.GetInstance()
        //根据生命值的框计算出游戏场景最上沿的坐标
        this.findMeteor.gameTop = this.gameHpCon.node.y - this.gameHpCon.node.height / 2 - 5
        this.findMeteor.gameButtom = 0 - this.findMeteor.gameTop
        this.findMeteor.gameRight = databus.screenRight - 17
        this.findMeteor.gameLeft = 0 - this.findMeteor.gameRight

        var that = this
        this.findMeteor.CreatePlanet(this, function(){
            that.findMeteor.CreateMeteor(that, 5);
            /*var blackholeNum = param["level"] * 2 + 3
            if (blackholeNum > 9) {
                blackholeNum = 9
            }*/
            that.findMeteor.CreateBlackHole(that, 3);
        });
        this.registerEventHandler();
    },

    update() {
        if (this.findMeteor.GetReCreateBlackHoleCnt() > 0) {
			this.findMeteor.CreateBlackHole(this, 1)
			this.findMeteor.ReCreateBlackHoleCntDel()
        }
    },

    onDestroy() {
        this.unRegisterEventHandler();
    },

    registerEventHandler(){
        this.catchMeteorHandlerBind = this.catchMeteorHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("CatchMeteor", this.catchMeteorHandlerBind);
        this.hpChangeHandlerBind = this.hpChangeHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("HpChange", this.hpChangeHandlerBind);
    },

    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("CatchMeteor", this.catchMeteorHandlerBind);
        EventUtil.GetInstance().RemoveEventListener("HpChange", this.hpChangeHandlerBind);
    },

    start() {
	    this.totalCollectMeteor = 0;
	    this.gameMeteorCon.UpdateCoin(0);
    },

    catchMeteorHandler(meteor){
	    var meteorNum = StarConfig.GetGameMeteorIncome(databus.userInfo.maxStarId);
	    databus.AddMoney(2, meteorNum);
	    //在这里加飞行动画，在动画的回调里调用下面这两行
        var that = this;
        var tweenPosition = TweenPosition.begin(meteor.node, meteor.node.position, this.gameMeteorCon.node.position, 0.3);
        tweenPosition.onFinishCallBack = function() {
            var findMeteor = FindMeteor.GetInstance();
            findMeteor.RemoveMeteor(meteor);
            findMeteor.ChangeBlackHoleSpeed();
            that.totalCollectMeteor += meteorNum;
            that.gameMeteorCon.UpdateCoin(that.totalCollectMeteor, true);
        }
    },

    hpChangeHandler(hp){
	     this.gameHpCon.UpdateHp(hp);
    }
})
