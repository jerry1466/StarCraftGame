/**
 * MissionSelectPanel
 * @author lijun
 **/
import BasePanel from 'BasePanel'
import ModuleManager from "ModuleManager";
import Databus from 'Databus'
import ResourceManager from 'ResourceManager'

let databus = new Databus()
cc.Class({
    extends: BasePanel,
    properties: {
        containerNode: cc.Node,
    },

    update() {

    },

    onDestroy() {

    },


    Init() {
        this.missionNodeList = []
        var missionCount = this.containerNode.getChildrenCount();
        for(var i = 1; i <= missionCount; i++)
        {
            var node = this.containerNode.getChildByName("MissionNode" + i);
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "MissionSelectPanel";//这个是代码文件名
            clickEventHandler.handler = "onMissionSelect";
            clickEventHandler.customEventData = i;

            var btnCom = node.getComponent("cc.Button");
            btnCom.clickEvents.push(clickEventHandler);
            this.missionNodeList.push(node);

            var sp = node.getChildByName("sp").getComponent("cc.Sprite");
            if(i <= databus.startMission)
            {
                ResourceManager.LoadRemoteSprite(sp, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/head/" + i + "-h.png")
            }
            else
            {
                ResourceManager.LoadRemoteSprite(sp, "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/head/unlock.png")
            }
        }
    },

    onMissionSelect(_, mission){
        console.log("select mission:", mission)
        if(mission <= databus.startMission)
        {
            ModuleManager.GetInstance().HideModule("MissionSelectPanel")
            ModuleManager.GetInstance().ShowModule("IntroducePanel", mission)
        }
        else
        {
            wx.showToast({title:'尚未解锁'});
        }
        //databus.startMission = mission
        //ModuleManager.GetInstance().HideModule("MissionSelectPanel")
    },

    onClose(){
        ModuleManager.GetInstance().HideModule("MissionSelectPanel")
    }
})    