import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import EventUtil from 'EventUtil'
import Affair from 'Affair'
import AffairConstant from "AffairConstant";
import MathUtil from "MathUtil";
import StarConfig from "StarConfig";
import ModuleManager from "ModuleManager";
import LevelManager from "LevelManager";
import GuideManager from "GuideManager";
import SceneManager from "SceneManager";
import UnitManager from "UnitManager";
import UIUtil from "UIUtil";

let instance;
let databus = new Databus();
let MAXROW = 18;
let MAXCOL = 12;

let operationMode =
{
    CLICK:0,
    SLIDE:1
}
let STENCIL_COLOR = cc.color(255, 255, 255, 0);
export default class MazeManager{
    static GetInstance(){
        if(instance == null)
        {
            instance = new MazeManager();
        }
        return instance;
    }

    static OperationMode(){
        return operationMode;
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

    segementSplitK(segments, k){
        if(k < 0.5 * segments)
        {
            return k;
        }
        else
        {
            return segments - k;
        }
    }

    UpdateFogShader(){
        if(this.MapReady)
        {
            this.fogMask.removeComponent(cc.Mask);
            var mask = this.fogMask.addComponent(cc.Mask);
            mask.type = cc.Mask.Type.RECT;
            this.maskStencil = mask._clippingStencil;
            var segments = 20;
            var lineWidth = 4;
            var tension = 5;
            var expand = 0.015;
            for(var i = 0; i < this.cells.length; i++)
            {
                for(var j = 0; j < this.cells[i].length; j++)
                {
                    var node = this.cells[i][j].node;
                    var xMin = node.x - 0.5*node.width*node.scaleX;
                    var xMax = node.x + 0.5*node.width*node.scaleX;
                    var yMin = node.y - 0.5*node.height*node.scaleY;
                    var yMax = node.y + 0.5*node.height*node.scaleY;
                    var affair = this.cells[i][j].affair;
                    if(affair.triggered != true && affair.fogCover == true)
                    {
                        var rectangle = [cc.v2(xMin, yMin), cc.v2(xMax, yMin), cc.v2(xMax, yMax), cc.v2(xMin, yMax)];
                        this.maskStencil.drawPoly(rectangle, STENCIL_COLOR, 0, STENCIL_COLOR);
                    }
                    else
                    {
                        var width = node.width * node.scaleX;
                        var height = node.height * node.scaleY;
                        //检查四个邻接格子有哪几个是有雾的
                        var polies =[];
                        //左
                        if(this.checkCellExist(i, j - 1) && this.cells[i][j - 1].affair.fogCover == true)
                        {
                            var config = [];
                            for(var m = 0; m <= segments; m++)
                            {
                                config.push(cc.v2(xMin + this.segementSplitK(segments, m) * 0.02 * segments * expand * width, yMin + m * (1 / segments) * height));
                            }
                            this.maskStencil.drawCardinalSpline(config, tension, segments, lineWidth, STENCIL_COLOR)
                        }
                        //上
                        if(this.checkCellExist(i - 1, j) && this.cells[i - 1][j].affair.fogCover == true)
                        {
                            var config = [];
                            for(var m = 0; m <= segments; m++)
                            {
                                config.push(cc.v2(xMin + m * (1 / segments) * width, yMax - this.segementSplitK(segments, m) * 0.02 * segments * expand * height));
                            }
                            this.maskStencil.drawCardinalSpline(config, tension, segments, lineWidth, STENCIL_COLOR)
                        }
                        //右
                        if(this.checkCellExist(i, j + 1) && this.cells[i][j + 1].affair.fogCover == true)
                        {
                            var config = [];
                            for(var m = 0; m <= segments; m++)
                            {
                                config.push(cc.v2(xMax - this.segementSplitK(segments, m) * 0.02 * segments * expand * width, yMax - m * (1 / segments) * height));
                            }
                            this.maskStencil.drawCardinalSpline(config, tension, segments, lineWidth, STENCIL_COLOR)
                        }
                        //下
                        if(this.checkCellExist(i + 1, j) && this.cells[i + 1][j].affair.fogCover == true)
                        {
                            var config = [];
                            for(var m = 0; m <= segments; m++)
                            {
                                config.push(cc.v2(xMax - m * (1 / segments) * width, yMin + this.segementSplitK(segments, m) * 0.02 * segments * expand * height));
                            }
                            this.maskStencil.drawCardinalSpline(config, tension, segments, lineWidth, STENCIL_COLOR)
                        }
                    }
                }
            }
        }
    }

    Destroy(){
        EventUtil.GetInstance().RemoveEventListener("FreeTouch", this.onFreeTouchHandler);
        EventUtil.GetInstance().RemoveEventListener("GuideEnd", this.onGuideEndHandler);
        this.MapReady = false;
    }

    Start(container, player, fogMask){
    	//FreeTouch事件的监听之前放在Init函数里面，而Init函数在GetInstance的if语句里调用，会导致再次进入迷宫的时候没有添加事件的监听
    	//因此把FreeTouch事件的监听放在start函数里
	    this.onFreeTouchHandler = this.onFreeTouch.bind(this);
        EventUtil.GetInstance().AddEventListener("FreeTouch", this.onFreeTouchHandler);
        this.onGuideEndHandler = this.onGuideEnd.bind(this);
        EventUtil.GetInstance().AddEventListener("GuideEnd", this.onGuideEndHandler);

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
        if(this.MapReady && this.TouchEnable && (GuideManager.HasGuide("mazeFirstStep") || GuideManager.HasGuide("mazeFirstSlideStep")))
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
                    UIUtil.ShowMoneyNotice(1, 0 - affair.cost, SceneManager.GetInstance().rootCanvas(), this.player.node.position);
                    var relatedCells = this.getRelatedCells(databus.userInfo.mazeCurLoc, dir);
                    databus.userInfo.mazeCurLoc = tarCell.row * this.mazeCol + tarCell.column;
                    var that = this;
                    tarCell.RemoveFog(function(){
                        EventUtil.GetInstance().DispatchEvent("MazeShowNotice", "");
                        that.player.Move(tarCell, dir, function(){
                            tarCell.Trigger();
                        })
                    });
                    for(var i = 0; i < relatedCells.length; i++)
                    {
                        var loc = relatedCells[i];
                        if(this.checkCellExist(loc.x, loc.y))
                        {
                            var cell = this.cells[loc.x][loc.y];
                            cell.RemoveFog();
                        }
                    }
                }
            }
        }
    }

    getRelatedCells(curLoc, dir){
        var row = Math.floor(curLoc / this.mazeCol);
        var col = Math.floor(curLoc % this.mazeCol);
        console.log("getRelatedCells", curLoc, row, col);
        var foreCells = [];
        var forwardCells = [];
        var oneSideCells = [];
        var otherSideCells = [];
        switch(dir)
        {
            case "left":
                foreCells.push(cc.v2(row - 1, col - 1));
                forwardCells.push(cc.v2(row, col - 1));
                forwardCells.push(cc.v2(row, col - 2));
                oneSideCells.push(cc.v2(row - 1, col - 2));
                otherSideCells.push(cc.v2(row - 1, col));
                foreCells.push(cc.v2(row, col - 1));
                oneSideCells.push(cc.v2(row, col - 2));
                foreCells.push(cc.v2(row + 1, col - 1));
                oneSideCells.push(cc.v2(row + 1, col - 2));
                otherSideCells.push(cc.v2(row + 1, col));
                break;
            case "right":
                foreCells.push(cc.v2(row - 1, col + 1));
                forwardCells.push(cc.v2(row, col + 1));
                forwardCells.push(cc.v2(row, col + 2));
                oneSideCells.push(cc.v2(row - 1, col + 2));
                otherSideCells.push(cc.v2(row - 1, col));
                foreCells.push(cc.v2(row, col + 1));
                oneSideCells.push(cc.v2(row, col + 2));
                foreCells.push(cc.v2(row + 1, col + 1));
                oneSideCells.push(cc.v2(row + 1, col + 2));
                otherSideCells.push(cc.v2(row + 1, col));
                break;
            case "up":
                foreCells.push(cc.v2(row - 1, col - 1));
                forwardCells.push(cc.v2(row - 1, col));
                forwardCells.push(cc.v2(row - 2, col));
                oneSideCells.push(cc.v2(row - 2, col - 1));
                otherSideCells.push(cc.v2(row, col - 1));
                foreCells.push(cc.v2(row - 1, col));
                oneSideCells.push(cc.v2(row - 2, col));
                foreCells.push(cc.v2(row - 1, col + 1));
                oneSideCells.push(cc.v2(row - 2, col + 1));
                otherSideCells.push(cc.v2(row, col + 1));
                break;
            case "down":
                foreCells.push(cc.v2(row + 1, col - 1));
                forwardCells.push(cc.v2(row + 1, col));
                forwardCells.push(cc.v2(row + 2, col));
                oneSideCells.push(cc.v2(row + 2, col - 1));
                otherSideCells.push(cc.v2(row, col - 1));
                foreCells.push(cc.v2(row + 1, col));
                oneSideCells.push(cc.v2(row + 2, col));
                foreCells.push(cc.v2(row + 1, col + 1));
                oneSideCells.push(cc.v2(row + 2, col + 1));
                otherSideCells.push(cc.v2(row, col + 1));
                break;
        }
        var oneSideNoFogCover = true;
        for(var i = 0; i < oneSideCells.length; i++)
        {
            var loc = oneSideCells[i];
            if(this.checkCellExist(loc.x, loc.y))
            {
                var cell = this.cells[loc.x][loc.y];
                if(cell.fogCover == true)
                {
                    oneSideNoFogCover = false;
                    break;
                }
            }
        }
        var otherSideNoFogCover = true;
        for(var i = 0; i < otherSideCells.length; i++)
        {
            var loc = otherSideCells[i];
            if(this.checkCellExist(loc.x, loc.y))
            {
                var cell = this.cells[loc.x][loc.y];
                if(cell.fogCover == true)
                {
                    otherSideNoFogCover = false;
                    break;
                }
            }
        }
        if(oneSideNoFogCover && otherSideNoFogCover)
        {
            return foreCells;
        }
        else if(oneSideNoFogCover || otherSideNoFogCover)
        {
            return forwardCells;
        }
        return [];
    }

    checkCellExist(row, col){
        return row >= 0 && row < this.mazeRow && col >= 0 && col < this.mazeCol;
    }

    loadCell(index, temp, container){
        var row = Math.floor(index / temp.mazeCol);
        var column = Math.floor(index % temp.mazeCol);
        if(row < temp.mazeRow && column < temp.mazeCol)
        {
            var instance = UnitManager.GetInstance().GetMazeMapCellInst();
            instance.name = "MazeMapCell" + row.toString() + column.toString();
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
                databus.userInfo.mazeCurLoc = this.centerRow * this.mazeCol + this.centerCol;
                this.player.JumpTo(mazeCell, function(){
                    mazeCell.Trigger();
                });
                EventUtil.GetInstance().DispatchEvent("FreeTouch");
                databus.userInfo.mazeComplete = 0;
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
        if(GuideManager.HasGuide("mazeFirstStep") || GuideManager.HasGuide("mazeFirstSlideStep"))
        {
            var tip = null;
            if(MazeManager.GetInstance().operationMode == MazeManager.OperationMode().CLICK)
            {
                tip = "请点击屏幕，决定移动方向";
            }
            else
            {
                tip = "请滑动手指，决定移动方向";
            }
            EventUtil.GetInstance().DispatchEvent("MazeShowNotice", tip);
        }
        var allCompelte = true;
        for(var i = 0; i < this.cells.length; i++)
        {
            for(var j = 0; j < this.cells[i].length; j++)
            {
                if(this.cells[i][j].affair.type != AffairConstant.AffairEnum().NONE)
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
            UIUtil.Confirm("厉害！平原完全探索完毕", function(){
                setTimeout(function() {
                    new LevelManager().SwitchLevel("battle");
                }, 50);
            }, "回到星球");
        }
    }

    onGuideEnd(guideKey){
        if(guideKey == "mazeCost")
        {
            if(this.operationMode == MazeManager.OperationMode().CLICK)
            {
                GuideManager.AddGuide("mazeStepLeft", SceneManager.GetInstance().rootCanvas());
            }
            else
            {
                GuideManager.AddGuide("mazeStepSlideLeft", SceneManager.GetInstance().rootCanvas());
            }
        }
    }
}