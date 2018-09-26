/**
 * GameResultPanel
 * @author lijun
 **/
import Databus from 'Databus'
import BasePanel from 'BasePanel'
import LevelManager from "LevelManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import EventUtil from "EventUtil"
import BGMConfig from "BGMConfig"

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
        new LevelManager().SwitchLevel("maze");
        //EventUtil.GetInstance().DispatchEvent("SwitchBgMusic", BGMConfig.GetStarBgm(databus.userInfo.curStarId));
    },

    Init(meteorNum) {
        this.meteorNum = meteorNum == null ? 0 : meteorNum;
        this.node.zIndex = 101
    }
})