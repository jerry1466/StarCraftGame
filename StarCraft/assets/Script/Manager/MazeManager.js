import Databus from 'Databus'
import MazeConfig from 'MazeConfig'
import PrefabUtil from 'PrefabUtil'
import EventUtil from 'EventUtil'

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
        this.mazeConfig = MazeConfig.GetConfig(mazeId);
        this.mazeRow = this.mazeConfig["row"]
        this.mazeCol = this.mazeConfig["col"]
        this.mazeRate = this.mazeConfig["rate"]
        this.cells = new Array(this.mazeRow);
        for(var i = 0; i < this.mazeRow; i++)
        {
            this.cells[i] = new Array(this.mazeCol);
        }
        var container = this.node.getChildByName("Map")
        var playerNode = this.node.getChildByName("Player")
        this.player = playerNode.getComponent("Player")
        this.loadCell(0, this, container);
        this.frozen = false
    }

    Move(dir) {
        if(this.MapReady && this.TouchEnable)
        {
            var row = this.player.row
            var column = this.player.column
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
                    var mazeCell = instance.getComponent("MazeCell")
                    mazeCell.Init(row, column)
                    temp.cells[row][column] = mazeCell
                    temp.loadCell(index + 1, temp, container)
                }
            })
        }
        else
        {
            this.MapReady = true;
            this.TouchEnable = true;
        }
    }

    onFreeTouch(){
        this.TouchEnable = true;
    }
}