/**
 * MazeCell
 * @author lijun
 **/
import Databus from 'Databus'
import GameInfo from "GameInfo"
import TweenAlpha from "TweenAlpha"
import MissionConfig from "MissionConfig";
import ModuleManager from "ModuleManager";
import AffairConstant from "AffairConstant";
import EventUtil from "EventUtil";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        bg:cc.Sprite,
        icon:cc.Sprite,
        row:-1,
        column:-1,
    },

    onLoad(){

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