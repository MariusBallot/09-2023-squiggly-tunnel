class RAF {
    private callbacks: { name: string; callback: () => void }[];
    private requestId: number | undefined;

    constructor() {
        this.bind();
        this.callbacks = [];
        this.render();
    }

    subscribe(name: string, callback: () => void) {
        this.callbacks.push({
            name: name,
            callback: callback,
        });
    }

    unsubscribe(name: string) {
        this.callbacks = this.callbacks.filter((item) => item.name !== name);
    }

    render = () => {
        if (typeof window !== 'undefined') {
            this.requestId = window.requestAnimationFrame(this.render);
        }
        this.callbacks.forEach((item) => {
            item.callback();
        });
    };

    private bind() {
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.render = this.render.bind(this);
    }

    stop() {
        if (typeof window !== 'undefined' && this.requestId !== undefined) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
}

const _instance = new RAF();
export default _instance;
