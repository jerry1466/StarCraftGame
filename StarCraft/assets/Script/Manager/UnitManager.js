/**
 * UnitManager
 * @auhor clairli
 */
import PrefabUtil from "PrefabUtil";

let instance
export default class UnitManager {
    constructor() {
        this.BrokePrefab = null;
    }
    
    static GetInstance() {
        if (instance == null) {
            instance = new UnitManager()
        }
        return instance
    }

    CreateWood(isMe, callback){
        var _this = this
        PrefabUtil.GetPrefabInstance("Wood", function(success, instance){
            if(success)
            {
                if(isMe)
                {
                    _this.myWood = instance
                }
                else
                {
                    _this.enemyWood = instance
                }
                if(callback != null)
                {
                    callback(instance)
                }
            }
        })
    }

    CreateBrick(id, callback){
        var _this = this
        PrefabUtil.GetPrefabInstance("Brick", function(success, instance){
            if(success)
            {
                var brick = instance.getComponent("Brick")
                brick.id = id
                _this.bricks.push(brick)
                if(callback != null)
                {
                    callback(instance)
                }
            }
        })
    }

    CreateWall(callback){
        var _this = this
        PrefabUtil.GetPrefabInstance("Wall", function(success, instance){
            if(success)
            {
                _this.walls.push(instance)
                if(callback != null)
                {
                    callback(instance)
                }
            }
        })
    }

    RemoveAll(){
        for(var i = this.walls.length - 1; i >= 0; i--)
        {
            this.walls[i].removeFromParent()
            this.walls[i].destroy()
        }
        this.walls= []
        for(var i = this.bricks.length - 1; i >= 0; i--)
        {
            this.bricks[i].node.removeFromParent()
            this.bricks[i].node.destroy()
        }
        this.bricks = []
        this.myWood.removeFromParent()
        this.myWood.destroy()
        this.myWood = null
        this.enemyWood.removeFromParent()
        this.enemyWood.destroy()
        this.enemyWood = null
    }

    FetchBrokeInst(){
        return cc.instantiate(this.BrokePrefab);
    }
}