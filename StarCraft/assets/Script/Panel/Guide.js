/**
 * Guide
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import Databus from 'Databus'
import TweenScale from 'TweenScale'
import TweenAlpha from 'TweenAlpha'
import TweenPosition from 'TweenPosition'
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";
import GuideManager from "GuideManager";

let databus = new Databus()
let delay;
cc.Class({
    extends: BasePanel,
    properties: {
        cover:cc.Sprite,
        bgContent:cc.Sprite,
        lbContent: cc.Label,
        circleNode:cc.Node,
        pointNode:cc.Node,
        arrowUp:cc.Node,
        arrowDown:cc.Node,
        arrowLeft:cc.Node,
        arrowRight:cc.Node,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.cover, ResConfig.FogIcon());
        this.cover.node.width = this.cover.node.height = 3000;
        this.node.width = this.node.height = 3000;
    },

    refresh(){
        this.lbContent.string = this.guideConfig["text"];
        var offset = cc.v2(this.guideConfig["offset"][0], this.guideConfig["offset"][1]);
        this.bgContent.node.setPosition(cc.v2(this.guideConfig["offset"][0], this.guideConfig["offset"][1]));
        if(this.guideConfig["slide"])
        {
            this.circleNode.active = false;
            this.pointNode.active = true;
            var tarPos = new cc.v2(this.guideConfig["sliderOffset"][0], this.guideConfig["sliderOffset"][1]);
            TweenPosition.begin(this.pointNode, cc.v2(0, 0), tarPos, 1);
        }
        else
        {
            this.pointNode.active = false;
            this.circleNode.active = true;
            this.circleNode.width = this.tarNode.width * this.tarNode.scaleX + 20;
            this.circleNode.height = this.tarNode.height * this.tarNode.scaleY + 20;
        }
        this.arrowUp.active = offset.y < 0 && Math.abs(offset.y) > Math.abs(offset.x);
        this.arrowDown.active = offset.y > 0 && Math.abs(offset.y) > Math.abs(offset.x);
        this.arrowLeft.active = offset.x > 0 && Math.abs(offset.x) > Math.abs(offset.y);
        this.arrowRight.active = offset.x < 0 && Math.abs(offset.x) > Math.abs(offset.y);
        this.notice();
    },

    notice(){
        // TweenScale.begin(this.circleNode, cc.v2(1,1), cc.v2(1.04, 1.04), 0.6, -1);
        TweenAlpha.begin(this.bgContent.node, 100, 255, 0.75, 1);
    },

    update() {

    },

    Dispose() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
        databus.gamePause = false;
    },

    onTouchBg(event){
        if(this.circleNode.active)
        {
            let point = event.getLocation();
            let retWord = this.circleNode.getBoundingBoxToWorld();
            let space = 0;
            retWord.width -= space;
            retWord.width = retWord.width <= 0 ? 0 : retWord.width;
            retWord.height -= space;
            retWord.height = retWord.height <= 0 ? 0 : retWord.height;
            if (retWord.contains(point)) {
                this.node._touchListener.setSwallowTouches(false);
                if(delay)
                {
                    clearTimeout(delay);
                    delay = null;
                }
                GuideManager.RemoveGuide(true);
            } else {
                this.node._touchListener.setSwallowTouches(true);
            }
        }
    },

    Init(guideConfig, node) {
    	if (guideConfig["zIndex"]) {
			this.node.zIndex = guideConfig["zIndex"]
    	}
        this.guideConfig = guideConfig;
        this.tarNode = node;
        this.refresh();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
        databus.gamePause = true;
        if(this.guideConfig["timeout"])
        {
            var that = this;
            delay = setTimeout(function()
            {
                clearTimeout(delay);
                delay = null;
                GuideManager.RemoveGuide(true);
            }, this.guideConfig["timeout"] * 1000);
        }
    }
})    