/**
 * DataIO
 * @auhor clairli
 */
let instance
export default class DataIO {
    constructor() {

    }

    static SaveData(key, value, callback) {
        /*
        if(CC_WECHATGAME)
        {
            let kvData = [{key:key, value:value}];
            wx.setUserCloudStorage({
                KVDataList:kvdata,
                fail:res=>{
                    console.error("写数据失败", res)
                },
                complete:{
                    if(callback)
                    {callback();}
                }
            })
        }
        */
        if(CC_WECHATGAME)
        {
            wx.setStorageSync(key, value);
            if(callback){
                callback();
            }
        }
    }

    static SaveDataList(kvDataList, callback) {
        /*
        if(CC_WECHATGAME)
        {
            wx.setUserCloudStorage({
                KVDataList:kvDataList,
                fail:res=>{
                    console.error("写数据失败", res)
                },
                complete:{
                    if(callback)
                    {callback();}
                }
            })
        }
        */
        if(CC_WECHATGAME)
        {
            for(var i = 0; i < kvDataList.length; i++)
            {
                this.SaveData(kvDataList[i].key, kvDataList[i].value);
            }
            if(callback)
            {
                callback();
            }
        }
    }

    static GetData(key) {
        if(CC_WECHATGAME)
        {
            return wx.getStorageSync(key);
        }
    }

    static GetDataList(keyList){
        var valueList = [];
        if(CC_WECHATGAME)
        {
            for(var i = 0; i < keyList.length; i++)
            {
                valueList.push(wx.getStorageSync(keyList[i]));
            }
        }
        return valueList;
    }
}