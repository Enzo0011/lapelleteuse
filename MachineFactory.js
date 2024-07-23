import Machine from './Machine.js';
import MachineType from './MachineType.js';

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

export default MachineFactory;
