import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import PrefabUtil from 'PrefabUtil'
import EventUtil from 'EventUtil'
import Affair from 'Affair'
import AffairConstant from "AffairConstant";
import MathUtil from "MathUtil";
import StarConfig from "StarConfig";
import ModuleManager from "ModuleManager";
import LevelManager from "LevelManager";
import GuideManager from "GuideManager";
import SceneManager from "SceneManager";
import UnitManager from "./UnitManager";

let instance;
let databus = new Databus();
let MAXROW = 18;
let MAXCOL = 12;

let STENCIL_COLOR = cc.color(255, 255, 255, 0);
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

    Update(){
        if(this.MapReady)
        {
            databus.userInfo.mazeAffairList = []
            for(var i = 0; i < this.cells.length; i++)
            {
                for(var j = 0; j < this.cells[i].length; j++)
                {
                    databus.userInfo.mazeAffairList.push(this.cells[i][j].affair);
                }
            }
        }
    }

    UpdateFogShader(){
        if(this.MapReady)
        {
            this.fogMask.removeComponent(cc.Mask);
            var mask = this.fogMask.addComponent(cc.Mask);
            mask.type = cc.Mask.Type.RECT;
            this.maskStencil = mask._clippingStencil;
            for(var i = 0; i < this.cells.length; i++)
            {
                for(var j = 0; j < this.cells[i].length; j++)
                {
                    var affair = this.cells[i][j].affair;
                    if(affair.triggered != true && affair.fogCover == true)
                    {
                        var node = this.cells[i][j].node;
                        var xMin = node.x - 0.5*node.width*node.scaleX;
                        var xMax = node.x + 0.5*node.width*node.scaleX;
                        var yMin = node.y - 0.5*node.height*node.scaleY;
                        var yMax = node.y + 0.5*node.height*node.scaleY;
                        var rectangle = [cc.v2(xMin, yMin), cc.v2(xMax, yMin), cc.v2(xMax, yMax), cc.v2(xMin, yMax)];
                        this.maskStencil.drawPoly(rectangle, STENCIL_COLOR, 0, STENCIL_COLOR);
                    }
                }
            }
        }
    }

    Destroy(){
        EventUtil.GetInstance().RemoveEventListener("FreeTouch", this.onFreeTouchHandler);
        this.MapReady = false;
    }

    Start(container, player, fogMask){
    	//FreeTouch事件的监听之前放在Init函数里面，而Init函数在GetInstance的if语句里调用，会导致再次进入迷宫的时候没有添加事件的监听
    	//因此把FreeTouch事件的监听放在start函数里
	    this.onFreeTouchHandler = this.onFreeTouch.bind(this);
        EventUtil.GetInstance().AddEventListener("FreeTouch", this.onFreeTouchHandler);

        this.MapReady = false;
        this.container = container;
        this.fogMask = fogMask.node;
        this.player = player;
        this.starId = databus.userInfo.curStarId;
        if(this.starId != databus.userInfo.mazeStarId && databus.userInfo.mazeStarId != 0)
        {
            this.starId = databus.userInfo.mazeStarId;
        }
        databus.userInfo.mazeStarId = this.starId;
        this.mazeConfig = MazeConfig.GetConfig(this.starId);
        this.mazeRow = this.mazeConfig["row"];
        this.mazeCol = this.mazeConfig["column"];
        this.centerRow = Math.floor((this.mazeRow - 1) * 0.5);
        this.centerCol = Math.floor((this.mazeCol - 1) * 0.5);
        // this.mapScale = cc.v2(MAXCOL / this.mazeCol, MAXROW / this.mazeRow);
        this.mapScale = cc.v2(1, 1);
        this.affairEventList = [];
        if(databus.userInfo.mazeComplete > 0)
        {
            this.InitAffairEventList(this.mazeConfig);
            this.affairEventList = MathUtil.Shuffle(this.affairEventList);
            //把起始格的事件换成空的
            var centerGridAffair = this.affairEventList[this.centerRow * this.mazeCol + this.centerCol]
            if(centerGridAffair.type != AffairConstant.AffairEnum().NONE)
            {
                var randomValue = Math.floor(Math.random() * this.affairEventList.length);
                while(this.affairEventList[randomValue].type != AffairConstant.AffairEnum().NONE)
                {
                    randomValue = Math.floor(Math.random() * this.affairEventList.length);
                }
                var temp = this.affairEventList[randomValue];
                this.affairEventList[randomValue] = centerGridAffair;
                this.affairEventList[this.centerRow * this.mazeCol + this.centerCol] = temp;
            }
        }
        else
        {
            this.InitAffairByDataSource();
        }
        //把初始化无雾区域的事件fogCover置为false
        var rowOffset = MazeConfig.GetNofogAreaRowOffset();
        var colOffset = MazeConfig.GetNofogAreaColOffset();
        for(var i = 0; i < this.affairEventList.length; i++)
        {
            var row = Math.floor(i / this.mazeCol);
            var col = i % this.mazeCol;
            if(row >= this.centerRow - rowOffset && row <= this.centerRow + rowOffset
            && col >= this.centerCol - colOffset && col <= this.centerCol + colOffset)
            {
                this.affairEventList[i].fogCover = false;
            }
        }
        this.cells = new Array(this.mazeRow);
        for(var i = 0; i < this.mazeRow; i++)
        {
            this.cells[i] = new Array(this.mazeCol);
        }
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
                var affairType = AffairConstant.CreateAffairTypeByName(eventName);
                this.affairEventList.push(this.createAffair(affairType));
            }
        }
        var length = this.affairEventList.length;
        var totalLength = this.mazeRow * this.mazeCol;
        for(var k = length; k < totalLength; k++)
        {
            this.affairEventList.push(this.createAffair(AffairConstant.AffairEnum().NONE));
        }
    }

    InitAffairByDataSource(){
        var totalLength = this.mazeRow * this.mazeCol;
        for(var k = 0; k < totalLength; k++)
        {
            this.affairEventList.push(databus.userInfo.mazeAffairList[k]);
        }
    }

    Move(dir) {
        if(this.MapReady && this.TouchEnable && GuideManager.HasGuide("mazeFirstStep"))
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
                    ModuleManager.GetInstance().ShowModule("GuideDiamondBox", affair.cost);
                }
                else
                {
                    databus.AddMoney(1, 0 - affair.cost);
                    databus.userInfo.mazeCurLoc = tarCell.row * this.mazeCol + tarCell.column;
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
            var instance = UnitManager.GetInstance().GetMazeMapCellInst();
            instance.parent = container;
            instance.setScale(temp.mapScale);
            var width = instance.width * temp.mapScale.x;
            var height = instance.height * temp.mapScale.y;
            instance.x = (column - temp.mazeCol * 0.5) * width + 0.5 * width;
            instance.y = (0.5 * temp.mazeRow - row) * height - 0.5 * height;
            instance.active = true;
            var mazeCell = instance.getComponent("MazeMapCell");
            mazeCell.Init(row, column);
            mazeCell.InitAffair(temp.affairEventList[row * temp.mazeCol + column]);
            temp.cells[row][column] = mazeCell;
            temp.loadCell(index + 1, temp, container);
        }
        else
        {
            this.MapReady = true;
            this.UpdateFogShader();
            GuideManager.AddGuide("mazeWelcome", SceneManager.GetInstance().rootCanvas());
            if(databus.userInfo.mazeComplete > 0)
            {
                EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "");
                this.TouchEnable = true;
                this.TouchEnable = false;
                let mazeCell = temp.cells[this.centerRow][this.centerCol];
                this.player.JumpTo(mazeCell, function(){
                    mazeCell.Trigger();
                });
                EventUtil.GetInstance().DispatchEvent("FreeTouch");
            }
            else
            {
                if(databus.userInfo.mazeCurLoc != -1)
                {
                    var row = Math.floor(databus.userInfo.mazeCurLoc / temp.mazeCol);
                    var column = Math.floor(databus.userInfo.mazeCurLoc % temp.mazeCol);
                    this.TouchEnable = false;
                    let mazeCell = temp.cells[row][column];
                    this.player.JumpTo(mazeCell, function(){
                        mazeCell.Trigger();
                    });
                    EventUtil.GetInstance().DispatchEvent("FreeTouch");
                }
            }
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
        EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "请在屏幕上滑动手指，来决策下一步的移动方向");
        var allCompelte = true;
        for(var i = 0; i < this.cells.length; i++)
        {
            for(var j = 0; j < this.cells[i].length; j++)
            {
                if(this.cells[i][j].affair.triggered != true)
                {
                    allCompelte = false;
                    break;
                }
            }
        }
        if(allCompelte)
        {
            databus.userInfo.mazeComplete = 1;
            databus.userInfo.mazeStarId = 0;
            new LevelManager().SwitchLevel("battle");
            // UIUtil.Confirm("厉害！平原完全探索完毕", function(){
            //     new LevelManager().SwitchLevel("battle");
            // }, "回到星球");
        }
    }
}