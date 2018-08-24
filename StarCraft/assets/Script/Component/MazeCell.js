/**
 * MazeCell
 * @author lijun
 **/
import Databus from 'Databus'
import AffairConstant from "AffairConstant";
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bg:cc.Sprite,
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
        if(this.affair.type == AffairConstant.AffairEnum().REWARD)
        {
            EventUtil.GetInstance().DispatchEvent("TriggerReward", this.affair)
            EventUtil.GetInstance().DispatchEvent("FreeTouch")
        }
        else if(this.affair.type == AffairConstant.AffairEnum().FREEZE)
        {
            EventUtil.GetInstance().DispatchEvent("TriggerFreeze", this.affair)
        }
        else if(this.affair.type == AffairConstant.AffairEnum().ROB)
        {
            EventUtil.GetInstance().DispatchEvent("TriggerRob", this.affair)
        }
        else if(this.affair.type == AffairConstant.AffairEnum().GAME)
        {
            EventUtil.GetInstance().DispatchEvent("TriggerGame", this.affair)
        }
        else
        {
            EventUtil.GetInstance().DispatchEvent("FreeTouch")
        }
    }
})    