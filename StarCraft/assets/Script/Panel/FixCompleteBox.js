/**
 * FixCompleteBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig"
import BasePanel from "BasePanel"
import Databus from "Databus"

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        star:cc.Sprite,
        btnNext:cc.Button,
        spNext:cc.Sprite,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FixCompleteBoxBg());
        ResourceManager.LoadRemoteSprite(this.spNext, ResConfig.NextStarBtn());
    },

    start(){
        ResourceManager.LoadRemoteSprite(this.star, ResConfig.GetStarAppearance(this.curStarId));
    },

    update() {

    },

    onDestroy() {

    },


    Init(curStarId) {
        this.curStarId = curStarId
    },

    onNext(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
        ModuleManager.GetInstance().ShowModule("StarListPanel");
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
    },
})    