import * as THREE from "three"
import FBOVert from "./shaders/FBOVert.glsl"
import FBOFrag from "./shaders/FBOFrag.glsl"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class TunnelFBO {
    private scene: THREE.Scene | undefined;
    private GLTFLoader: GLTFLoader;
    public frameTexture: THREE.WebGLRenderTarget;
    private texLoader: THREE.TextureLoader;
    private FBOShader: THREE.ShaderMaterial

    constructor() {
        this.GLTFLoader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()
        this.frameTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.FBOShader = new THREE.ShaderMaterial({
            uniforms: {
                u_fboTex: {
                    value: this.frameTexture.texture,
                },
                u_res: {
                    value: new THREE.Vector2(window.innerWidth, window.innerHeight)
                },
            },
            vertexShader: FBOVert,
            fragmentShader: FBOFrag,
        })
    }

    init = (scene: THREE.Scene) => {
        this.scene = scene;

        this.GLTFLoader.load("/assets/models/mirror-portal.glb", glb => {
            console.log(glb.scene)
            glb.scene.rotateY(-Math.PI / 2)
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    if (child.name === "mirror-fbo")
                        child.material = this.FBOShader
                    if (child.name === "mirror-struc")
                        child.material = new THREE.MeshMatcapMaterial({
                            matcap: this.texLoader.load("assets/textures/black-metal-matcap.png")
                        })
                }
            })
            this.scene?.add(glb.scene)
        })
    }

    onResize = () => {
        this.FBOShader.uniforms.u_res.value = new THREE.Vector2(window.innerWidth, window.innerHeight)
    }
}

const _instance = new TunnelFBO()
export default _instance