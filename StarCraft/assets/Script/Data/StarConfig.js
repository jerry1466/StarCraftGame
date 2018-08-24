let data = 
{
    "1001":
    {
        "id":1001,
        "name":"水星",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":0,
        "mazeCellCost":20,
        "num_scale_duration":[1, 1.1],
    },
    "1002":
    {
        "id":1002,
        "name":"金星",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":3000,
        "mazeCellCost":20,
        "num_scale_duration":[1.15, 1.3],
    },
    "1003":
    {
        "id":1003,
        "name":"地球",
        "appearance":"https://cdn-game.2zhuji.cn/uploads/yxhzbzk/inner_bg.png",
        "broke":
        [
            [30, 80, 300],
            [50, 20, 500],
            [10, 40, 700],
            [60, 70, 1000]
        ],
        "unlock":10000,
        "mazeCellCost":20,
        "num_scale_duration":[1.3, 1.6],
    }
}

let star_base_data =
{
    "affair_reward":100,
    "affair_rob":30,
}

export default class StarConfig{
    static GetStarName(id){
        return this.data[id]["name"]
    }

    static GetStarAppearance(id){
        return this.data[id]["appearance"]
    }

    static GetStarBrokeList(id){
        return this.data[id]["broke"]
    }

    static GetStarUnlock(id){
        return this.data[id]["unlock"]
    }

    static GetStarAffairRate(id){
        return this.data[id]["affairRate"]
    }

    static GetMazeCellCost(id){
        return this.data[id]["mazeCellCost"]
    }

    static GetStarNumScaleDuration(id){
        return this.data[id]["num_scale_duration"]
    }

    static GetBaseAffairReward(){
        return this.star_base_data["affair_reward"]
    }

    static GetBaseAffairRob(){
        return this.star_base_data["affair_rob"]
    }
}