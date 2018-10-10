/**
 * Databus
 * @auhor clairli
 */
import StarConfig from "StarConfig";

let instance
export default class Databus{
    constructor() {
        if (instance)
            return instance;

        instance = this;

        this.productName = "我的星球";
        this.shortProductName = "StarCraft";
        this.cfgUrl = "https://wxa.05babay.cn/index.php?g=Wap&m=WxaGame&a=get_config&token=fktd1531820173";
        this.soundEnable = true;
        this.screenWidth = 375;
        this.screenHeight = 850;
        this.screenTop = this.screenHeight / 2;
        this.screenButtom = 0 - this.screenHeight / 2;
        this.screenLeft = 0 - this.screenWidth / 2;
        this.screenRight = this.screenWidth / 2;
        this.screenRatio = 1;
        this.adHeight = 110;
        this.gameRegion = cc.v2(370, 550);
        this.mazeRow = 15;
        this.mazeColumn = 10;
        this.gameTimeLimit = 60;
        this.gameMaxHp = 1;
        this.bgMusic = "";
        this.shareRewardDiamond = 2000;
        this.guideEnable = false;
        this.showFog = true;
		this.showMazeIcon = false;
        /**************用户数据*************/
        this.userInfo = {
            curStarId:1001,
            maxStarId:1001,
            diamond:100000,
            meteor:0,
            brokeFixIndex:-1,
            mazeComplete:1,
            mazeAffairList:[],
            mazeCurLoc:-1,
            mazeStarId:0,
            guidedList:[]
        }
        /**************微信账号信息*************/
        this.wxUserInfo = {}
    }

    Reset(){
    }

    GetMoneyNum(moneyType){
        if(moneyType == 1)
        {
            return this.userInfo.diamond;
        }
        else if(moneyType == 2)
        {
            return this.userInfo.meteor;
        }
    }

    GetMoneyName(moneyType){
        if(moneyType == 1)
        {
            return "钻石";
        }
        else if(moneyType == 2)
        {
            return "流星";
        }
    }

    AddMoney(moneyType, num){
        if(moneyType == 1){
            this.userInfo.diamond += num;
            if(this.userInfo.diamond < 0){
                this.userInfo.diamond = 0;
            }
        }
        else if(moneyType == 2){
            this.userInfo.meteor += num;
            if(this.userInfo.meteor < 0){
                this.userInfo.meteor = 0;
            }
        }
    }

    IsCurStarFixed(){
        var brokeList = StarConfig.GetStarBrokeList(this.userInfo.curStarId);
        return this.userInfo.brokeFixIndex == (brokeList.length - 1);
    }
}