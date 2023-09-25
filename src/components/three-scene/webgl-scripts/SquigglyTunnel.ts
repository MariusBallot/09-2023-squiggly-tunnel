import * as THREE from "three";
import layerFrag from "./shaders/layerFrag.glsl"
import layerVert from "./shaders/layerVert.glsl"

const _LAYERSLENGTH = 10;


class SquigglyTunnel {
    private scene: THREE.Scene | undefined;
    private texLoader: THREE.TextureLoader;
    private tunnelGroup: THREE.Group;

    constructor() {
        this.bind()
        this.texLoader = new THREE.TextureLoader()
        this.tunnelGroup = new THREE.Group()


        for (let i = 0; i < _LAYERSLENGTH; i++) {
            const layer = new THREE.Mesh(new THREE.PlaneGeometry(13, 13 * (window.innerHeight / window.innerWidth)), new THREE.ShaderMaterial({
                // const layer = new THREE.Mesh(new THREE.PlaneGeometry(5,5), new THREE.ShaderMaterial({
                uniforms: {
                    u_index: {
                        value: i
                    },
                    u_time: {
                        value: 0
                    },
                    u_layersCount: {
                        value: _LAYERSLENGTH
                    },
                    u_layerColor: {
                        value: new THREE.Color(`hsl(${360 * Math.random()}, 100%, 50%)`)
                    },
                },
                transparent: true,
                vertexShader: layerVert,
                fragmentShader: layerFrag,
            }))
            layer.position.z = i * (-0.4)
            this.tunnelGroup.add(layer)
        }
    }

    init(scene: THREE.Scene) {
        // init(scene) {
        this.scene = scene
        this.scene.add(this.tunnelGroup)

    }

    update() {
        let i = 0;
        while (i < _LAYERSLENGTH) {

            if (this.tunnelGroup.children[i] instanceof THREE.Mesh) {
                const mesh = this.tunnelGroup.children[i] as THREE.Mesh;
                const materialWithUniforms = mesh.material as THREE.ShaderMaterial;
                if (materialWithUniforms && materialWithUniforms.uniforms && materialWithUniforms.uniforms.u_time) {
                    materialWithUniforms.uniforms.u_time.value++;
                }
            }

            i++
        }
    }

    bind() {
    }

}

const _instance = new SquigglyTunnel()
export default _instance