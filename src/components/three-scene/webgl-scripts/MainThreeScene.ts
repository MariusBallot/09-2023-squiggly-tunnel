import * as THREE from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';
import RAF from '../../../utils/RAF';
import SquigglyTunnel from "./SquigglyTunnel"
import CamParallax from "./CamParallax"

class MainThreeScene {
    private camera: THREE.OrthographicCamera | undefined;
    private scene: THREE.Scene | undefined;
    private renderer: THREE.WebGLRenderer | undefined;
    private controls: OrbitControls | undefined;
    private isActive: Boolean

    constructor() {
        this.bind();
        this.isActive = false
    }

    init(container: HTMLElement) {
        if (this.isActive) return
        this.isActive = true
        console.log(container)
        // RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.debug.checkShaderErrors = true;
        container.appendChild(this.renderer.domElement);

        // MAIN SCENE INSTANCE
        this.scene = new THREE.Scene();

        // CAMERA AND ORBIT CONTROLLER
        const aspectRatio = window.innerWidth / window.innerHeight;
        const cameraWidth = 10;
        const cameraHeight = cameraWidth / aspectRatio;

        this.camera = new THREE.OrthographicCamera(
            cameraWidth / -2,   // Left
            cameraWidth / 2,    // Right
            cameraHeight / 2,   // Top
            cameraHeight / -2,  // Bottom
            -1000,              // Near
            1000                // Far
        );
        if (this.camera) {
            this.camera.position.set(0, 0, 10);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            if (this.controls) {
                this.controls.enabled = false; // You can adjust this based on your config.
                this.controls.maxDistance = 1500;
                this.controls.minDistance = 0;
            }
            CamParallax.init(this.camera)
        }

        SquigglyTunnel.init(this.scene)

        // RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", () => this.resizeCanvas());
        RAF.subscribe('threeSceneUpdate', () => this.update());
    }

    update() {
        SquigglyTunnel.update()

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }

        CamParallax.update()
    }

    resizeCanvas() {
        if (this.renderer && this.camera) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            
            const aspectRatio = window.innerWidth / window.innerHeight;
            const cameraWidth = 10;
            const cameraHeight = cameraWidth / aspectRatio;
            // Update camera and renderer size
            this.camera.left = -cameraWidth / 2;
            this.camera.right = cameraWidth / 2;
            this.camera.top = cameraHeight / 2;
            this.camera.bottom = -cameraHeight / 2;




            this.camera.updateProjectionMatrix();
        }
    }

    private bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
    }
}

const _instance = new MainThreeScene();
export default _instance;
