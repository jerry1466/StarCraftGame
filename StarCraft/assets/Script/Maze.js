/**
 * Maze
 * @author lijun
 **/
import Databus from 'Databus'
import LevelManager from "LevelManager";
import SceneManager from "SceneManager";
import EventUtil from "EventUtil";
import MazeManager from "MazeManager";
import ModuleManager from "ModuleManager";
import EffectUtil from "EffectUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import BuffBase from 'BuffBase';
import Coin from "Coin";
import Player from "Player";
import UIUtil from "UIUtil";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bg:cc.Sprite,
        mazeBg:cc.Sprite,
        diamondCon: Coin,
        btnExit:cc.Button,
        map:cc.Node,
        player:Player,
        tip:cc.Label,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MazeBg());
        ResourceManager.LoadRemoteSprite(this.mazeBg, ResConfig.MazePanelBg())
        SceneManager.GetInstance().SetRoot(this.node);
        this.diamondCon.Init(ResConfig.DiamondConBg());
        this.registerEventHandler();
    },

    update() {
        this.diamondCon.UpdateCoin(databus.userInfo.diamond, true);
    },

    onDestroy() {
        MazeManager.GetInstance().Destroy();
        this.unRegisterEventHandler();
    },

    start(){
        MazeManager.GetInstance().Start(this.map, this.player);
    },

    Init() {

    },

    registerEventHandler(){
        this.onTriggerRewardHandler = this.triggerRewardHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("TriggerReward", this.onTriggerRewardHandler);
        this.onTriggerFreezeHandler = this.triggerFreezeHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("TriggerFreeze", this.onTriggerFreezeHandler);
        this.onTriggerRobHandler = this.triggerRobHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("TriggerRob", this.onTriggerRobHandler);
        this.onTriggerGameHandler = this.triggerGameHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("TriggerGame", this.onTriggerGameHandler);
        this.onTriggerCardHandler = this.triggerCardHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("TriggerCard", this.onTriggerCardHandler);
        this.onSelectMapGridHandler = this.selectMapGridHandler.bind(this);
        EventUtil.GetInstance().AddEventListener("SelectMapGrid", this.onSelectMapGridHandler);
        this.onShowNoticeHandler = this.showNotice.bind(this);
        EventUtil.GetInstance().AddEventListener("MazeShowNotice", this.onShowNoticeHandler);
        this.onTouchStartHandler = this.onTouchStart.bind(this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler);
    },

    unRegisterEventHandler(){
        EventUtil.GetInstance().RemoveEventListener("TriggerReward", this.onTriggerRewardHandler);
        EventUtil.GetInstance().RemoveEventListener("TriggerFreeze", this.onTriggerFreezeHandler);
        EventUtil.GetInstance().RemoveEventListener("TriggerRob", this.onTriggerRobHandler);
        EventUtil.GetInstance().RemoveEventListener("TriggerGame", this.onTriggerGameHandler);
        EventUtil.GetInstance().RemoveEventListener("TriggerCard", this.onTriggerCardHandler);
        EventUtil.GetInstance().RemoveEventListener("SelectMapGrid", this.onSelectMapGridHandler);
        EventUtil.GetInstance().RemoveEventListener("MazeShowNotice", this.onShowNoticeHandler);
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStartHandler);
    },

    onExit(){
        new LevelManager().SwitchLevel("Battle")
    },

    toMapPosition(worldPosition){
        var mapLocation = UIUtil.ToWorldCoord(this.node, "MapFrame.Map");
        worldPosition.x -= 0.5 * databus.screenWidth + mapLocation.x;
        worldPosition.y -= 0.5 * databus.screenHeight + mapLocation.y;
        return worldPosition;
    },

    onTouchStart(event){
        this.touchStartLocation = this.toMapPosition(event.getLocation());
        MazeManager.GetInstance().ClickMap(this.touchStartLocation);
        this.onTouchEndHandler = this.onTouchEnd.bind(this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
        this.onTouchCancelHandler = this.onTouchCancel.bind(this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
    },

    onTouchEnd(event){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
        this.touchEndLocation = this.toMapPosition(event.getLocation());
        var deltaX = this.touchEndLocation.x - this.touchStartLocation.x
        var deltaY = this.touchEndLocation.y - this.touchStartLocation.y
        if(Math.abs(deltaX) > Math.abs(deltaY)){
            if(deltaX > 0)
            {
                MazeManager.GetInstance().Move("right");
            }
            else
            {
                MazeManager.GetInstance().Move("left");
            }
        }
        else{
            if(deltaY > 0)
            {
                MazeManager.GetInstance().Move("up");
            }
            else
            {
                MazeManager.GetInstance().Move("down");
            }
        }
    },

    onTouchCancel(event){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancelHandler);
        this.touchStartLocation = cc.v2(0, 0);
    },

    triggerRewardHandler(affair){
        databus.AddMoney(2, affair.meteor);
        ModuleManager.GetInstance().ShowModule("MeteorRewardBox", affair.meteor);
    },

    triggerFreezeHandler(affair){
        EffectUtil.PlayFullScreenEffect("AffairFullScreenEffect", "freeze", this.node, cc.v2(0, 0), function(){
            EventUtil.GetInstance().DispatchEvent("FreeTouch");
            //给玩家增加冰冻buff
			BuffBase.AddBuff(2)
        })
    },

    triggerRobHandler(affair){
        databus.AddMoney(2, 0 - affair.meteor);
        ModuleManager.GetInstance().ShowModule("RobBox", affair.meteor);
    },

    triggerGameHandler(affair){
        // new LevelManager().PushNextLevel("game", affair);
        // new LevelManager().SwitchLevel("CutScene");
        new LevelManager().SwitchLevel("game", affair);
    },

    triggerCardHandler(affair){
        ModuleManager.GetInstance().ShowModule("CardGamePanel");
    },

    selectMapGridHandler(){
        this.showNotice("请选择一个格子作为探索起点");
    },

    showNotice(text){
        this.tip.string = text;
    }
})    