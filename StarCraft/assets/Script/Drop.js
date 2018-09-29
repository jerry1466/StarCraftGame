/**
 * Card
 * @author lijun
 **/
import Databus from "Databus"
import MathUtil from "MathUtil";
import SceneManager from "SceneManager";
import TweenPosition from "TweenPosition";
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import Coin from "Coin";
import ResConfig from "ResConfig";
import UIUtil from "UIUtil";
import GuideManager from "GuideManager";
import Cd from "Cd";

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
    },

    onLoad(){
        SceneManager.GetInstance().SetRoot(this.node);
        ResourceManager.LoadRemoteSprite(this.planet, ResConfig.GetStarIcon(databus.userInfo.curStarId));
        this.meteorCon.Init(ResConfig.ConBg());
        this.meteorCon.SetCoinType(2);
        this.registerEventHandler();
        this.gameStarted = false;
        this.countDown.node.active = false;
    },

    onDestroy(){
        this.unRegisterEventHandler();
    },

    start(){
        if(!GuideManager.HasGuide("dropGuide"))
        {
            UIUtil.ShowTextNotice("<color=#FFFF00>欢迎来到流星雨境</c>", cc.v2(0, 100));
            this.onGuideEndHandler = this.onGuideEnd.bind(this);
            EventUtil.GetInstance().AddEventListener("GuideEnd", this.onGuideEndHandler);
            GuideManager.AddGuide("dropGuide", SceneManager.GetInstance().rootCanvas());
        }
        else
        {
            this.countDownTimer();
        }
    },

    update(){
        this.meteorCon.UpdateCoin(databus.userInfo.meteor, true);
        if(this.gameStarted)
        {
            if(this.meteorCD.Tick())
            {
                var newMeteor = this.meteor.clone();
                newMeteor.setPosition(this.getDropPosition());
            }
            if(this.blackHoleCD.Tick())
            {
                var newBlackHole = this.blackHole.clone();
                newBlackHole.setPosition(this.getDropPosition());
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
        this.onTouchMoveHandler = this.touchMoveHandler.bind(this);
        this.container.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveHandler);
        this.onTouchEndHandler = this.touchEndHandler.bind(this);
        this.container.on(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
    },

    touchMoveHandler(event){
        this.touchMoveLocation = event.getLocation();
        this.planet.x += this.touchMoveLocation.x - this.touchStartLocation.x;
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
    },

    getDropPosition(){
        var halfScreen = databus.screenWidth * 0.5 - 10;
        var x = MathUtil.RandomRange(-halfScreen, halfScreen);
        var y = databus.screenHeight * 0.5;
        return cc.v2(x, y);
    }
})