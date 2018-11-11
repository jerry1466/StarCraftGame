/**
 * ResourceManager
 * @auhor clairli
 */
export default class ResourceManager {
    static LoadRemoteSprite(sp, imageUrl) {
        var spCom;
        if(sp instanceof cc.Sprite)
        {
            spCom = sp;
        }
        else if(sp instanceof cc.Node)
        {
            spCom = sp.getComponent(cc.Sprite);
        }
        else
        {
            spCom = sp.node.getComponent(cc.Sprite);
        }
        if(spCom)
        {
            if(CC_WECHATGAME){
                cc.loader.load(imageUrl, function(err, texture){
                    var frame = new cc.SpriteFrame(texture);
                    spCom.trim = false;
                    spCom.type = cc.Sprite.Type.SIMPLE;
                    spCom.spriteFrame = frame;    
                });
            }else{
                var frame = new cc.SpriteFrame(cc.loader.getRes(imageUrl));
                spCom.trim = false;
                spCom.type = cc.Sprite.Type.SIMPLE;
                spCom.spriteFrame = frame;
            }
        }
    }
}