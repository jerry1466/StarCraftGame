let data = 
{
    "1001":
    {
        "name":"水星",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "icon":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":0
    },
    "1002":
    {
        "name":"金星",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "icon":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":3000
    },
    "1003":
    {
        "name":"地球",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "icon":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":10000
    }
}

export default class StarConfig{
    static GetStarName(id){
        return this.data[id]["name"]
    }

    static GetStarAppearance(id){
        return this.data[id]["appearance"]
    }
    
    static GetStarIcon(id){
        return this.data[id]["icon"]
    }

    static GetStarBrokeList(id){
        return this.data[id]["broke"]
    }

    static GetStarUnlock(id){
        return this.data[id]["unlock"]
    }
}