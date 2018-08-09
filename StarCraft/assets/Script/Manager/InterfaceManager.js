import SceneManager from "SceneManager";
import Databus from 'Databus'

let databus = new Databus()
/**
 * InterfaceManager
 * @auhor clairli
 */
let instance
let shareOpenIds
export default class InterfaceManager {
    constructor() {

    }

    static GetInstance() {
        if (instance == null) {
            instance = new InterfaceManager()
            shareOpenIds = []
        }
        return instance
    }

    Share(title){
        wx.shareAppMessage({title:title})
    }

    RegisterShareAppMessageHandler(){
        wx.showShareMenu({
            withShareTicket: true
        })
        var imageArr = databus.cfgData.set.share.img
        var imageUrlIndex = Math.floor(Math.random() * imageArr.length)
        var temp = this
        wx.onShareAppMessage(function() {
            return {
                title: temp.getTitle(),
                imageUrl: imageArr[imageUrlIndex]
            }
        })
    }

    ShareWithImg(){
        var imageArr = databus.cfgData.set.share.img
        var imageUrlIndex = Math.floor(Math.random() * imageArr.length)
        var temp = this
        wx.shareAppMessage({
                title: temp.getTitle(),
                imageUrl: imageArr[imageUrlIndex],
                success(res){
                    console.log('res分享成功', res)
                    databus.gamePause = false
                    if(res.shareTickets)
                    {
                        wx.getShareInfo({
                            shareTicket: res.shareTickets[0],
                            success(res) {
                                res.errMsg; // 错误信息
                                res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                                res.iv; // 加密算法的初始向量
                                var addItemNum = true;
                                for(var i = 0; i < shareOpenIds.length; i++)
                                {
                                    if(shareOpenIds[i] == res.encryptedData)
                                    {
                                        addItemNum = false;
                                        break;
                                    }
                                }
                                if(addItemNum)
                                {
                                    shareOpenIds.push(res.encryptedData);
                                    wx.showToast({title:'分享成功！\n道具数量 + 1'});
                                    databus.itemNumMax[0]++;
                                    databus.itemNum[0]++;
                                }
                                else
                                {
                                    wx.showToast({title:'请分享到不同的群'});
                                }
                            },
                            fail() {},
                            complete() {}
                        })
                    }
                },
                fail(res){
                    databus.gamePause = false
                    console.log('res分享失败', res)
                }
            }
        )
    }

    ShareWithScore(){
        var imageArr = databus.cfgData.set.share.img
        var imageUrlIndex = Math.floor(Math.random() * imageArr.length)
        var temp = this
        wx.shareAppMessage({
                title: temp.getTitleWithScore(),
                imageUrl: imageArr[imageUrlIndex],
                success(res){
                    console.log('res分享成功', res)
                    if(res.shareTickets)
                    {
                        wx.getShareInfo({
                            shareTicket: res.shareTickets[0],
                            success(res) {
                                res.errMsg; // 错误信息
                                res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                                res.iv; // 加密算法的初始向量
                                var addItemNum = true;
                                for(var i = 0; i < shareOpenIds.length; i++)
                                {
                                    if(shareOpenIds[i] == res.encryptedData)
                                    {
                                        addItemNum = false;
                                        break;
                                    }
                                }
                                if(addItemNum)
                                {
                                    shareOpenIds.push(res.encryptedData);
                                    wx.showToast({title:'分享成功！\n道具数量 + 1'});
                                    databus.itemNumMax[0]++;
                                    databus.itemNum[0]++;
                                }
                                else
                                {
                                    wx.showToast({title:'请分享到不同的群'});
                                }
                            },
                            fail() {},
                            complete() {}
                        })
                    }
                },
                fail(res){
                    console.log('res分享失败', res)
                }
            }
        )
    }

    getTitle(){
        return databus.cfgData.set.share.title[0].replace("%name", databus.productName)
    }

    getTitleWithScore(){
        var first = Math.floor((databus.mission - 1) / 3) + 1
        var second = (databus.mission - 1) % 3 + 1
        var withScoreStr = databus.cfgData.set.share.score_title[0].replace("%score", databus.mission)
        return withScoreStr
    }

    CreateAdViedo(adUnitId, callback){
        var videoAdd = wx.createRewardedVideoAd({
            adUnitId:adUnitId
        })
        videoAdd.onLoad(()=>{console.log("广告组件拉取成功")})
        videoAdd.show()
            .catch(err => {
            videoAdd.load()
            .then(() => videoAdd.show())
        })
        videoAdd.onClose(res=>{
            if(res && res.isEnded || res === undefined)
            {
            //正常结束
                if(callback)
                {
                    callback()
                }
            }
            else
            {
                //异常退出
                console.log(res)
            }
        })
    }

    CreateAdBanner(adUnitId){
        var bannerAd = wx.createBannerAd({
            adUnitId: adUnitId,
            style: {
                left: 0,
                top: databus.screenHeight - databus.adHeight,
                width: databus.screenWidth
            }
        })

        bannerAd.show().catch(err => console.log(err))
        bannerAd.onError(err => {
            console.log(err)
        })

        databus.adBanner = bannerAd
    }

    DestroyAdBanner(){
        if(databus.adBanner){
            databus.adBanner.destroy()
        }
    }
}