/**
 * CheatPanel
 * @author lijun
 **/
import BasePanel from "BasePanel";
import Databus from 'Databus';
import ModuleManager from "ModuleManager";

let databus = new Databus();
cc.Class({
    extends: BasePanel,
    properties: {
        ebGm:cc.EditBox,
        btnConfirm:cc.Button,
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
        var content = this.ebGm.string
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
        }
    }
})    