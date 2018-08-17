/**
 * Databus
 * @auhor clairli
 */
let instance
export default class Databus {
    constructor() {
        if (instance)
            return instance

        instance = this

        this.productName = "我的星球"
        this.shortProductName = "StarCraft"
        this.cfgUrl = "https://wxa.05babay.cn/index.php?g=Wap&m=WxaGame&a=get_config&token=fktd1531820173"
        this.soundEnable = true
        this.screenWidth = 375
        this.screenHeight = 812
        this.screenTop = databus.screenHeight
        this.screenButtom = 0
        this.screeLeft = 0 - databus.screenWidth / 2
        this.screeRight = databus.screenWidth / 2
        this.screenRatio = 1
        this.adHeight = 110
        this.gameRegion = cc.v2(370, 550)
        this.mazeRow = 15
        this.mazeColumn = 10
        /**************用户数据*************/
        this.userInfo = {
            curStarId:1001,
            diamond:0,
            meteor:0,
            brokeFixIndex:-1
        }
    }

    Reset(){
        this.passGuide = false;
        this.guide1 = false;
        this.guide2 = false;
        this.guide3 = false;
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

    GetInstance() {
        if (instance == null) {
            instance = new Databus()
        }
        return instance
    }
}