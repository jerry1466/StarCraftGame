/**
 * CheatPanel
 * @author lijun
 **/
import BasePanel from "BasePanel";
import Databus from 'Databus';
import ModuleManager from "ModuleManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import LevelManager from "LevelManager";
import Affair from "Affair";

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        bg:cc.Sprite,
        inputBg:cc.Sprite,
        ebGm:cc.EditBox,
        btnClose:cc.Button,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.MessageBoxBg());
        ResourceManager.LoadRemoteSprite(this.btnClose, ResConfig.CloseBtn());
        ResourceManager.LoadRemoteSprite(this.inputBg, ResConfig.FrameBg());
    },

    update() {

    },

    onDestroy() {

    },

    Init() {

    },

    AddDiamond(_, num){
        this.execute("Diamond " + num);
    },

    AddMeteor(_, num){
        this.execute("Meteor " + num);
    },

    onConfirm(){
        var content = this.ebGm.string;
        console.log("onConfirm", content);
        this.execute(content);
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("CheatPanel");
    },

    execute(content){
        var splits = content.split(' ');
        var command = splits[0];
        switch(command)
        {
            case "Diamond":
                var num = parseInt(splits[1], 10);
                databus.AddMoney(1, num);
                break;
            case "Meteor":
                var num = parseInt(splits[1], 10);
                databus.AddMoney(2, num);
                break;
            case "game":
                var affair = new Affair();
                affair.type = 11;
                affair.meteor = 100;
                new LevelManager().SwitchLevel("game", affair);
                break;
            case "card":
                new LevelManager().SwitchLevel("card");
                break;
        }
    }
})    