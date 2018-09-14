import UIUtil from "UIUtil";
import GuideConfig from "GuideConfig";
import SceneManager from "SceneManager";
import Databus from "Databus"

let guideInst;
let curGuideKey;
let databus = new Databus();
export default class GuideManager{
    static SetGuidePrefab(res){
        guideInst = cc.instantiate(res);
    }

    static AddGuide(key, root){
        if(!databus.guideEnable)
        {
            return;
        }
        if(this.HasGuide(key))
        {
            return;
        }
        var guideCfg = GuideConfig.GetGuideConfig(key);
        if(guideCfg == null)
        {
            console.error("没有找到对应的引导配置", key);
            return;
        }
        var prev = guideCfg["prev"]
        if(prev)
        {
            for(var i = 0; i < prev.length; i++)
            {
                if(!this.HasGuide(prev[i]))
                {
                    return;
                }
            }
        }
        var nodeName = guideCfg["uiName"];
        var targetNode = UIUtil.FindNodeRecursion(root, nodeName);
        if(targetNode)
        {
            curGuideKey = key;
            guideInst.parent = SceneManager.GetInstance().rootCanvas();
            var worldPos = UIUtil.ToCanvasCoord(targetNode);
            guideInst.setPosition(worldPos);
            var guideCom = guideInst.getComponent("Guide");
            guideCom.Init(guideCfg, targetNode);
        }
        else
        {
            console.error("没有找到对应的引导节点", nodeName);
        }
    }

    static RemoveGuide(){
        if(!this.HasGuide(curGuideKey))
        {
            databus.userInfo.guidedList.push(curGuideKey);
        }
        var guideCom = guideInst.getComponent("Guide");
        guideInst.removeFromParent();
        guideCom.Dispose();
        var guideConfig = GuideConfig.GetGuideConfig(curGuideKey)
        if(guideConfig && guideConfig["next"])
        {
            GuideManager.AddGuide(guideConfig["next"], SceneManager.GetInstance().rootCanvas());
        }
    }

    static HasGuide(key){
        return databus.userInfo.guidedList.indexOf(key) >= 0
    }
}