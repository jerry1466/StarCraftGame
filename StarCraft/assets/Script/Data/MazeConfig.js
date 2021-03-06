let data =
{
    "1001":
        {
            "row":18,
            "column":11,
            "get star":30,
            "star game":14,
            "ice game":0,
            "cards":5,
            "drop":5,
        },
    "1002":
        {
            "row":18,
            "column":11,
            "get star":30,
            "star game":17,
            "ice game":1,
            "cards":3,
            "drop":5,
        },
    "1003":
        {
            "row":18,
            "column":11,
            "get star":36,
            "star game":13,
            "ice game":1,
            "cards":0,
            "drop":5,
        },
    "1004":
        {
            "row":18,
            "column":11,
            "get star":37,
            "star game":15,
            "ice game":1,
            "cards":0,
            "drop":5,
        },
    "1005":
        {
            "row":18,
            "column":11,
            "get star":17,
            "star game":4,
            "ice game":3,
            "cards":0,
            "drop":5,
        },
    "1006":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":6,
            "ice game":3,
            "cards":0,
            "drop":5,
        },
    "1007":
        {
            "row":18,
            "column":11,
            "get star":18,
            "star game":4,
            "ice game":3,
            "cards":0,
            "drop":8,
        },
    "1008":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1009":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":3,
        },
    "1010":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1011":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":7,
        },
    "1012":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1013":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
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
            "drop":5,
        },
    "1016":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1017":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1018":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1019":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":3,
        },
    "1020":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1021":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1022":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1023":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1024":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1025":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1026":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1027":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1028":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1029":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
        },
    "1030":
        {
            "row":18,
            "column":11,
            "get star":16,
            "star game":3,
            "ice game":3,
            "cards":3,
            "drop":5,
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