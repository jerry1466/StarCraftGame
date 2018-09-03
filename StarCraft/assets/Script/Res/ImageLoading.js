import BasicResLoading from 'BasicResLoading'
import ResConfig from 'ResConfig'

cc.Class({
    extends:BasicResLoading,
    Load(){
        if(CC_WECHATGAME)
        {
            cc.loader.load(ResConfig.GetAllRes(), this.progressCallback.bind(this), this.completeCallback.bind(this))
        }
        else
        {
            var resList = ResConfig.GetAllRes();
            this.loadedCount = 0;
            this.totalCount = resList.length;
            this._progress = 0;
            this.doLoadRes(resList);
        }
    },

    doLoadRes(resList){
        if(resList.length > 0){
            var loadRes = resList.shift();
            var that = this;
            cc.loader.loadRes(loadRes, function(err, image){
                that.loadedCount++;
                that._progress = that.loadedCount / that.totalCount;
                console.log("Image Loading progress:", that.loadedCount, that.totalCount);
                that.doLoadRes(resList);
            })
        }
        else
        {
            this._complete = true;
        }
    },

    progressCallback(completeCount, totalCount, res) {
        this._progress = completeCount / totalCount;
        console.log("Image Loading progress:", completeCount, totalCount);
    },

    completeCallback(){
        this._complete = true;
        console.log("completeCallback:", cc.loader.getRes("resources/Texture/diamondCon_bg.png"));
    },

    GetProgress(){return this._progress},
    IsComplete(){return this._complete || false}
})