/**
 * Ad
 * @author lijun
 **/
import Scene from 'Scene'
import Databus from 'Databus'
import ArrayUtil from "ArrayUtil"
import LevelManager from "LevelManager"

let databus = new Databus()
cc.Class({
    extends: Scene,
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
        super.update();
    },

    onDestroy() {

    },

    Init() {

    },

    onButtonClick() {
        new LevelManager().SwitchLevel("preload", "0")
    },
})    