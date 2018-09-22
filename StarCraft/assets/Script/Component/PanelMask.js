/**
 * PanelMask
 * @author lijun
 **/
import ModuleManager from "ModuleManager";

cc.Class({
    extends: cc.Component,
    properties: {

    },

    update() {

    },

    onDestroy() {

    },

    Init(moduleName){
        this.moduleName = moduleName;
        this.blankClose = false;
    },

    RegisterBlankClose(blankClose){
        this.blankClose = blankClose
    },

    onClick(){
        if(this.blankClose)
        {
            ModuleManager.GetInstance().HideModule(this.moduleName)
        }
    }
})    