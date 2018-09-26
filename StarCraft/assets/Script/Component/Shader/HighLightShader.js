/**
 * HighLightShader
 * @author lijun
 **/
import ShaderUtil from "ShaderUtil";

let highLightShader = {
    vShader: "attribute vec4 a_position; \nattribute vec2 a_texCoord; \nattribute vec4 a_color; \nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main() \n{ \ngl_Position = CC_PMatrix * a_position;\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",
    fShader: "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform float time;\nvarying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \n//uniform sampler2D CC_Texture0; \nvoid main() \n{ \nvec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\ngl_FragColor = vec4(v_orColor.r+time, v_orColor.g+time, v_orColor.b+time, v_orColor.a+0.015);\n}"
};

cc.Class({
    extends: cc.Component,

    update(dt) {
        this._time += this.symbol * 0.005;
        if(this._program)
        {
            this._program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                glProgram_state.setUniformFloat( "time", this._time );
                this.sprite._sgNode.setGLProgramState(glProgram_state);
            } else {
                let time = this._program.getUniformLocationForName("time");
                gl.uniform1f(time, this._time);
                this.sprite._sgNode.setShaderProgram(this._program);
            }
        }
        if(this._time >= 0.4)
        {
            this.symbol *= -1;
        }
        else if(this._time <= 0)
        {
            this.symbol *= -1;
        }
    },

    onDestroy() {

    },

    onLoad() {
        this.sprite = this.node.getComponent(cc.Sprite);
        this._program = new cc.GLProgram();
        if(cc.sys.isNative)
        {
            this._program.initWithString(highLightShader.vShader, highLightShader.fShader);
        }
        else
        {
            this._program.initWithVertexShaderByteArray(highLightShader.vShader, highLightShader.fShader);
        }
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        this._program.link();
        this._program.updateUniforms();
        this.sprite._sgNode.shaderProgram = this._program;
        this._time = 0;
        this.symbol = 1;
    }
})    