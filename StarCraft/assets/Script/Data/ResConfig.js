let res=
{
    "bg":
    {
        "main":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
		"findmeteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "messagebox":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "introBg":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
    },
    "icon":
    {
        "diamond":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "meteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
    }
}

export default class ResConfig{
    static GetAllRes(){
        var resList = [];
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

    static BlackHoleIcon() {
		return res["icon"]["blackhole"]
    }

    static PlanetIcon() {
		return res["icon"]["planet"]
    }
}