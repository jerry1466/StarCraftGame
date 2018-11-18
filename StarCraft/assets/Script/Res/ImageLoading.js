import BasicResLoading from 'BasicResLoading';
import ResConfig from 'ResConfig';
import Databus from 'Databus';

let databus = new Databus();
cc.Class({
    extends:BasicResLoading,
    Load(){
        if(CC_WECHATGAME)
        {
            // cc.loader.load(ResConfig.GetSyncRes(databus.userInfo.curStarId), this.progressCallback.bind(this), this.completeCallback.bind(this))
            var that = this;
            console.log("zipUrl:" + ResConfig.GetZipRes());
            var downLoadTask = wx.downloadFile({
                url:ResConfig.GetZipRes(),
                success:function(res){
                    var filePath = res.tempFilePath;
                    var fileManager = wx.getFileSystemManager();
                    fileManager.unzip({
                        zipFilePath:filePath,
                        targetPath:wx.env.USER_DATA_PATH,
                        success:function(res){
                            fileManager.readdir({
                                dirPath:wx.env.USER_DATA_PATH + "/Texture",
                                success:function(res){
                                    that._complete = true;
                                    console.error("解压资源成功", res); 
                                }
                            })
                        },
                        fail:function(res){
                           console.error("解压资源失败"); 
                        }
                    })
                },
                fail:function(res){
                    wx.showToast({title:'加载资源失败，请检查您的网络设置'})
                }
            });
            downLoadTask.onProgressUpdate((res) => {
                that._progress = res.progress * 0.01; // 下载的进度
                console.log("WX Image Loading progress:", that._progress);
            });
        }
        else
        {
            var resList = ResConfig.GetSyncRes(databus.userInfo.curStarId);
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