/**
 * Guide
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import Databus from 'Databus'
import TweenScale from 'TweenScale'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()

cc.Class({
    extends: BasePanel,
    properties: {
        bgContent:cc.Sprite,
        lbContent: cc.Label,
        circleNode:cc.Node,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bgContent, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.circleNode, ResConfig.GuideCircle());
        this.node.width = this.node.height = 10000;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
    },

    start(){
        this.lbContent.string = this.guideConfig["text"];
        this.notice();
    },

    notice(){
        TweenScale.begin(this.circleNode, cc.v2(3, 3), cc.v2(1, 1), 0.2, 1);
    },

    update() {

    },

    onDestroy() {
        databus.gamePause = false
    },

    onTouchBg(event){
        let point = event.getLocation();
        let retWord = this.circleNode.getBoundingBoxToWorld();
        let space = 40;
        retWord.width -= space;
        retWord.width = retWord.width <= 0 ? 0 : retWord.width;
        retWord.height -= space;
        retWord.height = retWord.height <= 0 ? 0 : retWord.height;
        if (retWord.contains(point)) {
            this.node._touchListener.setSwallowTouches(false);
        } else {
            this.node._touchListener.setSwallowTouches(true);
            this.notice();
        }
    },

    Init(guideConfig) {
        this.guideConfig = guideConfig;
    }
})    