/**
 * MathUtil
 * @auhor clairli
 */
let instance
export default class MathUtil {
    constructor() {

    }

    static Clamp(val, min, max){
        if (val < min) return min;
        if (val > max) return max;
        return val;
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

	static HitTestWithScale(node1, node2) {
        var x01 = node1.x - node1.width * 0.5 * node1.scaleX
        var x02 = node1.x + node1.width * 0.5 * node1.scaleX
        var x11 = node2.x - node2.width * 0.5 * node2.scaleX
        var x12 = node2.x + node2.width * 0.5 * node2.scaleX
        var y01 = node1.y - node1.height * 0.5 * node1.scaleY
        var y02 = node1.y + node1.height * 0.5 * node1.scaleY
        var y11 = node2.y - node2.height * 0.5 * node2.scaleY
        var y12 = node2.y + node2.height * 0.5 * node2.scaleY
        //console.log("this.left:", x01, "this.right:", x02, "this.top:", y02, "this.buttom:", y01)
        //console.log("planet.left:", x11, "planet.right:", x12, "planet.top:", y12, "planet.buttom:", y11)

        var zx = Math.abs(x01 + x02 - x11 - x12)
        var x = Math.abs(x01 - x02) + Math.abs(x11 - x12)
        var zy = Math.abs(y01 + y02 - y11 - y12)
        var y = Math.abs(y01 - y02) + Math.abs(y11 - y12)
        if (zx <= x && zy <= y)
            return true
        else
            return false
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
        //console.log("this.left:", x01, "this.right:", x02, "this.top:", y02, "this.buttom:", y01)
        //console.log("planet.left:", x11, "planet.right:", x12, "planet.top:", y12, "planet.buttom:", y11)

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

		//console.log("splite", block)
		while (blockList.length < num) {
			var blockout = blockList.splice(0, 1)
			blocktmp = blockout[0]
			if (blocktmp.top - blocktmp.buttom > blocktmp.right - blocktmp.left) {
				//console.log("-:", blocktmp)
				//橫着分
				if (blocktmp.top > 0) {
					var index = (blocktmp.top - blocktmp.buttom) / 2
					var new1 = {top:blocktmp.top, left:blocktmp.left, right:blocktmp.right, buttom:(blocktmp.buttom + index)}
					var new2 = {top:(blocktmp.buttom + index), left:blocktmp.left, right:blocktmp.right, buttom:blocktmp.buttom}
					//console.log("- new1:", new1, "new2:", new2)
					blockList.push(new1)
					blockList.push(new2)
				}
	
				if (blocktmp.top <= 0) {
					var index = Math.abs(blocktmp.buttom - blocktmp.top) / 2
					var new1 = {top:blocktmp.top, left:blocktmp.left, right:blocktmp.right, buttom:(blocktmp.top - index)}
					var new2 = {top:(blocktmp.top - index), left:blocktmp.left, right:blocktmp.right, buttom:blocktmp.buttom}
					//console.log("- new1:", new1, "new2:", new2)
					blockList.push(new1)
					blockList.push(new2)
				}
			} else {
				//竖着分
				//console.log("l:", blocktmp)
				if (blocktmp.right > 0) {
					var index = (blocktmp.right - blocktmp.left) / 2
					var new1 = {top:blocktmp.top, left:blocktmp.left, right:(blocktmp.left + index), buttom:blocktmp.buttom}
					var new2 = {top:blocktmp.top, left:(blocktmp.left + index), right:blocktmp.right, buttom:blocktmp.buttom}
					//console.log("l new1:", new1, "new2:", new2)
					blockList.push(new1)
					blockList.push(new2)
				}

				if (blocktmp.right <= 0) {
					var index = Math.abs(blocktmp.left - blocktmp.right) / 2
					var new1 = {top:blocktmp.top, left:blocktmp.left, right:(blocktmp.right - index), buttom:blocktmp.buttom}
					var new2 = {top:blocktmp.top, left:(blocktmp.right - index), right:blocktmp.right, buttom:blocktmp.buttom}
					//console.log("l new1:", new1, "new2:", new2)
					blockList.push(new1)
					blockList.push(new2)
				}
			}
		}

		return blockList
	}
}