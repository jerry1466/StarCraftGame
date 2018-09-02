/**
 * GameMeteorCnt
 * @author lijun
 **/

import ResourceManager from 'ResourceManager'
import ResConfig from 'ResConfig'

cc.Class({
    extends: cc.Component,
    properties: {
    	spBg:cc.Sprite,
        lbNum:cc.Label,
    },

    onLoad() {
    },

    Init(ResConf) {
        ResourceManager.LoadRemoteSprite(this.spBg, ResConf)
    },

    UpdateMeteorNum(num) {
        this.lbNum.string = num
    }
})

