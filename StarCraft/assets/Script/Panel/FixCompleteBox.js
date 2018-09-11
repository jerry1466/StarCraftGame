/**
 * FixCompleteBox
 * @author lijun
 **/
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig"
import BasePanel from "BasePanel"
import Databus from "Databus"
import StarConfig from "StarConfig";

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg: cc.Sprite,
        star:cc.Sprite,
        btnNext:cc.Button,
        btnClose:cc.Button,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.FixCompleteBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnNext, ResConfig.NextStarBtn());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
    },

    start(){
        ResourceManager.LoadRemoteSprite(this.star, ResConfig.GetStarIcon(this.curStarId));
        if(this.isFinalStar)
        {
            this.btnNext.node.active = false;
            this.btnClose.node.active = true;
        }
        else
        {
            this.btnNext.node.active = true;
            this.btnClose.node.active = false;
        }
    },

    update() {

    },

    onDestroy() {

    },


    Init(curStarId) {
        this.curStarId = curStarId
        this.isFinalStar = StarConfig.IsMaxStarId(curStarId);
    },

    onNext(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
        ModuleManager.GetInstance().ShowModule("NewStarPanel", this.curStarId + 1);
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("FixCompleteBox");
    }
})    