/**
 * Guide
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import Databus from 'Databus'
import TweenScale from 'TweenScale'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import GuideManager from "GuideManager";

let databus = new Databus()

cc.Class({
    extends: BasePanel,
    properties: {
        mask:cc.Node,
        cover:cc.Sprite,
        bgContent:cc.Sprite,
        lbContent: cc.Label,
        circleNode:cc.Node,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bgContent, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.circleNode, ResConfig.GuideCircle());
        ResourceManager.LoadRemoteSprite(this.cover, ResConfig.FogIcon());
        this.cover.node.width = this.cover.node.height = 3000;
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
    },

    start(){
        this.refresh();
    },

    refresh(){
        this.lbContent.string = this.guideConfig["text"];
        this.bgContent.node.setPosition(cc.v2(this.guideConfig["offset"][0], this.guideConfig["offset"][1]));
        this.mask.width = this.tarNode.width * this.tarNode.scaleX;
        this.mask.height = this.tarNode.height * this.tarNode.scaleY;
        this.circleNode.width = this.mask.width + 50;
        this.circleNode.height = this.mask.height + 20;
        this.notice();
    },

    notice(){
        TweenScale.begin(this.circleNode, cc.v2(1,1), cc.v2(1.1, 1.1), 0.6, -1);
    },

    update() {

    },

    onDestroy() {
        databus.gamePause = false
    },

    onTouchBg(event){
        let point = event.getLocation();
        let retWord = this.circleNode.getBoundingBoxToWorld();
        let space = 0;
        retWord.width -= space;
        retWord.width = retWord.width <= 0 ? 0 : retWord.width;
        retWord.height -= space;
        retWord.height = retWord.height <= 0 ? 0 : retWord.height;
        if (retWord.contains(point)) {
            this.node._touchListener.setSwallowTouches(false);
            GuideManager.RemoveGuide();
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    },

    Init(guideConfig, node) {
        this.guideConfig = guideConfig;
        this.tarNode = node;
        this.refresh();
    }
})    