/**
 * AsyncImageLoading
 * @author lijun
 **/
import ResConfig from 'ResConfig'

export default class AysncImageLoading{
    static Load(){
        if(CC_WECHATGAME)
        {
            cc.loader.load(ResConfig.GetAsyncRes());
        }
        else
        {
            var resList = ResConfig.GetAsyncRes();
            this.doLoadRes(resList);
        }
    }

    static doLoadRes(resList){
        if(resList.length > 0){
            var loadRes = resList.shift();
            var that = this;
            cc.loader.loadRes(loadRes, function(err, image){
                that.doLoadRes(resList);
            })
        }
    }
}