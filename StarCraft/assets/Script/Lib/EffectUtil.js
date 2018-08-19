/**
 * EffectUtil
 * @auhor clairli
 */
import PrefabUtil from "PrefabUtil";
import TweenScale from "TweenScale";

export default class EffectUtil {
    constructor() {

    }

    static PlayEffect(url, parentNode, position) {
        PrefabUtil.GetPrefabInstance(url, function(success, instance){
            if(success)
            {
                instance.parent = parentNode
                instance.x = position.x
                instance.y = position.y
                var tweenScale = TweenScale.begin(instance, cc.v2(0, 0), cc.v2(1, 1), 0.5, 1)
                tweenScale.onFinishCallBack = function() {
                    instance.removeFromParent()
                    instance.destroy()
                }
            }
        })
    }

    static PlayFullScreenEffect(effectName, anim, parentNode, position, callback) {
        PrefabUtil.GetPrefabInstance("Effect/" + effectName, function(success, instance){
            if(success)
            {
                instance.parent = parentNode
                instance.x = position.x
                instance.y = position.y
                var animationCom = instance.getComponent(cc.Animation);
                animationCom.once('finished', function(){
                    if(callback)
                    {
                        instance.removeFromParent();
                        instance.destroy();
                        instance = null;
                        callback();
                    }
                });
                animationCom.play(anim);
            }
        })
    }
}