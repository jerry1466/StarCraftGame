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

cc.Class({
    extends: BasePanel,
    properties: {
        mask:cc.Node,
        cover:cc.Sprite,
        bgContent:cc.Sprite,
        lbContent: cc.Label,
        circleNode:cc.Node,
        pointNode:cc.Node,
    },

    onLoad(){
        ResourceManager.LoadRemoteSprite(this.bgContent, ResConfig.BigBtn());
        ResourceManager.LoadRemoteSprite(this.cover, ResConfig.FogIcon());
        this.cover.node.width = this.cover.node.height = 3000;
        this.node.width = this.node.height = 3000;
    },

    refresh(){
        this.lbContent.string = this.guideConfig["text"];
        this.bgContent.node.setPosition(cc.v2(this.guideConfig["offset"][0], this.guideConfig["offset"][1]));
        this.mask.width = this.tarNode.width * this.tarNode.scaleX;
        this.mask.height = this.tarNode.height * this.tarNode.scaleY;
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
            this.circleNode.width = this.mask.width + 20;
            this.circleNode.height = this.mask.height + 20;
        }
        this.notice();
    },

    notice(){
        TweenScale.begin(this.circleNode, cc.v2(1,1), cc.v2(1.04, 1.04), 0.6, -1);
        TweenAlpha.begin(this.bgContent.node, 100, 255, 0.75, 1);
    },

    update() {

    },

    Dispose() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
        databus.gamePause = false;
        if(null != this.delay)
        {
            clearTimeout(this.delay);
            this.delay = null;
        }
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
            this.delay = setTimeout(function()
            {
                GuideManager.RemoveGuide(true);
            }, this.guideConfig["timeout"] * 1000)
        }
    }
})    