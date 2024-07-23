import MachineType from './MachineType.js';

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

export default Box;
