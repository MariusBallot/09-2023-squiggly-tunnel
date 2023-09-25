class RAF {
    private callbacks: { name: string; callback: () => void }[];

    constructor() {
        this.bind();
        this.callbacks = [];
        this.render()
    }

    subscribe(name: string, callback: () => void) {
        this.callbacks.push({
            name: name,
            callback: callback,
        });
    }

    unsubscribe(name: string) {
        this.callbacks.forEach((item, i) => {
            if (item.name === name) {
                this.callbacks.splice(i, 1);
            }
        });
    }

    render() {
        if (window !== undefined) {
            window.requestAnimationFrame(this.render);
        }
        this.callbacks.forEach((item) => {
            item.callback();
        });
    }

    private bind() {
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.render = this.render.bind(this);
    }
}


const _instance = new RAF()
export default _instance