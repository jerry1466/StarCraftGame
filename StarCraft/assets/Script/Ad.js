/**
 * Ad
 * @author lijun
 **/
import Scene from 'Scene'
import Databus from 'Databus'
import ArrayUtil from "ArrayUtil"
import LevelManager from "LevelManager"
import SceneManager from "SceneManager";

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
        SceneManager.GetInstance().SetRoot(this.node);
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