/**
 * Maze
 * @author lijun
 **/
import Scene from 'Scene'
import HUD from 'HUD'
import Databus from 'Databus'
import LevelManager from "LevelManager";
import SceneManager from "SceneManager";
import EventUtil from "EventUtil";
import MazeManager from "MazeManager";
import ModuleManager from "ModuleManager";
import EffectUtil from "EffectUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends: Scene,
    properties: {
        bg:cc.Sprite,
        hud: HUD,
        btnExit:cc.Button,
        map:cc.Node,
        player:cc.Node,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MazeBg())
        SceneManager.GetInstance().rootCanvas = this.node
        this.registerEventHandler();
    },

    update() {
        super.update();
    },

    onDestroy() {
        this.unRegisterEventHandler();
    },

    start(){
        MazeManager.GetInstance().Start();
    },

    Init() {

    },

    registerEventHandler(){
        EventUtil.GetInstance().addEventListener("TriggerReward", this.triggerRewardHandler);
        EventUtil.GetInstance().addEventListener("TriggerFreeze", this.triggerFreezeHandler);
        EventUtil.GetInstance().addEventListener("TriggerRob", this.triggerRobHandler);
        EventUtil.GetInstance().addEventListener("TriggerGame", this.triggerGameHandler);
        this.map.on(cc.Node.EventType.TOUCH_START, this.onMapClick);
    },

    unRegisterEventHandler(){
        EventUtil.GetInstance().removeEventListener("TriggerReward", this.triggerRewardHandler);
        EventUtil.GetInstance().removeEventListener("TriggerFreeze", this.triggerFreezeHandler);
        EventUtil.GetInstance().removeEventListener("TriggerRob", this.triggerRobHandler);
        EventUtil.GetInstance().removeEventListener("TriggerGame", this.triggerGameHandler);
        this.map.off(cc.Node.EventType.TOUCH_START, this.onMapClick);
    },

    onExit(){
        new LevelManager().SwitchLevel("Battle")
    },

    onMapClick(event){
        var location = event.getLocation()
        var deltaX = location.x - this.player.x
        var deltaY = location.y - this.player.y
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

    triggerRewardHandler(affair){
        databus.AddMoney(2, affair.meteor);
        ModuleManager.GetInstance().ShowModule("MeteorRewardBox", affair.meteor);
    },

    triggerFreezeHandler(affair){
        EffectUtil.PlayFullScreenEffect("AffairFullScreenEffect", "freeze", this.node, cc.v2(0, 0), function(){
            EventUtil.GetInstance().DispatchEvent("FreeTouch");
            //TODO 给玩家增加冰冻buff
        })
    },

    triggerRobHandler(affair){
        databus.AddMoney(2, 0 - affair.meteor);
        ModuleManager.GetInstance().ShowModule("RobBox", affair.meteor);
    },

    triggerGameHandler(affair){
        new LevelManager().PushNextLevel("Game", affair);
        new LevelManager().SwitchLevel("CutScene");
    },

})    