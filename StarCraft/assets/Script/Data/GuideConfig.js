let data =
{
    "test":
        {
            "text":"请快快点击此处进入游戏",
            "uiName":"btnEnter",
        }
}

export default class GuideConfig
{
    static GetGuideConfig(key){
        return data[key];
    }
}