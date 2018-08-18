import BasicResLoading from 'BasicResLoading'
import ResConfig from 'ResConfig'

cc.Class({
    extends:BasicResLoading,
    Load(){
        cc.loader.load(ResConfig.GetAllRes(), this.progressCallback.bind(this), this.completeCallback.bind(this))
    },

    progressCallback(completeCount, totalCount, res) {
        this._progress = completeCount / totalCount;
    },

    completeCallback(){
        this._complete = true;
    },

    GetProgress(){return this._progress},
    IsComplete(){return this._complete || false}
})