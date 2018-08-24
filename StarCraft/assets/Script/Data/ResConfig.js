let res=
{
    "bg":
    {
        "main":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "diamondCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/diamondCon_bg.png",
        "productivityCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/productivityCon_bg.png",
        "meteorCon":"https://cdn-game.2zhuji.cn/uploads/wdxq/meteorCon_bg.png",
		"findmeteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "messagebox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "introBg":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "mazeBg":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "cutscene":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "starListPanel":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    },
    "icon":
    {
        "diamond":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "meteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "blackhole":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "planet":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "mazeCell":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "fox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1001":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1002":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "star_1003":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_1":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_2":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_3":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "affair_4":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    },
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

    static IntroBg(){
        return res["bg"]["introBg"]
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

    static AffairIcon(index){
        return res["icon"]["affair_" + index];
    }
}