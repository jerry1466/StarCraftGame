/**
 * Drop
 * @author lijun
 **/
import Databus from "Databus"
import MathUtil from "MathUtil";
import SceneManager from "SceneManager";
import ModuleManager from "ModuleManager";
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import Coin from "Coin";
import ResConfig from "ResConfig";
import UIUtil from "UIUtil";
import GuideManager from "GuideManager";
import Cd from "Cd";
import LevelManager from "LevelManager";
import AnimationManager from "AnimationManager";
import BGMConfig from "BGMConfig";

let databus = new Databus();
cc.Class({
    extends: cc.Component,
    properties: {
        planet:cc.Node,
        meteor:cc.Node,
        blackHole:cc.Node,
        meteorCon:Coin,
        container:cc.Node,
        countDown:cc.Sprite,
        rtOperationTip:cc.RichText,
        tipIcon:cc.Sprite,
    },

    onLoad(){
        SceneManager.GetInstance().SetRoot(this.node);
		this.planet.active = true;
        ResourceManager.LoadRemoteSprite(this.planet, ResConfig.GetStarIcon(databus.userInfo.curStarId));
        this.meteorCon.Init(ResConfig.ConBg());
        this.meteorCon.SetCoinType(2);
        this.registerEventHandler();
        this.gameStarted = false;
        this.gameEnd = false;
        this.countDown.node.active = false;
        this.meteorComList = [];
        this.blackHoleComList = [];
        this.rtOperationTip.string = "<color=#FFFFFF>手指左右移动   </c><color=#FFFFFF>，收集</c>";
        ResourceManager.LoadRemoteSprite(this.tipIcon, ResConfig.GetStarIcon(databus.userInfo.curStarId));
		this.meteorSoundChnl = BGMConfig.BgmInit(BGMConfig.GetBgm("collectMeteor"));
		this.blackHoleSoundChnl = BGMConfig.BgmInit(BGMConfig.GetBgm("hitBlackHole"));
    },

    onDestroy(){
        this.unRegisterEventHandler();
    },

    start(){
        // if(!GuideManager.HasGuide("dropGuide"))
        // {
            // UIUtil.ShowTextNotice("<color=#FFFF00>欢迎来到流星雨境</c>", cc.v2(0, 100));
            // this.onGuideEndHandler = this.onGuideEnd.bind(this);
            // EventUtil.GetInstance().AddEventListener("GuideEnd", this.onGuideEndHandler);
            // GuideManager.AddGuide("dropGuide", SceneManager.GetInstance().rootCanvas());
        // }
        // else
        // {
            this.countDownTimer();
        // }
    },

    update(dt){
        this.meteorCon.UpdateCoin(databus.userInfo.meteor, true);
        if(this.gameEnd) return;
        if(this.gameStarted)
        {
            if(this.meteorCD.Tick())
            {
                var newMeteor = cc.instantiate(this.meteor);
                newMeteor.parent = this.container;
                newMeteor.setPosition(this.getDropPosition());
                var meteorCom = newMeteor.getComponent("DropMeteor");
                this.meteorComList.push(meteorCom);
                meteorCom.SetMeteor(MathUtil.RandomRange(10, 50));
            }
            if(this.blackHoleCD.Tick())
            {
                var newBlackHole = cc.instantiate(this.blackHole);
                newBlackHole.parent = this.container;
                newBlackHole.setPosition(this.getDropPosition());
                var blackHoleCom = newBlackHole.getComponent("DropBlackHole");
                this.blackHoleComList.push(blackHoleCom);
                blackHoleCom.SetBlackHole(500, MathUtil.RandomRange(1, 1.25));
            }
            this.blackHoleCD.duration = MathUtil.Clamp(this.blackHoleCD.duration - dt * 80, 250, 10000);

            for(var i = this.meteorComList.length - 1; i >= 0; i--)
            {
                if(MathUtil.HitTestWithScale(this.meteorComList[i].node, this.planet))
                {
                    this.collectTotal += this.meteorComList[i].num;
                    databus.AddMoney(2, this.meteorComList[i].num);
                    this.meteorComList[i].Hit();
                    this.meteorComList.splice(i, 1);
					BGMConfig.BgmPlay(this.meteorSoundChnl);
                }
            }

            for(var i = this.blackHoleComList.length - 1; i >= 0; i--)
            {
                if(MathUtil.HitTestWithScale(this.blackHoleComList[i].node, this.planet))
                {
                    this.blackHoleComList[i].Hit();
                    this.blackHoleComList.splice(i, 1);
					BGMConfig.BgmPlay(this.blackHoleSoundChnl);
                    this.gameOver();
                    break;
                }
            }
        }
    },

    registerEventHandler(){
        this.onTouchStartHandler = this.touchStartHandler.bind(this);
        this.container.on(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler);
    },

    unRegisterEventHandler(){
        this.container.off(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler);
    },

    onGuideEnd(key){
        if(key == "dropGuide")
        {
            EventUtil.GetInstance().RemoveEventListener("GuideEnd", this.onGuideEndHandler);
            UIUtil.ShowTextNotice("<color=#FFFF00>注意不要被落下的黑洞砸到</c>", cc.v2(0, 100));
            this.countDownTimer();
        }
    },

    touchStartHandler(event){
        this.touchStartLocation = event.getLocation();
        console.log("touchStartHandler", this.touchStartLocation);
        this.onTouchMoveHandler = this.touchMoveHandler.bind(this);
        this.container.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
        this.onTouchEndHandler = this.touchEndHandler.bind(this);
        this.container.on(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
    },

    touchMoveHandler(event){
        this.touchMoveLocation = event.getLocation();
        console.log("touchMoveHandler", this.touchMoveLocation);
        var pos = this.planet.position;
        pos.x += this.touchMoveLocation.x - this.touchStartLocation.x;
        this.planet.position = pos;
        this.touchStartLocation = this.touchMoveLocation;
    },

    touchEndHandler(event){
        this.container.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
        this.container.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
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
        this.gameStarted = true;
        this.meteorCD = new Cd(2000);
        this.blackHoleCD = new Cd(2500);
        this.collectTotal = 0;
    },

    getDropPosition(){
        var halfScreen = databus.screenWidth * 0.5 - 10;
        var x = MathUtil.RandomRange(-halfScreen, halfScreen);
        var y = databus.screenHeight * 0.5;
        return cc.v2(x, y);
    },

    gameOver(){
        this.gameEnd = true;
		this.planet.active = false;
		AnimationManager.PlayAnim("cardFail", this.planet.parent, this.planet.position, null);
        ModuleManager.GetInstance().ShowModule("MeteorSettleBox", {title:"游戏结束", meteorNum:this.collectTotal, confirmLabel:"下次加油", callback:function(){
            new LevelManager().SwitchLevel("maze");
        }});
    }
})