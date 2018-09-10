/**
 * GrayShader
 * @author lijun
 **/
import ShaderUtil from "ShaderUtil";

let grayShader = {
    vShader: "attribute vec4 a_position; \nattribute vec2 a_texCoord; \nattribute vec4 a_color; \nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main() \n{ \ngl_Position = CC_PMatrix * a_position;\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",
    fShader: "varying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \n//uniform sampler2D CC_Texture0; \nvoid main() \n{ \nvec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\nfloat gray = dot(v_orColor.rgb, vec3(0.299, 0.587, 0.114));\ngl_FragColor = vec4(gray, gray, gray, v_orColor.a);\n}"
};

cc.Class({
    extends: cc.Component,

    update(dt) {

    },

    onDestroy() {
        ShaderUtil.RollBackNormal(this.sprite);
    },

    onLoad() {
        this.sprite = this.node.getComponent(cc.Sprite);
        this._program = new cc.GLProgram();
        if(cc.sys.isNative)
        {
            this._program.initWithString(grayShader.vShader, grayShader.fShader);
        }
        else
        {
            this._program.initWithVertexShaderByteArray(grayShader.vShader, grayShader.fShader);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        this._program.link();
        this._program.updateUniforms();
        this.sprite._sgNode.shaderProgram = this._program;
    }
})