import SceneManager from "SceneManager";
import UIUtil from "UIUtil";

cc.Class({
    extends:cc.Component,
    properties: {

    },

    SetMeteor(num){
        this.num = Math.floor(num);
        this.speed = num * 10;
        this.node.width = this.node.width * (1 + num / 75);
        this.node.height = this.node.width * (1 + num / 75);
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