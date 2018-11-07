import ResourceManager from "ResourceManager"
import ResConfig from "ResConfig"

cc.Class({
    extends: cc.Component,
    properties: {
        symbol:cc.Node,
        num0:cc.Node,
        num1:cc.Node,
        num2:cc.Node,
        num3:cc.Node,
        num4:cc.Node,
    },

    Init(num, showSymbol = true, style = 0){
        this.symbol.active = showSymbol;
        if(showSymbol){
            ResourceManager.LoadRemoteSprite(this["num" + i], ResConfig.Symbol());
        }
        var numStr = num.toString();
        for(var i = 0; i < 5; i++){
            if(i < numStr.length){
                // this["num" + i].active = true;
                if(style == 0){
                    ResourceManager.LoadRemoteSprite(this["num" + i], ResConfig.SmallNum(parseInt(numStr[i])));
                }else{
                    ResourceManager.LoadRemoteSprite(this["num" + i], ResConfig.BigNum(parseInt(numStr[i])));
                }
            }else{
                // this["num" + i].active = false;
            }
        }
    }
})