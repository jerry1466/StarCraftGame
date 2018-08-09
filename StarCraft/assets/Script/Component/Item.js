/**
 * Wood
 * @author lijun
 **/
import Databus from 'Databus'
import EventUtil from "EventUtil";
import InterfaceManager from "InterfaceManager"

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        index:0,
        lbNum:cc.Label,
    },

    onLoad(){

    },

    update() {
        this.lbNum.string = databus.itemNum[this.index]
    },

    onDestroy() {

    },

    onClick(){
        console.log("click Item", this.index)
        if(databus.itemNum[this.index] <= 0)
        {
            InterfaceManager.GetInstance().ShareWithImg()
            databus.gamePause = true;
        }
        else
        {
            if(this.index == 0 && databus.freezeTimeStamp == 0)
            {
                databus.freezeTimeStamp = Date.now()
                databus.itemNumMax[this.index]--;
                databus.itemNum[this.index]--;
                EventUtil.GetInstance().DispatchEvent("PlayFreezeEffect");
            }
        }
    }
})