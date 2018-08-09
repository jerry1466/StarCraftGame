/**
 * MonkeyAI
 * @author lijun
 **/
import UnitManager from "UnitManager";
import Databus from 'Databus'
import MissionConfig from "MissionConfig"
import GameInfo from "GameInfo"
import Cd from "Cd"
import EventUtil from "EventUtil"

let databus = new Databus()
cc.Class({
    extends: cc.Component,
    properties: {
        min:cc.v2(0,0),
        max:cc.v2(0,0),
        duration:1,
    },

    onLoad(){
        this.node.setPosition(this.min);
        this.deltaX = (this.max.x - this.min.x) / this.duration;
        this.deltaY = (this.max.y - this.min.y) / this.duration;
    },

    update(dt) {
        var x = this.node.x + this.deltaX * dt;
        var y = this.node.y + this.deltaY * dt;
        if((this.deltaX > 0 && x >= this.max.x) || (this.deltaX < 0 && x <= this.min.x))
        {
            this.deltaX *= -1;
        }
        if((this.deltaY > 0 && y >= this.max.y) || (this.deltaY < 0 && y <= this.min.y))
        {
            this.deltaY *= -1;
        }
        this.node.setPosition(cc.v2(x, y))
    },

    onDestroy() {

    },
})