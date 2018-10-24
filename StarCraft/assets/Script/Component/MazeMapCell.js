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
import AnimationManager from "AnimationManager";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        borderTop:cc.Sprite,
        borderRight:cc.Sprite,
        borderLeft:cc.Sprite,
        borderBottom:cc.Sprite,
        icon:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){
        // ResourceManager.LoadRemoteSprite(this.borderTop, ResConfig.MazeCellLine());
        // ResourceManager.LoadRemoteSprite(this.borderRight, ResConfig.MazeCellLine());
        // ResourceManager.LoadRemoteSprite(this.borderLeft, ResConfig.MazeCellLine());
        // ResourceManager.LoadRemoteSprite(this.borderBottom, ResConfig.MazeCellLine());
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
            this.icon.node.active = false;
        }
        else{
            this.icon.node.active = true;
        }
		if(databus.showMazeIcon)
		{
			ResourceManager.LoadRemoteSprite(this.icon, ResConfig.AffairIcon(this.affair.type));
		}
		else
		{
			if(this.affair.type == AffairConstant.AffairEnum().NONE)
			{
				this.icon.node.active = false;
			}
			else
			{
				this.icon.node.active = true;
				ResourceManager.LoadRemoteSprite(this.icon, ResConfig.MeteorIcon());
			}
		}
    },

    GetAffair(){
        return this.affair;
    },

    ClearAffair(){
        this.affair.type = AffairConstant.AffairEnum().NONE;
        this.affair.triggered = true;
    },

    RemoveFog(callback){
        var foreFogCover = this.affair.fogCover;
        if(foreFogCover == true)
        {
            //AnimationManager.PlayAnim("fogRemove", this.node.parent.parent, this.node.position, callback, false);
            this.affair.fogCover = false;
            if(callback)
            {
                callback();
            }
        }
        else
        {
            this.affair.fogCover = false;
            if(callback)
            {
                callback();
            }
        }
    },

    Trigger(){
        if(this.affair.type != AffairConstant.AffairEnum().NONE) {
            removeIcon(this.icon);
        }
        var that = this;
        setTimeout(function(){
            doTrigger(that);
        }, 500);

        function doTrigger(_this){
            if(_this.affair == null)
            {
                return;
            }
            if (!_this.affair_active) {
                _this.ClearAffair();
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
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().ROB)
            {
                EventUtil.GetInstance().DispatchEvent("TriggerRob", _this.affair)
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().GAME)
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
                EventUtil.GetInstance().DispatchEvent("TriggerGame", _this.affair);
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().CARD)
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
                EventUtil.GetInstance().DispatchEvent("TriggerCard", _this.affair);
            }
            else if(_this.affair.type == AffairConstant.AffairEnum().DROP)
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
                EventUtil.GetInstance().DispatchEvent("TriggerDrop", _this.affair);
            }
            else
            {
                EventUtil.GetInstance().DispatchEvent("FreeTouch")
            }

            _this.ClearAffair();
        }

        function removeIcon(icon){
            var tweenAlpha = TweenAlpha.begin(icon, 255, 0, 0.5, 1);
            tweenAlpha.onFinishCallBack = function()
            {
                icon.node.removeFromParent();
            }
        }
    }
})