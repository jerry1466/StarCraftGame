/**
 * FlowLightShader
 * @author lijun
 **/
let vert_file = require("./bright_vert.js");
let frag_file = require("./bright_frag.js");

cc.Class({
    extends : cc.Component,

    properties : {
        _time : 0.0,

    },

    onLoad : function(){
        this.sprite = this.node.getComponent(cc.Sprite);
        this._time = 0;
        this._sin = 0;
        this._use();
    },

    _use : function(){
        this._program = new cc.GLProgram();
        if(cc.sys.isNative)
        {
            this._program.initWithString(vert_file, frag_file);
        }
        else
        {
            this._program.initWithVertexShaderByteArray( vert_file, frag_file);
        }
        // 添加程序属性至GLSL中
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
        this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

        this._program.link();
        this._program.updateUniforms();
        this.updateGLParameters();
        this.sprite._sgNode.shaderProgram = this._program;

        if(cc.sys.isNative) {
            (cc.GLProgramState.getOrCreateWithGLProgram(this._program)).setUniformFloat("sys_time", this._time);
        }
        else{
            gl.uniform1f(this._program.getUniformLocationForName("sys_time"), this._time);
        }
        
    },

    update : function( dt){

        this._time += 2*dt;
        if(this._program){
            this._sin = Math.sin(this._time) * 10;
            if(this._sin >= 9.9){
                this._sin = 0;
                this._time = 0;
            }
            this._sin = Math.ceil(this._sin);
            this._program.use();
            if(cc.sys.isNative) {
                (cc.GLProgramState.getOrCreateWithGLProgram(this._program)).setUniformFloat("sys_time", this._sin);
            }
            else{
                gl.uniform1f(this._program.getUniformLocationForName("sys_time"), this._sin);
            }
        }
    },

    updateGLParameters : function(){
        this._time = Math.sin(Date.now());
    },

    setProgram : function(node, program){
        node.setShaderProgram(program);

        var children = node.children;
        if (!children)
            return;
        for (var i = 0; i < children.length; i++)
        {
            this.setProgram(children[i], program);
        }
    },
});