import Databus from "Databus"
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus();
cc.Class({
    extends:cc.Component,
    properties: {
        fixed:false,
    },

    onLoad(){
        this.icon = this.node.getComponent(cc.Sprite);
        ResourceManager.LoadRemoteSprite(this.icon, ResConfig.BrokeIcon(databus.userInfo.curStarId));
    },

    update(){
        //this.progressBar.progress = Math.min(databus.userInfo.meteor / this.cost, 1);
    },

    Init(index, cost){
        this.index = index;
        this.cost = cost;
    },

    Select(value){
        this._select = value;
        if(value)
        {
            EventUtil.GetInstance().DispatchEvent("SetFixRelatedBroke", this)
        }
    },

    SetFixed(value){
        this.fixed = value;
    },
})