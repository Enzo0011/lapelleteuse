const MachineType = Object.freeze({
    PELLETEUSE: 'Pelleteuse',
    TRACTOPELLE: 'Tractopelle',
    NACELLE: 'Nacelle',
    BULLDOZER: 'Bulldozer',
    ROULEAU_COMPRESSEUR: 'Rouleau compresseur'
});

class Machine {
    constructor(type) {
        this.type = type;
    }
}

class MachineFactory {
    static createMachine(type) {
        switch (type) {
            case MachineType.PELLETEUSE:
                return new Machine(MachineType.PELLETEUSE);
            case MachineType.TRACTOPELLE:
                return new Machine(MachineType.TRACTOPELLE);
            case MachineType.NACELLE:
                return new Machine(MachineType.NACELLE);
            case MachineType.BULLDOZER:
                return new Machine(MachineType.BULLDOZER);
            case MachineType.ROULEAU_COMPRESSEUR:
                return new Machine(MachineType.ROULEAU_COMPRESSEUR);
            default:
                throw new Error('Unknown machine type');
        }
    }
}

class Box {
    constructor() {
        this.machines = [];
    }

    addMachine(machine) {
        if (this.machines.length < 8) {
            this.machines.push(machine);
        } else {
            throw new Error('Box is full');
        }
    }

    hasMinimumOneOfEachType() {
        const types = new Set(this.machines.map(machine => machine.type));
        return Object.values(MachineType).every(type => types.has(type));
    }

    getMachineCount() {
        return this.machines.length;
    }
}

class BoxBuilder {
    constructor() {
        this.box = new Box();
    }

    addRequiredMachines() {
        Object.values(MachineType).forEach(type => {
            this.box.addMachine(MachineFactory.createMachine(type));
        });
        return this;
    }

    addAdditionalMachines(count) {
        const additionalTypes = Object.values(MachineType);
        for (let i = 0; i < count; i++) {
            const randomType = additionalTypes[Math.floor(Math.random() * additionalTypes.length)];
            this.box.addMachine(MachineFactory.createMachine(randomType));
        }
        return this;
    }

    build() {
        if (!this.box.hasMinimumOneOfEachType()) {
            throw new Error('Box must have at least one of each machine type');
        }
        return this.box;
    }
}

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

    // Reset uniquement pour les tests
    static resetInstance() {
        BoxManager.instance = null;
    }
}

// Export uniquement pour les tests
module.exports = {
    MachineType,
    Machine,
    MachineFactory,
    Box,
    BoxBuilder,
    BoxManager
};