let data =
{
    "1001":
        {
            "row":5,
            "column":5,
            "get star":3,
            "star game":1,
            "ice game":0,
            "cards":1,
        },
    "1002":
        {
            "row":6,
            "column":6,
            "get star":4,
            "star game":1,
            "ice game":1,
            "cards":1,
        },
    "1003":
        {
            "row":7,
            "column":7,
            "get star":6,
            "star game":2,
            "ice game":1,
            "cards":1,
        },
    "1004":
        {
            "row":8,
            "column":8,
            "get star":7,
            "star game":3,
            "ice game":1,
            "cards":2,
        },
    "1005":
        {
            "row":14,
            "column":9,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
}

export default class MazeConfig{
    static GetConfig(starId){
        return data[starId.toString()]
    }
}