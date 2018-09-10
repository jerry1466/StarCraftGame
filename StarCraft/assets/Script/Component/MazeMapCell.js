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
    },

    update() {

    },

    onDestroy() {

    },

    Init(row, column) {
        this.row = row;
        this.column = column;
        this.affair_active = true;
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

    ClearAffair(){
        this.affair.type = AffairConstant.AffairEnum().NONE;
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
                if(that.affair.type != AffairConstant.AffairEnum().NONE){
                    removeIcon(that.icon);
                }
                doTrigger(that);
            }
        } else {
            if(this.affair.type != AffairConstant.AffairEnum().NONE) {
                removeIcon(this.icon);
            }
            doTrigger(this);
        }

        function doTrigger(_this){
            console.log("MazeMapCell doTrigger", _this.affair)
            // new LevelManager().SwitchLevel("game");
            if (!_this.affair_active) {
				EventUtil.GetInstance().DispatchEvent("FreeTouch")
				return
            }

            _this.affair_active = false
            if(_this.affair.type == AffairConstant.AffairEnum().REWARD)
            {
				EventUtil.GetInstance().DispatchEvent("TriggerReward", _this.affair)
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().FREEZE)
            {
            	// FreeTouch事件在冰冻buff结束之后再抛出
                EventUtil.GetInstance().DispatchEvent("TriggerFreeze", _this.affair)
                return
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().ROB)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerRob", _this.affair)
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().GAME)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerGame", _this.affair)
                return
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().CARD)
            {
                //EventUtil.GetInstance().DispatchEvent("TriggerCard", _this.affair);
            }

            EventUtil.GetInstance().DispatchEvent("FreeTouch");
            _this.ClearAffair();
        }

        function removeIcon(icon){
            var tweenAlpha = TweenAlpha.begin(icon, 255, 0, 1, 1);
            tweenAlpha.onFinishCallBack = function()
            {
                icon.node.removeFromParent();
                icon.node.destroy();
            }
        }
    }
})