let res=
{
    "bg":
    {
        "main":"battle_bg.png",
        "diamondCon":"diamondCon_bg.png",
        "productivityCon":"productivityCon_bg.png",
        "meteorCon":"gameMeteor_bg.png",
        "fixCon":"costCon_bg.png",
		"findmeteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "messagebox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "starListItemBg":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "mazeBg":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "cutscene":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "starListPanel":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "guideDiamondBox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "fixCompleteBox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    },
    "icon":
    {
        "diamond":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "meteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "blackhole":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "planet":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "mazeCell":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "fox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1001":"star/star_1001.png",
        "star_1002":"star/star_1002.png",
        "star_1003":"star/star_1003.png",
        "star_1004":"star/star_1004.png",
        "star_1005":"star/star_1005.png",
        "star_1006":"star/star_1006.png",
        "star_1007":"star/star_1007.png",
        "star_1008":"star/star_1008.png",
        "star_1009":"star/star_1009.png",
        "star_1010":"star/star_1010.png",
        "star_1011":"star/star_1011.png",
        "star_1012":"star/star_1012.png",
        "broke_1001":"broke/broke_1001.png",
        "broke_1002":"broke/broke_1002.png",
        "broke_1003":"broke/broke_1003.png",
        "broke_1004":"broke/broke_1004.png",
        "broke_1005":"broke/broke_1005.png",
        "broke_1006":"broke/broke_1006.png",
        "broke_1007":"broke/broke_1007.png",
        "broke_1008":"broke/broke_1008.png",
        "broke_1009":"broke/broke_1009.png",
        "broke_1010":"broke/broke_1010.png",
        "broke_1011":"broke/broke_1011.png",
        "broke_1012":"broke/broke_1012.png",
        "affair_1":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_2":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_3":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_4":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    },
    "btn":
    {
        "searchMeteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "video":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "nextStar":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "wellDone":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    }
}

let baseUrl = "https://cdn-game.2zhuji.cn/uploads/yxhzbzk/";

export default class ResConfig{
    static GetAllRes(){
        for(var mainKey in res){
            for(var subKey in res[mainKey]){
                resList.push(res[mainKey][subKey])
            }
        }
        return resList;
    }

    static MainBg(){
        return baseUrl + res["bg"]["main"]
    }

    static DiamondConBg(){
        return baseUrl + res["bg"]["diamondCon"]
    }

    static ProductivityConBg(){
        return baseUrl + res["bg"]["productivityCon"]
    }

    static MeteorConBg(){
        return baseUrl + res["bg"]["meteorCon"]
    }

    static FixConBg(){
        return baseUrl + res["bg"]["fixCon"]
    }
    
    static DiamondIcon(){
        return baseUrl + res["icon"]["diamond"]
    }

    static MeteorIcon(){
        return baseUrl + res["icon"]["meteor"]
    }

    static FindMeteorBg() {
		return baseUrl + res["bg"]["findmeteor"]
    }

    static MessageBoxBg() {
        return baseUrl + res["bg"]["messagebox"]
    }

    static StarListItemBg(){
        return baseUrl + res["bg"]["starListItemBg"]
    }

    static MazeBg(){
        return baseUrl + res["bg"]["mazeBg"]
    }

    static CutSceneBg(){
        return baseUrl + res["bg"]["cutscene"]
    }

    static StarListPanelBg(){
        return baseUrl + res["bg"]["starListPanel"]
    }

    static GuideDiamondBoxBg(){
        return baseUrl + res["bg"]["guideDiamondBox"]
    }

    static FixCompleteBoxBg(){
        return baseUrl + res["bg"]["fixCompleteBox"]
    }

    static GetStarIcon(id){
        return baseUrl + res["icon"]["star_" + id]
    }

    static BlackHoleIcon() {
		return baseUrl + res["icon"]["blackhole"]
    }

    static PlanetIcon() {
		return baseUrl + res["icon"]["planet"]
    }

    static MazeCellIcon(){
        return baseUrl + res["icon"]["mazeCell"]
    }

    static FoxIcon(){
        return baseUrl + res["icon"]["fox"]
    }

    static BrokeIcon(){
        return baseUrl + res["icon"]["broke"]
    }

    static AffairIcon(index){
        return baseUrl + res["icon"]["affair_" + index];
    }

    static SearchMeteorBtn(){
        return baseUrl + res["btn"]["searchMeteor"]
    }

    static VideoBtn(){
        return baseUrl + res["btn"]["video"]
    }

    static NextStarBtn(){
        return baseUrl + res["btn"]["nextStar"]
    }

    static WellDoneBtn(){
        return baseUrl + res["btn"]["wellDone"]
    }
}