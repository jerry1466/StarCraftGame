import UIUtil from "UIUtil";
import GuideConfig from "GuideConfig";

let guideInst;
export default class GuideManager{
    static SetGuidePrefab(res){
        guideInst = res;
    }

    static AddGuide(key, root, nodeName){
        var targetNode = UIUtil.FindNodeRecursion(root, nodeName);
        if(targetNode)
        {
            guideInst.parent = targetNode.parent;
            guideInst.setPosition(targetNode.position);
            var guideCfg = GuideConfig.GetGuideConfig(key);
            var guideCom = guideInst.getComponent("Guide");
            if(guideCfg == null)
            {
                console.error("没有找到对应的引导配置", key);
                return;
            }
            guideCom.Init(guideCfg);
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