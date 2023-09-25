class CamParallax {
    private active: boolean;
    private mousePos: { x: number; y: number };
    private params: {
        intensity: number;
        ease: number;
    };
    private camera: any; // Replace 'any' with your actual camera type
    private initZ: number;

    constructor() {
        this.bind();
        this.active = true;
        this.mousePos = { x: 0, y: 0 };
        this.params = {
            intensity: 0.008,
            ease: 0.08,
        };
        this.initZ = 0;
    }

    public init(camera: any) { // Replace 'any' with your actual camera type
        this.camera = camera;
        this.initZ = this.camera.position.z;
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    private onMouseMove(e: MouseEvent) {
        this.mousePos.x = (e.clientX - window.innerWidth / 2) * this.params.intensity;
        this.mousePos.y = (e.clientY - window.innerHeight / 2) * this.params.intensity;
        const yLimit = -3.4;
        if (this.mousePos.y < yLimit)
            this.mousePos.y = yLimit;
    }

    public update() {
        if (!this.active)
            return;
        this.camera.position.x += (this.mousePos.x - this.camera.position.x) * this.params.ease;
        this.camera.position.y += (this.mousePos.y - this.camera.position.y) * this.params.ease;
        this.camera.position.z += (this.initZ - this.camera.position.z) * this.params.ease;
        this.camera.lookAt(0, 0, 0);
    }

    private bind() {
        this.onMouseMove = this.onMouseMove.bind(this);
    }
}

const _instance = new CamParallax();
export default _instance;
