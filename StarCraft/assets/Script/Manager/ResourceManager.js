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
            var frame = new cc.SpriteFrame(cc.loader.getRes(imageUrl))
            //spCom.spriteFrame = frame
        }
    }
}