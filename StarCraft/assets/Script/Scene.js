/**
 * Scene
 * @author lijun
 **/
import BuffBase from "BuffBase"
import Productor from "Productor";
cc.Class({
    extends: cc.Component,
    properties: {
    },

    update() {
        BuffBase.Update();
        Productor.GetInstance().Update();
    },

    onDestroy() {

    },
})    