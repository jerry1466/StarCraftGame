/**
 * GameResultPanel
 * @author lijun
 **/
import Databus from 'Databus'
import BasePanel from 'BasePanel'
import LevelManager from "LevelManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends: BasePanel,
    properties: {
        spBg:cc.Sprite,
        lbNum:cc.Label,
        btnConfirm:cc.Button,
    },

    onLoad() {

    },

    start(){
    	console.log("game result panel start")
        ResourceManager.LoadRemoteSprite(this.spBg, ResConfig.GameResultPanelBg());
        ResourceManager.LoadRemoteSprite(this.btnConfirm, ResConfig.WellDoneBtn());
        this.lbNum.string = this.meteorNum.toString();
    },

    update() {

    },

    onDestroy() {

    },

    onClose(){
        new LevelManager().SwitchLevel("battle");
    },

    Init(meteorNum) {
        this.meteorNum = meteorNum;
        this.node.zIndex = 101
    }
})