import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import PrefabUtil from 'PrefabUtil'
import EventUtil from 'EventUtil'
import Affair from 'Affair'
import AffairConstant from "AffairConstant";
import MathUtil from "MathUtil";
import StarConfig from "StarConfig";

let instance;
let databus = new Databus();
let MAXROW = 18;
let MAXCOL = 12;

let STAGE_PLAYER_NOT_IN_MAP = 0;
let STAGE_PLAYER_IN_MAP = 1;
export default class MazeManager{

    static GetInstance(){
        if(instance == null)
        {
            instance = new MazeManager();
            instance.Init();
        }
        return instance;
    }

    Init(){
        EventUtil.GetInstance().AddEventListener("FreeTouch", this.onFreeTouch)
    }

    Start(container, player){
        this.MapReady = false;
        this.starId = databus.userInfo.curStarId;
        this.mazeConfig = MazeConfig.GetConfig(this.starId);
        this.mazeRow = this.mazeConfig["row"]
        this.mazeCol = this.mazeConfig["column"]
        this.mapScale = cc.v2(MAXCOL / this.mazeCol, MAXROW / this.mazeRow);
        this.mazeRate = this.mazeConfig["rate"]
        this.affairEventList = []
        var totalCellCount = this.mazeRow * this.mazeCol;
        var hard = Math.floor(totalCellCount * this.mazeRate[2]);
        var common = Math.floor(totalCellCount * this.mazeRate[1]);
        var easy = totalCellCount - hard - common
        for(var i = hard - 1; i >= 0 ; i--)
        {
            this.affairEventList.push(AffairConstant.CreateAffairTypeByLevel(3));
        }
        for(var i = common - 1; i >= 0 ; i--)
        {
            this.affairEventList.push(AffairConstant.CreateAffairTypeByLevel(2));
        }
        for(var i = easy - 1; i >= 0 ; i--)
        {
            this.affairEventList.push(AffairConstant.CreateAffairTypeByLevel(1));
        }
        MathUtil.Shuffle(this.affairEventList);
        this.cells = new Array(this.mazeRow);
        for(var i = 0; i < this.mazeRow; i++)
        {
            this.cells[i] = new Array(this.mazeCol);
        }
        this.container = container;
        this.player = player;
        this.loadCell(0, this, this.container);
        this.frozen = false
    }

    ClickMap(position){
        if(this.Stage == STAGE_PLAYER_NOT_IN_MAP){
            console.log("MazeManager ClickMap", position);
            var response = false;
            for(var i = 0; i < this.mazeRow && !response; i++)
            {
                for(var j = 0; j < this.mazeCol; j++)
                {
                    var mazeCell = this.cells[i][j];
                    if(mazeCell.node.x - mazeCell.node.width * 0.5 <= position.x && mazeCell.node.x + mazeCell.node.width * 0.5 >= position.x
                        && mazeCell.node.y - mazeCell.node.height * 0.5 <= position.y && mazeCell.node.y + mazeCell.node.height * 0.5 >= position.y)
                    {
                        response = true;
                        this.TouchEnable = false;
                        mazeCell.Trigger();
                        this.Stage = STAGE_PLAYER_IN_MAP;
                        break;
                    }
                }
            }
        }
    }

    Move(dir) {
        if(this.Stage == STAGE_PLAYER_IN_MAP && this.MapReady && this.TouchEnable)
        {
            var row = this.player.row;
            var column = this.player.column;
            var moveEnable = false;
            switch (dir){
                case "left":
                    if(column > 0)
                    {
                        moveEnable = true;
                        column--;
                    }
                    break;
                case "right":
                    if(column < this.mazeCol - 1)
                    {
                        moveEnable = true;
                        column++;
                    }
                    break;
                case "up":
                    if(row > 0)
                    {
                        moveEnable = true;
                        row--;
                    }
                    break;
                case "down":
                    if(row < this.mazeRow - 1)
                    {
                        moveEnable = true;
                        row++;
                    }
                    break;
            }
            if(moveEnable && !this.frozen)
            {
                this.TouchEnable = false;
                var tarCell = this.cells[row][column];
                var affair = tarCell.GetAffair();
                if(affair.type != AffairConstant.AffairEnum().NONE)
                {
                    databus.AddMoney(affair.cost);
                }
                this.player.Move(tarCell, function(){
                    tarCell.Trigger();
                })
            }
        }
    }

    loadCell(index, temp, container){
        var row = Math.floor(index / temp.mazeCol);
        var column = Math.floor(index % temp.mazeCol);
        if(row < temp.mazeRow && column < temp.mazeCol)
        {
            PrefabUtil.GetPrefabInstance("MazeCell", function(success, instance){
                if(success)
                {
                    instance.parent = container
                    instance.setScale(temp.mapScale);
                    var width = instance.width * temp.mapScale.x;
                    var height = instance.height * temp.mapScale.y;
                    instance.x = (column - temp.mazeCol * 0.5) * width + 0.5 * width;
                    instance.y = (0.5 * temp.mazeRow - row) * height - 0.5 * height;
                    instance.active = true;
                    var mazeCell = instance.getComponent("MazeCell");
                    mazeCell.Init(row, column);
                    mazeCell.InitAffair(temp.createAffair(temp.affairEventList[row * temp.mazeColumn + column]));
                    temp.cells[row][column] = mazeCell;
                    temp.loadCell(index + 1, temp, container);
                }
            })
        }
        else
        {
            this.MapReady = true;
            this.TouchEnable = true;
            this.Stage = STAGE_PLAYER_NOT_IN_MAP;
            EventUtil.GetInstance().DispatchEvent("SelectMapGrid");
        }
    }

    createAffair(type){
        var affair = new Affair();
        affair.type = type;
        switch(type)
        {
            case AffairConstant.AffairEnum.NONE:
                break;
            case AffairConstant.AffairEnum.REWARD:
                affair.meteor = StarConfig.GetStarNumScaleDuration(this.starId) * StarConfig.GetBaseAffairReward();
                break;
            case AffairConstant.AffairEnum.ROB:
                affair.meteor = StarConfig.GetStarNumScaleDuration(this.starId) * StarConfig.GetBaseAffairRob();
                break;
            case AffairConstant.AffairEnum.FREEZE:
                break;
            case AffairConstant.AffairEnum.GAME:
                break;
        }
        affair.cost = StarConfig.GetMazeCellCost(this.starId)
        return affair;
    }

    onFreeTouch(){
        this.TouchEnable = true;
    }
}