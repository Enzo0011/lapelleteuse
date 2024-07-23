import Box from './Box.js';
import MachineFactory from './MachineFactory.js';
import MachineType from './MachineType.js';

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

export default BoxBuilder;
