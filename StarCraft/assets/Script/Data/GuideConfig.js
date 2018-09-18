/*
  text:引导时显示的文字
  uiName:指向的控件名称
  offset:引导文字框距离中心点的偏移
  timeout:指定时间后引导自动移除
  prev:前置引导（依赖其完成）
  next:引导结束后自动触发的下一个引导
 */
let data =
{
    "diamond":
        {
            "text":"欢迎来到我的星球\n这是你所拥有的钻石数",
            "uiName":"DiamondCon",
            "offset":[40, -77],
            "timeout":3.5,
            "next":"meteor",
        },
    "meteor":
        {
            "text":"流星也是一种资源\n这是你所拥有的流星数",
            "uiName":"MeteorCon",
            "offset":[0, -77],
            "timeout":2.5,
            "next":"productivity",
        },
    "productivity":
        {
            "text":"当前钻石的产量，拥有完好星球越多，产量越高",
            "uiName":"ProductivityCon",
            "offset":[40, -77],
            "timeout":2.5,
            "next":"broke",
        },
    "broke":
        {
            "text":"由于生态破坏，美丽的星球家园上出现了破损",
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
            "text":"修补后续的破损，需要使用到流星",
            "uiName":"FixCost",
            "offset":[0, 57],
            "timeout":2.5,
            "next":"searchMeteor",
        },
    "searchMeteor":
        {
            "text":"两手空空的你，试着去寻找流星吧",
            "uiName":"BtnSearch",
            "offset":[0, -87],
        },
    "myStarList":
        {
            "text":"这里可以查看所有的星球哦~",
            "uiName":"BtnMyStars",
            "offset":[-150, 0],
            "prev":["searchMeteor"],
        },
    "mazeWelcome":
        {
            "text":"欢迎来到流星平原!!\n这里可以尽情探索财富~",
            "uiName":"Map",
            "offset":[0, -337],
            "timeout":2.5,
            "next":"mazeCost",
        },
    "mazeCost":
        {
            "text":"在流星平原上的行走需要消耗钻石哦~",
            "uiName":"StepCostCon",
            "offset":[0, -77],
            "timeout":2.5,
            "next":"mazeStepLeft",
        },
    "mazeStepLeft":
        {
            "text":"在星球的左侧点击，星球将向左边移动",
            "uiName":"MazeMapCell82",
            "offset":[0, -77],
            "timeout":"2",
            "next":"mazeStepRight",
        },
    "mazeStepRight":
        {
            "text":"同理，在这一侧点击，星球将向右边移动",
            "uiName":"MazeMapCell88",
            "offset":[0, -77],
            "timeout":"2",
            "next":"mazeStepTop",
        },
    "mazeStepTop":
        {
            "text":"在星球的上方点击，星球将向上方移动",
            "uiName":"MazeMapCell25",
            "offset":[0, 57],
            "timeout":"2",
            "next":"mazeStepBottom",
        },
    "mazeStepBottom":
        {
            "text":"同理，在这一侧点击，星球将向下方移动",
            "uiName":"MazeMapCell145",
            "offset":[0, -57],
            "timeout":"2",
            "next":"mazeFirstStep",
        },
    "mazeFirstStep":
        {
            "text":"现在，请选择一侧点击，选择要行走的方向",
            "uiName":"FogTopMask",
            "offset":[0, -287],
        },
   	"gamePlanet":
   		{
			"text":"手指滑动，移动星球",
			"uiName":"Planet",
			"offset":[0, -70],
			"timeout":2.5,
			"next":"gameMeteor",
			"zIndex":200,
   		},
   	"gameMeteor":
   		{
			"text":"抓取流星",
			"uiName":"Meteor",
			"offset":[0, -50],
			"timeout":2.5,
			"next":"gameBlackHole",
			"zIndex":200,
   		},
   	"gameBlackHole":
   		{
			"text":"注意！避开黑洞",
			"uiName":"BlackHole",
			"offset":[0, -80],
			"timeout":2.5,
			"zIndex":200,
   		}
}

export default class GuideConfig
{
    static GetGuideConfig(key){
        return data[key];
    }
}