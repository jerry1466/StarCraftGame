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
        this.refresh();
    },

    onLoad(){
		if(this.numText)
		{
			this.num.string = this.numText;
		}
    },

    onDestroy() {

    },

    Init(res, moneyNum, numText) {
        this.res = res;
		this.moneyNum = moneyNum;
        this.numText = numText;
        this.refresh();
    },

    refresh(){
        if(this.res)
        {
            this.icon.node.active = true;
            ResourceManager.LoadRemoteSprite(this.icon, this.res);
        }
        else
        {
            this.icon.node.active = false;
        }
    }
})    