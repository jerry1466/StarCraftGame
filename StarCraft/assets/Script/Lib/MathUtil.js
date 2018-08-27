/**
 * MathUtil
 * @auhor clairli
 */
let instance
export default class MathUtil {
    constructor() {

    }

    static Shuffle(arr) {
        var result = [],
            random;
        while(arr.length>0){
            random = Math.floor(Math.random() * arr.length);
            result.push(arr[random])
            arr.splice(random, 1)
        }
        return result;
    }

    static HitTest(node1, node2){
        var x01 = node1.x - node1.width * 0.5
        var x02 = node1.x + node1.width * 0.5
        var x11 = node2.x - node2.width * 0.5
        var x12 = node2.x + node2.width * 0.5
        var y01 = node1.y - node1.height * 0.5
        var y02 = node1.y + node1.height * 0.5
        var y11 = node2.y - node2.height * 0.5
        var y12 = node2.y + node2.height * 0.5

        var zx = Math.abs(x01 + x02 - x11 - x12)
        var x = Math.abs(x01 - x02) + Math.abs(x11 - x12)
        var zy = Math.abs(y01 + y02 - y11 - y12)
        var y = Math.abs(y01 - y02) + Math.abs(y11 - y12)
        if (zx <= x && zy <= y)
            return true
        else
            return false
    }

    static LeftBoundaryHitTest(nodeLeft, screenLeft) {
		if (nodeLeft <= screenLeft)
			return true
		else
			return false
	}

	static RightBoundaryHitTest(nodeRight, screenRight) {
		if (nodeRight >= screenRight)
			return true
		else
			return false
	}

	static TopBoundaryHitTest(nodeTop, screenTop) {
		if (nodeTop >= screenTop)
			return true
		else
			return false
	}

	static ButtomBoundaryHitTest(nodeButtom, screenButtom) {
		if (nodeButtom <= screenButtom)
			return true
		else
			return false
	}

	static spliteScreenToBlock(screenHeight, screenWidth, num) {
		//假设屏幕的坐标原点在屏幕正中间
		var block = {top:(screenHeight / 2), left:(0 - screenWidth / 2), right:(screenWidth / 2), buttom:(0 - screenHeight / 2)}
		var blockList = new Array()
		var blocktmp = null
		blockList.push(block)

		while (blockList.length < num) {
			var blockout = blockList.splice(0, 1)
			blocktmp = blockout[0]
			if (blocktmp.top - blocktmp.buttom > blocktmp.right - blocktmp.left) {
				//橫着分
				var new1 = {top:blocktmp.top, left:blocktmp.left, right:blocktmp.right, buttom:(blocktmp.top / 2)}
				var new2 = {top:blocktmp.top / 2, left:blocktmp.left, right:blocktmp.right, buttom:blocktmp.buttom}
				blockList.push(new1)
				blockList.push(new2)
			} else {
				//竖着分
				var new1 = {top:blocktmp.top, left:blocktmp.left, right:((Math.abs(blocktmp.right) - Math.abs(blocktmp.left)) / 2), buttom:blocktmp.buttom}
				var new2 = {top:blocktmp.top, left:((Math.abs(blocktmp.right) - Math.abs(blocktmp.left)) / 2), right:blocktmp.right, buttom:blocktmp.buttom}
				blockList.push(new1)
				blockList.push(new2)
			}
		}

		return blockList
	}
}