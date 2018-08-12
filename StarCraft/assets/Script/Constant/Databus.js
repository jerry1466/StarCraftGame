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
        this.screenRatio = 1
        this.adHeight = 110
        this.gameRegion = cc.v2(370, 550)
        /**************用户数据*************/
        this.userInfo = {
            curStarId:1001,
            diamond:0,
            meteor:0,
            brokeFixIndex:-1
        }
    }

    GetInstance() {
        if (instance == null) {
            instance = new Databus()
        }
        return instance
    }
}