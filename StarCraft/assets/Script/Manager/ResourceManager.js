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
                console.log("start load imageUrl:", imageUrl);
                cc.loader.load(imageUrl, function(err, texture){
                    console.log("loaded imageUrl:", imageUrl);
                    var frame = new cc.SpriteFrame(texture);
                    if(spCom && spCom.node){
                        spCom.trim = false;
                        spCom.type = cc.Sprite.Type.SIMPLE;
                        spCom.spriteFrame = frame;    
                    }
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