import ModuleManager from "ModuleManager"
import TweenPosition from "TweenPosition"
import TweenAlpha from "TweenAlpha"
import ResConfig from "ResConfig";
import SceneManager from "SceneManager";
import LevelManager from "LevelManager";

let noticeList = []
let noticePrefab;
let noticeInst;
export default class UIUtil {
    static SetNoticePrefab(prefab){
        noticePrefab = prefab;
    }

    static GetNoticeInst(){
        return cc.instantiate(noticePrefab);
    }

    static FindNodeRecursion(root, nodeName){
        if(root.name == nodeName)
        {
            return root;
        }
        var rootChildNum = root.childrenCount;
        for(var i = 0; i < rootChildNum; i++)
        {
            var node = this.FindNodeRecursion(root.children[i], nodeName);
            if(node != null)
            {
                return node;
            }
        }
        return null;
    }

    static FindNode(root, nodePath) {
        var nodeArr = nodePath.split('.')
        var curRoot = root
        for(var i = 0; i < nodeArr.length; i++)
        {
            var child = curRoot.getChildByName(nodeArr[i])
            if(child)
            {
                curRoot = child;
            }
        }
        if(i == nodeArr.length)
        {
            return curRoot;
        }
        else
        {
            return null;
        }
    }

    static ToWorldCoord(root, nodePath){
        var nodeArr = nodePath.split('.')
        var curRoot = root
        var coord = cc.v2(0, 0)
        for(var i = 0; i < nodeArr.length; i++)
        {
            var child = curRoot.getChildByName(nodeArr[i])
            if(child)
            {
                curRoot = child;
                coord.x += child.x * child.scaleX;
                coord.y += child.y * child.scaleY;
            }
        }
        return coord
    }

    static ToCanvasCoord(node){
        var coord = node.position;
        var parent = node.parent;
        while(parent != SceneManager.GetInstance().rootCanvas())
        {
            coord.x += parent.x * parent.scaleX;
            coord.y += parent.y * parent.scaleY;
            parent = parent.parent;
        }
        return coord;
    }

    static ToLocalCoord(worldPos, root, nodePath){
        var coord = cc.v2(worldPos.x, worldPos.y);
        var curRoot = root
        var nodeArr = nodePath.split('.');
        for(var i = 0; i < nodeArr.length; i++)
        {
            var child = curRoot.getChildByName(nodeArr[i]);
            if(child)
            {
                curRoot = child;
                coord.x -= child.x * child.scaleX;
                coord.y -= child.y * child.scaleY;
            }
        }
        return coord;
    }

    static Confirm(tip, confirmHandler, confirmText){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirm", content:tip, confirm:confirmHandler, confirmText:confirmText});
    }

    static ConfirmCancel(tip, confirmHandler, cancelHandler, confirmText, cancelText){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirmCancel", content:tip, confirm:confirmHandler, cancel:cancelHandler, confirmText:confirmText, cancelText:cancelText});
    }

    static ShowTextNotice(content, offset){
        var notice = this.GetNoticeInst();
        var noticeCom = notice.getComponent("Notice");
        noticeCom.Init(null, content);
        noticeList.push(notice);
        notice.x = offset.x;
        notice.y = offset.y;
        SceneManager.GetInstance().rootCanvas().addChild(notice);
        notice.active = false;
        this.doShowNotice();
    }

    static ShowMoneyNotice(moneyType, moneyNum, parent, offset){
        if(parent == null) return;
        var moneyIconRes;
        var color;
        if(moneyType == 1)
        {
            moneyIconRes = ResConfig.DiamondIcon();
            color = "<color=#EDF700>";
        }
        else
        {
            moneyIconRes = ResConfig.MeteorIcon();
            color = "<color=#FFD700>";
        }
        var noticeText = color + " + " + moneyNum + "</c>";
        var notice = this.GetNoticeInst();
        var noticeCom = notice.getComponent("Notice");
        noticeCom.Init(moneyIconRes, noticeText);
        noticeList.push(notice);
        notice.x = offset.x;
        notice.y = offset.y;
        parent.addChild(notice);
        notice.active = false;
        this.doShowNotice();
    }

    static doShowNotice(){
        if(noticeList.length > 0){
            var noticeLabel = noticeList.shift()
            var that = this
            this.displayNotice(noticeLabel, function(){
                that.doShowNotice()
            })
        }
    }

    static displayNotice(noticeLabel){
        noticeLabel.active = true;
        var tweenPos = TweenPosition.begin(noticeLabel, noticeLabel.position, cc.v2(noticeLabel.x, noticeLabel.y + 20), 1)
        var that = this;
        tweenPos.onFinishCallBack = function(){
            var noticeCom = noticeLabel.getComponent("Notice");
            if(noticeCom.res)
            {
                that.flyDiamond(noticeLabel.parent, cc.v2(noticeLabel.position.x - 25, noticeLabel.position.y - 15));
            }
            noticeLabel.removeFromParent()
            noticeLabel.destroy()
        }
        TweenAlpha.begin(noticeLabel, 255, 0, 1, 1);
    }

    static flyDiamond(parent, pos){
        if(new LevelManager().IsDropLevel())
        {
            return;
        }
        var diamondNode = new cc.Node();
        parent.addChild(diamondNode);
        diamondNode.setPosition(pos.x, pos.y);
        var spriteCon = diamondNode.addComponent(cc.Sprite);
        var uiPath = null;
        if(new LevelManager().IsBattleLevel())
        {
            spriteCon.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/Image/diamond_icon2.png'));
            uiPath = "Hud.DiamondCon";
        }
        else if(new LevelManager().IsMazeLevel())
        {
            spriteCon.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/Image/diamond_icon2.png'));
            uiPath = "DiamondCon";
        }
        if(uiPath)
        {
            var targetPos = this.ToWorldCoord(parent, uiPath);
            var tweenPos = TweenPosition.begin(diamondNode, diamondNode.position, cc.v2(targetPos.x - 40, targetPos.y), 1)
            tweenPos.onFinishCallBack = function(){
                diamondNode.removeFromParent();
                diamondNode.destroy();
                diamondNode = null;
            }
        }
        else
        {
            diamondNode.removeFromParent();
            diamondNode.destroy();
            diamondNode = null;
        }
    }
}