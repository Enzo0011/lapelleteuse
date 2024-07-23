class BoxManager {
    constructor() {
        if (!BoxManager.instance) {
            this.boxes = [];
            BoxManager.instance = this;
        }
        return BoxManager.instance;
    }

    addBox(box) {
        this.boxes.push(box);
    }

    getAllBoxes() {
        return this.boxes;
    }

    static getInstance() {
        if (!BoxManager.instance) {
            BoxManager.instance = new BoxManager();
        }
        return BoxManager.instance;
    }
}

export default BoxManager;
