/**
 * Ad
 * @author lijun
 **/
import Databus from 'Databus'
import ArrayUtil from "ArrayUtil"
import LevelManager from "LevelManager"
import BuffBase from "BuffBase";

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        spAd: {
            default: null,
            type: cc.Sprite
        },
    },

    onLoad() {
        wx.previewImage({
            urls:[ArrayUtil.GetRandomValue(databus.cfgData.set.more_game_ad.poster).img],
            success:function(res){
                console.log(res)
            }
        })
    },

    update() {
        BuffBase.Update();
    },

    onDestroy() {

    },

    Init() {

    },

    onButtonClick() {
        new LevelManager().SwitchLevel("preload", "0")
    },
})    