let res=
{
    "bg":
    {
        "main":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",

    },
    "icon":
    {
        "diamond":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png",
        "meteor":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/cover_bg.png"
    }
}

export default class ResConfig{
    static MainBg(){
        return res["bg"]["main"]
    }
    
    static DiamondIcon(){
        return res["icon"]["diamond"]
    }

    static MeteorIcon(){
        return res["icon"]["meteor"]
    }
}