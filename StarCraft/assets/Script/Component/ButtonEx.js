/**
 * ButtonEx
 * @author lijun
 **/
import Databus from 'Databus'

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        target:cc.Node,
        component:"",
        handler:"",
        customEventData:"",
        clickSound:cc.AudioSource
    },

    onLoad(){
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.target;
        clickEventHandler.component = this.component;
        clickEventHandler.handler = "onClick";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    onClick() {
        if(this.clickSound)
        {
            this.clickSound.play();
        }
        var com = this.target.getComponent(this.component);
        com[this.handler](this,customEventData);  
    }
})