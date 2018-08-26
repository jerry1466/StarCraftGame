import ResourceManager from "ResourceManager"
import ResConfig from "ResConfig";
import EventUtil from "EventUtil";

cc.Class({
    extends:cc.Component,
    properties: {
        index:-1,
        cost:0,
    },

    onLoad(){
        this.nodeSp = this.node.getComponent(cc.Sprite);
        this.refresh();
    },

    onClick(){
        this.Select(true);
    },

    Select(value){
        this._select = value;
        this.refresh();
        if(value)
        {
            EventUtil.GetInstance().DispatchEvent("SetFixRelatedBroke", this.index)
        }
    },

    refresh(){
        if(this.nodeSp)
        {
            ResourceManager.LoadRemoteSprite(this.nodeSp, this._select?ResConfig.BrokeSelectIcon():ResConfig.BrokeUnselectIcon())
        }
    }
})