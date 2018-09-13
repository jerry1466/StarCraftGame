let data =
{
    "test":
        {
            "text":"请快快点击此处进入游戏",
            "uiName":"BtnEnter",
            "offset":[0, -77],
        },
    "myStarList":
        {
            "text":"这里可以查看所有的星球哦~",
            "uiName":"BtnMyStars",
            "offset":[-150, 0],
        }
}

export default class GuideConfig
{
    static GetGuideConfig(key){
        return data[key];
    }
}