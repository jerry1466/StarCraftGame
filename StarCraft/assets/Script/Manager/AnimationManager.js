/**
 * AnimationManager
 * @auhor clairli
 */
let AnimConfig =
{
    "fogRemove":
    {
        "key":"fogRemove/fogRemove",
        "length":14,
    },
    "rewardBox":
    {
        "key":"rewardBox/rewardBox",
        "length":8,
    },
    "cardSuccess":
    {
        "key":"cardSuccess/cardSuccess",
        "length":54,
    },
    "cardFail":
    {
        "key":"cardFail/cardFail",
        "length":7,
    },
    "cardPerfect":
    {
        "key":"cardPerfect/cardPerfect",
        "length":33,
    }
}
export default class AnimationManager {
    constructor() {

    }

    static PlayAnim(animName, parent, offset, callback, isLoop, scale) {
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        node.parent = parent;
        if(scale == null)
        {
            scale = cc.v2(1, 1);
        }
        node.setScale(scale);
        node.setPosition(offset);
        var animation = node.addComponent(cc.Animation);
        var cfg = AnimConfig[animName];
        if(cfg == null)
        {
            console.error("找不到动画配置:", animName);
            callback();
            return;
        }
        var frames = [];
        var length = cfg["length"];
        for(let i = 1; i <= length; i++)
        {
            var cntName;
            if(i < 10)
            {
                cntName = "000" + i;
            }
            else
            {
                cntName = "00" + i;
            }
            frames[i - 1] = new cc.SpriteFrame(cc.url.raw('resources/AnimClip/' + cfg["key"] + cntName + '.png'));
        }
        var clip = cc.AnimationClip.createWithSpriteFrames(frames, length);
        clip.name = 'anim';
        animation.addClip(clip);
        animation.play('anim');
        if(isLoop)
        {
            clip.wrapMode = cc.WrapMode.Loop;
        }
        else
        {
            animation.on('finished', function(){
                node.removeFromParent();
                node.destroy();
                node = null;
                if(callback)
                {
                    callback();
                }
            });
        }
    }
}