import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import PrefabUtil from 'PrefabUtil'
import EventUtil from 'EventUtil'
import Affair from 'Affair'
import AffairConstant from "AffairConstant";
import MathUtil from "MathUtil";
import StarConfig from "StarConfig";
import ModuleManager from "ModuleManager";

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
        }
        return instance;
    }

    Init(){
    }

    Destroy(){
        EventUtil.GetInstance().RemoveEventListener("FreeTouch", this.onFreeTouchHandler);
    }

    Start(container, player){
    	//FreeTouch事件的监听之前放在Init函数里面，而Init函数在GetInstance的if语句里调用，会导致再次进入迷宫的时候没有添加事件的监听
    	//因此把FreeTouch事件的监听放在start函数里
	    this.onFreeTouchHandler = this.onFreeTouch.bind(this);
        EventUtil.GetInstance().AddEventListener("FreeTouch", this.onFreeTouchHandler);

        this.MapReady = false;
        this.starId = databus.userInfo.curStarId;
        this.mazeConfig = MazeConfig.GetConfig(this.starId);
        this.mazeRow = this.mazeConfig["row"];
        this.mazeCol = this.mazeConfig["column"];
        this.mapScale = cc.v2(MAXCOL / this.mazeCol, MAXROW / this.mazeRow);
        this.affairEventList = [];
        this.InitAffairEventList(this.mazeConfig);
        this.affairEventList = MathUtil.Shuffle(this.affairEventList);
        this.cells = new Array(this.mazeRow);
        for(var i = 0; i < this.mazeRow; i++)
        {
            this.cells[i] = new Array(this.mazeCol);
        }
        this.container = container;
        this.player = player;
        this.loadCell(0, this, this.container);
    }

    InitAffairEventList(mazeConfig){
        var eventNames = AffairConstant.GetEventNames();
        for(var i = 0; i < eventNames.length; i++)
        {
            var eventName = eventNames[i];
            var eventCnt = mazeConfig[eventName];
            for(var j = 0; j < eventCnt; j++)
            {
                this.affairEventList.push(AffairConstant.CreateAffairTypeByName(eventName));
            }
        }
        var length = this.affairEventList.length;
        var totalLength = this.mazeRow * this.mazeCol;
        for(var k = length; k < totalLength; k++)
        {
            this.affairEventList.push(AffairConstant.AffairEnum().NONE);
        }
    }

    ClickMap(position){
        if(this.Stage == STAGE_PLAYER_NOT_IN_MAP){
            var response = false;
            for(var i = 0; i < this.mazeRow && !response; i++)
            {
                for(var j = 0; j < this.mazeCol; j++)
                {
                    var mazeCell = this.cells[i][j];
                    var width = mazeCell.node.width * mazeCell.node.scaleX;
                    var height = mazeCell.node.height * mazeCell.node.scaleY;
                    if(mazeCell.node.x - width * 0.5 <= position.x && mazeCell.node.x + width * 0.5 >= position.x
                        && mazeCell.node.y - height * 0.5 <= position.y && mazeCell.node.y + height * 0.5 >= position.y)
                    {
                        response = true;
                        this.TouchEnable = false;
                        EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "");
                        this.player.JumpTo(mazeCell, function(){
                            mazeCell.Trigger();
                        });
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
            if(moveEnable)
            {
                this.TouchEnable = false;
                var tarCell = this.cells[row][column];
                var affair = tarCell.GetAffair();
                if(databus.userInfo.diamond < affair.cost)
                {
                    EventUtil.GetInstance().DispatchEvent("FreeTouch");
                    ModuleManager.GetInstance().ShowModule("GuideDiamondBox", affair.cost);
                }
                else
                {
                    databus.AddMoney(0 - affair.cost);
                    EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "");
                    this.player.Move(tarCell, function(){
                        tarCell.Trigger();
                    })
                }
            }
        }
    }

    loadCell(index, temp, container){
        var row = Math.floor(index / temp.mazeCol);
        var column = Math.floor(index % temp.mazeCol);
        if(row < temp.mazeRow && column < temp.mazeCol)
        {
            PrefabUtil.GetPrefabInstance("MazeMapCell", function(success, instance){
                if(success)
                {
                    instance.parent = container
                    instance.setScale(temp.mapScale);
                    var width = instance.width * temp.mapScale.x;
                    var height = instance.height * temp.mapScale.y;
                    instance.x = (column - temp.mazeCol * 0.5) * width + 0.5 * width;
                    instance.y = (0.5 * temp.mazeRow - row) * height - 0.5 * height;
                    instance.active = true;
                    var mazeCell = instance.getComponent("MazeMapCell");
                    mazeCell.Init(row, column);
                    mazeCell.InitAffair(temp.createAffair(temp.affairEventList[row * temp.mazeCol + column]));
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
            case AffairConstant.AffairEnum().NONE:
                break;
            case AffairConstant.AffairEnum().REWARD:
                affair.meteor = StarConfig.GetBaseAffairReward();
                break;
            case AffairConstant.AffairEnum().CARD:
                break;
            case AffairConstant.AffairEnum().FREEZE:
                break;
            case AffairConstant.AffairEnum().GAME:
                break;
        }
        affair.cost = StarConfig.GetMazeCellCost(this.starId, databus.userInfo.brokeFixIndex + 1)
        return affair;
    }

    onFreeTouch(){
        this.TouchEnable = true;
        if(this.Stage == STAGE_PLAYER_IN_MAP)
        {
            EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "请在屏幕上滑动手指，决策下一步的移动方向");
        }
    }
}