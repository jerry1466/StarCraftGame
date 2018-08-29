/**
 * Notice
 * @author lijun
 **/
import ResourceManager from "ResourceManager";

cc.Class({
    extends: cc.Component,
    properties: {
        icon:cc.Sprite,
        num:cc.RichText,
    },

    update() {

    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.icon, this.res);
        this.num.string = this.numText;
    },

    onDestroy() {

    },

    Init(res, numText) {
        this.res = res
        this.numText = numText;
    }
})    