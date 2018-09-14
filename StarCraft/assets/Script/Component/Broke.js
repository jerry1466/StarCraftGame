import Databus from "Databus"
import EventUtil from "EventUtil";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import ShaderUtil from "ShaderUtil";

let databus = new Databus();
cc.Class({
    extends:cc.Component,
    properties: {
        fixed:false,
    },

    onLoad(){
        this.icon = this.node.getComponent(cc.Sprite);
        this.refresh();
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
            EventUtil.GetInstance().DispatchEvent("SetFixRelatedBroke", this);
        }
        this.refresh();
    },

    refresh(){
        if(this.icon)
        {
            ResourceManager.LoadRemoteSprite(this.icon, ResConfig.BrokeIcon(databus.userInfo.curStarId));
            // var highLightShader = this.icon.node.getComponent("HighLightShader");
            // if(this._select)
            // {
            //     if(highLightShader == null)
            //     {
            //         this.icon.node.addComponent("HighLightShader");
            //     }
            // }
            // else
            // {
            //     if(highLightShader != null)
            //     {
            //         highLightShader.destroy();
            //     }
            //     ShaderUtil.RollBackNormal(this.icon);
            // }
        }
    },

    SetFixed(value){
        this.fixed = value;
    },
})