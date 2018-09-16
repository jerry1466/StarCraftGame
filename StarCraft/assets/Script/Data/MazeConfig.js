let data =
{
    "1001":
        {
            "row":18,
            "column":11,
            "get star":4,
            "star game":1,
            "ice game":0,
            "cards":0,
        },
    "1002":
        {
            "row":18,
            "column":11,
            "get star":5,
            "star game":1,
            "ice game":1,
            "cards":0,
        },
    "1003":
        {
            "row":18,
            "column":11,
            "get star":6,
            "star game":3,
            "ice game":1,
            "cards":0,
        },
    "1004":
        {
            "row":18,
            "column":11,
            "get star":7,
            "star game":5,
            "ice game":1,
            "cards":0,
        },
    "1005":
        {
            "row":18,
            "column":11,
            "get star":17,
            "star game":4,
            "ice game":3,
            "cards":0,
        },
    "1006":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":6,
            "ice game":3,
            "cards":0,
        },
    "1007":
        {
            "row":18,
            "column":11,
            "get star":18,
            "star game":4,
            "ice game":3,
            "cards":0,
        },
    "1008":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1009":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1010":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1011":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1012":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1013":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1014":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1015":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1016":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1017":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1018":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1019":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1020":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1021":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1022":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1023":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1024":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1025":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1026":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1027":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1028":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1029":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
    "1030":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
        },
}
let noFogArea = [5, 5]

export default class MazeConfig{
    static GetConfig(starId){
        return data[starId.toString()]
    }

    static GetNoFogArea(){
        return noFogArea;
    }

    static GetNofogAreaRowOffset(){
        return (noFogArea[0] - 1) * 0.5;
    }

    static GetNofogAreaColOffset(){
        return (noFogArea[1] - 1) * 0.5;
    }
}