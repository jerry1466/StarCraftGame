import LoginManager from 'LoginManager'
import BasePanel from 'BasePanel'
import Databus from 'Databus'
import EventUtil from "EventUtil"
import StatisticManager from "StatisticManager";
import ResourceManager from "ResourceManager";
import ResConfig from "ResConfig";

let databus = new Databus()
cc.Class({
    extends:BasePanel,
    properties: {
        bg:cc.Sprite,
        bannerBg:cc.Sprite
    },

    onLoad(){
        console.log('尝试用户登录！');
        ResourceManager.LoadRemoteSprite(this.bg, ResConfig.LoginPanelBg())
        ResourceManager.LoadRemoteSprite(this.bannerBg, ResConfig.MazeCellLine())
        var temp = this
        var local_info = wx.getStorageSync("game_userinfo")
        console.log("local_info",local_info);
        if(local_info){
            return;
        }
        temp.loginButton = wx.createUserInfoButton({
            type: 'text',
            text: '点击登录',
            style: {
                left: 0.5 * databus.screenWidth - 90,
                top: 0.5 * databus.screenHeight,
                width: 180,
                height: 35,
                lineHeight: 40,
                backgroundColor: '#3CB317',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        console.log(temp.loginButton)
        temp.loginButton.onTap((res)=> {
            if (res["encryptedData"] && res["iv"]) {
                databus.wxUserInfo = res.userInfo;
                res["userInfo"] = res.userInfo;
                LoginManager.GetInstance().WxLogin(res,function(fail,host){
                    if(fail)
                    {
                        console.log("用户登录失败", res)
                        temp.loginButton.hide()
                        EventUtil.GetInstance().DispatchEvent("EnterBattle")
                    }
                    else
                    {
                        temp.loginButton.hide()
                        EventUtil.GetInstance().DispatchEvent("EnterBattle")
                        StatisticManager.getInstance().statsTunnelUv(host);
                    }
                })
            }
        })
    },

    Init(){

    }
})