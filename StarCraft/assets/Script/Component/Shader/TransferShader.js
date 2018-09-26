/**
 * TransferShader
 * @author lijun
 **/
let transferShader = {
    vShader: "attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord; \n    varying vec4 v_fragmentColor; \n    void main() \n    { \n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color; \n        v_texCoord = a_texCoord; \n    }",
    fShader: "#ifdef GL_ES\n    precision lowp float;\n    #endif\n    \n    uniform float time;\n\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n    void main()\n    {\n        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n        gl_FragColor = c;\n\n        float temp = v_texCoord.x - time;\n        if (temp <= 0.0) {\n            float temp2 = abs(temp);\n            if (temp2 <= 0.2) {\n                gl_FragColor.w = 1.0 - temp2/0.2;\n            } else {\n                gl_FragColor.w = 0.0;\n            }\n        } else {\n            gl_FragColor.w = 1.0;\n        }\n    }"
};

cc.Class({
    extends: cc.Component,

    update(dt) {
        this._time += 0.01;
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
    },

    onDestroy() {

    },

    onLoad() {
        this.sprite = this.node.getComponent(cc.Sprite);
        this._program = new cc.GLProgram();
        if(cc.sys.isNative)
        {
            this._program.initWithString(transferShader.vShader, transferShader.fShader);
        }
        else
        {
            this._program.initWithVertexShaderByteArray(transferShader.vShader, transferShader.fShader);
        }
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        this._program.link();
        this._program.updateUniforms();
        this.sprite._sgNode.shaderProgram = this._program;
        this._time = 0;
    }
})