let normalShader = {
    vShader: "attribute vec4 a_position; \nattribute vec2 a_texCoord; \nattribute vec4 a_color; \nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main() \n{ \ngl_Position = CC_PMatrix * a_position;\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",  fShader: "varying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \n//uniform sampler2D CC_Texture0; \nvoid main() \n{ \nvec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\nfloat gray = dot(v_orColor.rgb, vec3(0.8, 0.9, 0.85));\ngl_FragColor = vec4(v_orColor.r, v_orColor.g, v_orColor.b, v_orColor.a);\n}" };

export default class ShaderUtil{
    static RollBackNormal(sprite){
        this.SwitchShader(sprite, normalShader);
    }

    static SwitchShader(sprite, shaderConfig){
        var program = new cc.GLProgram();
        if(cc.sys.isNative)
        {
            program.initWithString(shaderConfig.vShader, shaderConfig.fShader);
        }
        else
        {
            program.initWithVertexShaderByteArray(shaderConfig.vShader, shaderConfig.fShader);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        program.link();
        program.updateUniforms();
        sprite._sgNode.shaderProgram = program;
    }
}