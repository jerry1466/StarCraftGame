import UIUtil from "UIUtil";
import GuideConfig from "GuideConfig";
import SceneManager from "SceneManager";

let guideInst;
export default class GuideManager{
    static SetGuidePrefab(res){
        guideInst = cc.instantiate(res);
    }

    static AddGuide(key, root){
        var guideCfg = GuideConfig.GetGuideConfig(key);
        if(guideCfg == null)
        {
            console.error("没有找到对应的引导配置", key);
            return;
        }
        var nodeName = guideCfg["uiName"];
        var targetNode = UIUtil.FindNodeRecursion(root, nodeName);
        if(targetNode)
        {
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
        guideInst.removeFromParent();
    }
}