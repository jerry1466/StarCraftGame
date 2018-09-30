cc.Class({
    extends:cc.Component,
    properties: {

    },

    SetBlackHole(speed, scale){
        this.speed = speed;
        this.node.width = this.node.width * scale;
        this.node.height = this.node.width * scale;
    },

    update(dt){
        var pos = this.node.position;
        pos.y += -1 * this.speed * dt;
        this.node.position = pos;
    },

    Hit(){
        this.node.removeFromParent(true);
        this.node.destroy();
    }
})