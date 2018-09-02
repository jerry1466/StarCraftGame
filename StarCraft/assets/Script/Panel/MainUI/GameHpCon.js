/**
 * GameHpCon
 * @author lijun
 **/

import ResourceManager from 'ResourceManager'
import Databus from "Databus"
import ResConfig from "ResConfig"

let databus = new Databus();
cc.Class({
    extends: cc.Component,
    properties: {
    	spBg:cc.Sprite,
        container:cc.Node,
    },

    onLoad() {
        this._hpList = [];
        for(var i = 0; i < databus.gameMaxHp; i++){
            var hpNode = new cc.Node();
            hpNode.width = 24;
            hpNode.height = 21;
            var hpSp = hpNode.addComponent(cc.Sprite);
            ResourceManager.LoadRemoteSprite(hpSp, ResConfig.HpIcon());
            this.container.addChild(hpNode);
            this._hpList.push(hpNode);
        }
    },

    Init(res) {
        ResourceManager.LoadRemoteSprite(this.spBg, res)
    },

    UpdateHp(num) {
        for(var i = num; i < databus.gameMaxHp; i++)
        {
            if(this._hpList[i]){
                this._hpList[i].active = false;
            }
        }
    }
})

