let instance
export default class LoginManager{
    constructor(){

    }

    static GetInstance(){
        if(instance == null){
            instance = new LoginManager()
            instance.domain = "https://2zhuji.cn"
            instance.token = "fktd1531820173"
            instance.login_data={}
            instance.host={}
            instance.login_flag=false
            instance.callback=null
            instance.data={}
            instance.key_login="game_userinfo"

        }
        return instance
    }

    WxLogin(login_data,callback){
        let that = this;
        if(this.login_flag||this.callback){
            return;
        }
        this.login_flag=true;
        if(callback){
            this.callback=callback;
        }
        wx.login({
            success: function (login_res) {
                let code = login_res.code;
                wx.request({
                    url: that.domain + '/index.php?g=Wap&m=Wxaapi&a=login&token=' + that.token + '&code=' + code,
                    data:{code:code},
                    success:function(res){
                        console.log("wx request============", res.data)
                        if(res.data.status == 4001){
                            var session_3rd = res.data.session_3rd;
                            //服务器已有用户信息
                            if(res.data.userinfo && res.data.userinfo.wecha_id){
                                that.host = res.data.userinfo;
                                that.host["session_3rd"] = res.data.session_3rd;
                                that.loginSuccess();
                                console.log("login success============")
                            }else{
                                //新用户首次授权
                                that.getUserBySession(session_3rd,login_data.encryptedData,login_data.iv,res.data.new_user);
                            }
                        }
                    },
                });
            },
            fail: function (res) {

            },
            complete: function (res) {

            },
        });
    }
    getUserBySession(session_3rd,encryptedData,iv,new_user) {
        var _this = this;
        //获取unionid
        wx.request({
            url: _this.domain + '/index.php?g=Wap&m=Wxaapi&a=getunionid',
            method: 'GET',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                session_3rd: session_3rd,
                encrypted: encryptedData,
                iv: iv
            },
            success: function (res) {
                if (res.data && res.data.wecha_id) {
                    _this.host = res.data;
                    _this.host["session_3rd"] = session_3rd;
                    _this.host["new_user"] = new_user;
                    _this.loginSuccess();
                    _this.login_flag=false;
                }else{
                    _this.loginFail();
                }
            }
        })
    }
    loginSuccess(){
        //授权成功
        //用户信息存本地
        wx.setStorage({
            key: this.key_login,
            data: {
                session_3rd: this.host.session_3rd,
                host:this.host
            }
        });

        if(this.callback){
            this.callback(null,this.host);
            this.callback=null;
        }
    }
    loginFail(){
        //授权登陆失败
        if(this.callback){
            this.callback("fail");
            this.callback=null;
        }
    }
}