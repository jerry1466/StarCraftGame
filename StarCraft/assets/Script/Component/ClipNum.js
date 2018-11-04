import ResourceManager from "ResourceManager"
import ResConfig from "ResConfig"

cc.class({
    symbol:cc.Node,
    num0:cc.Node,
    num1:cc.Node,
    num2:cc.Node,
    num3:cc.Node,
    num4:cc.Node,

    Init(num, showSymbol = true){
        this.symbol.active = showSymbol;
        var numStr = num.toString();
        for(var i = 0; i < 5; i++){
            if(i < numStr.length){
                this["num" + i].active = true;
                ResourceManager.LoadRemoteSprite(thisp["num" + i], ResConfig.SmallNum(parseInt(numstr[i])));
            }else{
                this["num" + i].active = false;
            }
        }
    }
})