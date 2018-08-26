/**
 * ResourceManager
 * @auhor clairli
 */
export default class ResourceManager {
    static LoadRemoteSprite(sp, imageUrl) {
        var frame = new cc.SpriteFrame(cc.loader.getRes(imageUrl))
        //sp.spriteFrame = frame
    }
}