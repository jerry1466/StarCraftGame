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

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        fog:cc.Sprite,
        icon:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MazeCellIcon());
        ResourceManager.LoadRemoteSprite(this.fog, ResConfig.FoxIcon());
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
        ResourceManager.LoadRemoteSprite(this.icon, ResConfig.FoxIcon());
    },

    GetAffair(){
        return this.affair;
    },

    RemoveFog(){
        this.fog.node.active = false;
    },

    Trigger(){
        if(this.fog.node.active == true)
        {
            var tweenAlpha = TweenAlpha.begin(this.fog.node, 255, 0, 1, 1);
            var that = this;
            tweenAlpha.onFinishCallBack = function(){
                that.fog.node.active = false
                that.fog.node.opacity = 255;
                doTrigger(that.affair);
            }
        }
        else
        {
            doTrigger(this.affair);
        }

        function doTrigger(affair){
            console.log("MazeMapCell doTrigger", affair)
            if(affair.type == AffairConstant.AffairEnum().REWARD)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerReward", affair)
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
            }
            else if(affair.type == AffairConstant.AffairEnum().FREEZE)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerFreeze", affair)
            }
            else if(affair.type == AffairConstant.AffairEnum().ROB)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerRob", affair)
            }
            else if(affair.type == AffairConstant.AffairEnum().GAME)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerGame", affair)
            }
            else
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
            }
        }
    }
})