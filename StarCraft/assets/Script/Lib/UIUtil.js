import ModuleManager from "ModuleManager"
import TweenPosition from "TweenPosition"
import TweenScale from "TweenScale"

let noticeList = []
export default class UIUtil {
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

    static Confirm(tip, confirmHandler){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirm", content:tip, confirm:confirmHandler})
    }

    static ConfirmCancel(tip, confirmHandler, cancelHandler){
        ModuleManager.GetInstance().ShowModule("MessageBox",
            {"mode":"confirmCancel", content:tip, confirm:confirmHandler, cancel:cancelHandler})
    }

    static ShowMoneyNotice(moneyType, moneyNum, parent, offset){
        if(parent == null) return;
        var moneyIconName;
        if(moneyType == 1)
        {
            moneyIconName = "Icon_Diamond"
        }
        else
        {
            moneyIconName = "Icon_Meteor"
        }
        var notice = "<img src=\'" + moneyIconName + "\'> + " + moneyNum;
        var noticeLabel = new cc.Node();
        var richTextCom = noticeLabel.addComponent(cc.RichText);
        richTextCom.string = notice
        noticeList.push(noticeLabel);
        parent.addChild(noticeLabel);
        noticeLabel.setPosition(offset.x, offset.y);
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
        var tweenPos = TweenPosition.begin(noticeLabel, noticeLabel.position, cc.v2(noticeLabel.x, noticeLabel.y + 50), 1)
        var tweenScale = TweenScale.begin(noticeLabel, cc.v2(0.2, 0.2), cc.v2(1, 1), 0.3, 1)
        tweenPos.onFinishCallBack = function(){
            noticeLabel.removeFromParent()
            noticeLabel.destroy()
        }
        tweenScale.onFinishCallBack = function(){
            TweenAlpha.begin(noticeLabel, 1, 0.3, 0.7, 1)
        }
    }
}