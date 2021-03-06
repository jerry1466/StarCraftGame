import SceneManager from "SceneManager";
import UIUtil from "UIUtil";

cc.Class({
    extends:cc.Component,
    properties: {

    },

    SetMeteor(num, numScale){
        this.num = Math.floor(num * numScale);
        this.speed = num * 10;
        this.node.scaleX = (1 + num / 75);
        this.node.scaleY = (1 + num / 75);
    },

    update(dt){
        var pos = this.node.position;
        pos.y += -1 * this.speed * dt;
        this.node.position = pos;
    },

    Hit(){
       this.node.removeFromParent(true);
       this.node.destroy();
       UIUtil.ShowMoneyNotice(2, this.num, SceneManager.GetInstance().rootCanvas(), this.node.position);
    }
})