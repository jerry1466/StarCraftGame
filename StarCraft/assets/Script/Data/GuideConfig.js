let data =
{
    "broke":
        {
            "text":"由于生态破坏吗，美丽的星球家园上出现了破损",
            "uiName":"Broke0",
            "offset":[0, -77],
            "timeout":4.5,
            "next":"fixBtn",
        },
    "fixBtn":
        {
            "text":"点击修复按钮，可依次修复这些破损",
            "uiName":"BtnFix",
            "offset":[0, -77],
        },
    "fixCostMeteor":
        {
            "text":"现在开始，修复需要使用到流星",
            "uiName":"FixCost",
            "offset":[0, -77],
            "timeout":1.5,
            "next":"searchMeteor",
        },
    "searchMeteor":
        {
            "text":"两手空空的你，试着去寻找流星吧",
            "uiName":"BtnSearch",
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