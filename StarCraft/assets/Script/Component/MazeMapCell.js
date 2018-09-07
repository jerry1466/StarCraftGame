/**
 * MazeMapCell
 * @author lijun
 **/
import Databus from 'Databus'
import AffairConstant from "AffairConstant";
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import TweenAlpha from "TweenAlpha";
import LevelManager from "../Manager/LevelManager";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        borderTop:cc.Sprite,
        borderRight:cc.Sprite,
        borderLeft:cc.Sprite,
        borderBottom:cc.Sprite,
        fog:cc.Sprite,
        icon:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.borderTop, ResConfig.MazeCellLine());
        ResourceManager.LoadRemoteSprite(this.borderRight, ResConfig.MazeCellLine());
        ResourceManager.LoadRemoteSprite(this.borderLeft, ResConfig.MazeCellLine());
        ResourceManager.LoadRemoteSprite(this.borderBottom, ResConfig.MazeCellLine());
        ResourceManager.LoadRemoteSprite(this.fog, ResConfig.FogIcon());
        // this.fog.node.opacity = 0;
    },

    update() {

    },

    onDestroy() {

    },

    Init(row, column) {
        this.row = row;
        this.column = column;
    },

    InitAffair(affair){
        this.affair = affair;
        if(this.affair.triggered){
            this.fog.node.active = false;
        }
        else{
            this.fog.node.active = true;
        }
        ResourceManager.LoadRemoteSprite(this.icon, ResConfig.AffairIcon(this.affair.type));
    },

    GetAffair(){
        return this.affair;
    },

    RemoveFog(){
        this.fog.node.active = false;
        this.fog.node.opacity = 255;
    },

    Trigger(){
        if(this.fog.node.active == true)
        {
            var tweenAlpha = TweenAlpha.begin(this.fog.node, 255, 0, 1, 1);
            var that = this;
            tweenAlpha.onFinishCallBack = function(){
                that.RemoveFog();
                doTrigger(that.affair);
                removeIcon(that.icon);
            }
        }
        else
        {
            doTrigger(this.affair);
            removeIcon(this.icon);
        }

        function doTrigger(affair){
            console.log("MazeMapCell doTrigger", affair)
            // new LevelManager().SwitchLevel("game");
            if(affair.type == AffairConstant.AffairEnum().REWARD)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerReward", affair)
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
            }
            else if(affair.type == AffairConstant.AffairEnum().FREEZE)
            {
                //EventUtil.GetInstance().DispatchEvent("TriggerFreeze", affair);
                EventUtil.GetInstance().DispatchEvent("FreeTouch");
            }
            else if(affair.type == AffairConstant.AffairEnum().ROB)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerRob", affair)
            }
            else if(affair.type == AffairConstant.AffairEnum().GAME)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerGame", affair)
            }
            else if(affair.type == AffairConstant.AffairEnum().CARD)
            {
                //EventUtil.GetInstance().DispatchEvent("TriggerCard", affair);
                EventUtil.GetInstance().DispatchEvent("FreeTouch");
            }
            else
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
            }
        }

        function removeIcon(icon){
            TweenAlpha.begin(icon, 255, 0, 1, 1);
        }
    }
})