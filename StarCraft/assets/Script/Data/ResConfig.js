let res=
{
    "bg":
    {
        "main":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "diamondCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/diamondCon_bg.png",
        "productivityCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/productivityCon_bg.png",
        "meteorCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/meteorCon_bg.png",
        "fixCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/meteorCon_bg.png",
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
        "star_1001":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1002":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1003":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
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
        return res["bg"]["main"]
    }

    static DiamondConBg(){
        return res["bg"]["diamondCon"]
    }

    static ProductivityConBg(){
        return res["bg"]["productivityCon"]
    }

    static MeteorConBg(){
        return res["bg"]["meteorCon"]
    }

    static FixConBg(){
        return res["bg"]["fixCon"]
    }
    
    static DiamondIcon(){
        return res["icon"]["diamond"]
    }

    static MeteorIcon(){
        return res["icon"]["meteor"]
    }

    static FindMeteorBg() {
		return res["bg"]["findmeteor"]
    }

    static MessageBoxBg() {
        return res["bg"]["messagebox"]
    }

    static StarListItemBg(){
        return res["bg"]["starListItemBg"]
    }

    static MazeBg(){
        return res["bg"]["mazeBg"]
    }

    static CutSceneBg(){
        return res["bg"]["cutscene"]
    }

    static StarListPanelBg(){
        return res["bg"]["starListPanel"]
    }

    static GuideDiamondBoxBg(){
        return res["bg"]["guideDiamondBox"]
    }

    static FixCompleteBoxBg(){
        return res["bg"]["fixCompleteBox"]
    }

    static GetStarIcon(id){
        return res["icon"]["star_" + id]
    }

    static BlackHoleIcon() {
		return res["icon"]["blackhole"]
    }

    static PlanetIcon() {
		return res["icon"]["planet"]
    }

    static MazeCellIcon(){
        return res["icon"]["mazeCell"]
    }

    static FoxIcon(){
        return res["icon"]["fox"]
    }

    static BrokeIcon(){
        return res["icon"]["broke"]
    }

    static AffairIcon(index){
        return res["icon"]["affair_" + index];
    }

    static SearchMeteorBtn(){
        return res["btn"]["searchMeteor"]
    }

    static VideoBtn(){
        return res["btn"]["video"]
    }

    static NextStarBtn(){
        return res["btn"]["nextStar"]
    }

    static WellDoneBtn(){
        return res["btn"]["wellDone"]
    }
}