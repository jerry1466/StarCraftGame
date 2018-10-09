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
import TweenPosition from "TweenPosition"
import GuideManager from "GuideManager"

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
        countDown:cc.Sprite,
        timeLimitCon:cc.Node,
        timeLimitTxt:cc.Label,
    },

    onLoad() {
    	console.log("game start")
        SceneManager.GetInstance().SetRoot(this.node);
        this.gameMeteorCon.Init(ResConfig.ConBg());
        this.gameMeteorCon.InitIcon(ResConfig.MeteorIcon());
        this.gameHpCon.Init(ResConfig.GameHpConBg());
        this.countDownStart = false
        this.countDown.node.active = false;
        this.updateTimeLimit(databus.gameTimeLimit);
    	//加载流星平原背景
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FindMeteorBg())
        //var param = new LevelManager().CurrentLevelParam
        this.findMeteor = FindMeteor.GetInstance()
        this.findMeteor.gameOver = false
        this.findMeteor.cdFinish = false
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
            that.guide();
        });
        this.registerEventHandler();
    },

    update() {
		if (GuideManager.HasGuide("gameBlackHole") && !this.countDownStart) {
			this.countDownStart = true
			this.countDownTimer()
		}
    
        if (this.findMeteor.GetReCreateBlackHoleCnt() > 0) {
			this.findMeteor.CreateBlackHole(this, 1)
			this.findMeteor.ReCreateBlackHoleCntDel()
        }

        if(this.findMeteor.cdFinish == true && this.findMeteor.gameOver != true)
        {
            this.updateTimeLimit();
        }
    },

    onDestroy() {
	    this.findMeteor.Destroy();
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
	    this.gameMeteorCon.UpdateCoin(0);
    },

    updateTimeLimit(timeLimit){
        if(timeLimit)
        {
            this.totalTL = timeLimit;
        }
        else
        {
            this.totalTL--;
            if(this.totalTL < 0)
            {
                this.totalTL = 0;
            }
        }
        if(this.totalTL >= 0 && this.totalTL <= 5)
        {
            this.timeLimitTxt.node.color = "#ff0000";
        }
        else if(this.totalTL >= 6 && this.totalTL <= 10)
        {
            this.timeLimitTxt.node.color = "#ffff00";
        }
        else
        {
            this.timeLimitTxt.node.color = "#33ff00";
        }
        this.timeLimitTxt.string = this.totalTL + "秒";
        if(this.totalTL <= 0)
        {
            this.findMeteor.GameOver();
        }
    },

    catchMeteorHandler(meteor){
	    var meteorNum = StarConfig.GetGameMeteorIncome(databus.userInfo.maxStarId);
	    databus.AddMoney(2, meteorNum);
	    //在这里加飞行动画，在动画的回调里调用下面这两行
        var that = this;
        var tweenPosition = TweenPosition.begin(meteor.node, meteor.node.position, this.gameMeteorCon.node.position, 0.3);
        tweenPosition.onFinishCallBack = function() {
            var findMeteor = FindMeteor.GetInstance();
            that.findMeteor.AddCollectMeteor(meteorNum);
            findMeteor.RemoveMeteor(meteor);
            findMeteor.ChangeBlackHoleSpeed();
            that.gameMeteorCon.UpdateCoin(that.findMeteor.totalCollectMeteor, true);
        }
    },

    hpChangeHandler(hp){
	     this.gameHpCon.UpdateHp(hp);
    },

    guide() {
		GuideManager.AddGuide("gamePlanet", SceneManager.GetInstance().rootCanvas());
    },

    countDownTimer() {
    	this.countDown.node.active = true;
    	this.countDown.node.zIndex = 100;
    	this.cdanim = this.countDown.node.getComponent(cc.Animation);
    	this.cdanim.on('finished', this.countDownFinish, this);
		this.cdanim.play('countDown');
    },

    countDownFinish() {
    	this.cdanim.off('finished', this.countDownFinish, this);
		this.countDown.node.removeFromParent(true);
		this.countDown.node.destroy();
		this.findMeteor.cdFinish = true;
    }
})
