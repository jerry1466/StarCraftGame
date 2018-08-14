/**
 * BaseIconBar
 * @author lijun
 **/
import BaseFrame from 'BaseFrame'
import EventUtil from 'EventUtil'
import PrefabUtil from 'PrefabUtil'

cc.Class({
    extends: BaseFrame,
    properties: {

    },

    AddFunction(iconCfg){
        var that = this
        PrefabUtil.GetPrefabInstance("MainIcon", function(instance){
            if(instance)
            {
                var icon = instance;
                that.node.addChild(icon)
                var mainIcon = icon.getComponent("MainIcon");
                mainIcon.Init(iconCfg);
                var button = icon.getComponent(cc.Button)
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = that.node;
                clickEventHandler.component = "BaseIconBar";//这个是代码文件名
                clickEventHandler.handler = "onIconClick";
                clickEventHandler.customEventData = iconCfg;
                button.clickEvents.push(clickEventHandler);
            }    
        })
    },

    onIconClick(iconCfg){
        if(iconCfg)
        {
            EventUtil.GetInstance().DispatchEvent(iconCfg["clickEvent"]);
        }
    }
})