import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import PrefabUtil from 'PrefabUtil'
import EventUtil from 'EventUtil'
import Affair from 'Affair'
import AffairConstant from "AffairConstant";
import ArrayUtil from "ArrayUtil";
import StarConfig from "StarConfig";
import SceneManager from "SceneManager";

let instance;
let databus = new Databus()
export default class MazeManager{
    static GetInstance(){
        if(instance == null)
        {
            instance = new MazeManager();
            instance.Init();
        }
    }

    Init(){
        EventUtil.GetInstance().AddEventListener("FreeTouch", this.onFreeTouch)
    }

    Start(mazeId){
        this.MapReady = false;
        this.mazeId = mazeId;
        this.mazeConfig = MazeConfig.GetConfig(mazeId);
        this.mazeRow = this.mazeConfig["row"]
        this.mazeCol = this.mazeConfig["col"]
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
        ArrayUtil.Shuffle(this.affairEventList);
        this.cells = new Array(this.mazeRow);
        for(var i = 0; i < this.mazeRow; i++)
        {
            this.cells[i] = new Array(this.mazeCol);
        }
        var node = SceneManager.GetInstance().rootCanvas
        var container = node.getChildByName("Map")
        var playerNode = node.getChildByName("Player")
        this.player = playerNode.getComponent("Player")
        this.loadCell(0, this, container);
        this.frozen = false
    }

    Move(dir) {
        if(this.MapReady && this.TouchEnable)
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
                this.player.Move(tarCell, function(){
                    tarCell.Trigger();
                })
            }
        }
    }

    loadCell(index, temp, container){
        var row = Math.floor(index / temp.mazeCol)
        var column = Math.floor(index % temp.mazeCol)
        if(row < temp.mazeRow && column < temp.mazeCol)
        {
            PrefabUtil.GetPrefabInstance("MazeCell", function(success, instance){
                if(success)
                {
                    instance.parent = container
                    if(column < temp.mazeCol * 0.5)
                    {
                        instance.x = (column - temp.mazeCol * 0.5) * instance.width + 0.5 * instance.width
                    }
                    else
                    {
                        instance.x = (column - temp.mazeCol * 0.5) * instance.width + 0.5 * instance.width
                    }
                    instance.y = container.height * 0.5 - row * instance.height + instance.height
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
                affair.meteor = StarConfig.GetStarNumScaleDuration(this.mazeId) * StarConfig.GetBaseAffairReward();
                break;
            case AffairConstant.AffairEnum.ROB:
                affair.meteor = StarConfig.GetStarNumScaleDuration(this.mazeId) * StarConfig.GetBaseAffairRob();
                break;
            case AffairConstant.AffairEnum.FREEZE:
                break;
            case AffairConstant.AffairEnum.GAME:
                break;
        }
        affair.cost = StarConfig.GetMazeCellCost(this.mazeId)
        return affair;
    }

    onFreeTouch(){
        this.TouchEnable = true;
    }
}