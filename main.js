import BoxBuilder from './BoxBuilder.js';
import BoxManager from './BoxManager.js';

try {
    const boxBuilder = new BoxBuilder();
    const box = boxBuilder.addRequiredMachines().addAdditionalMachines(2).build();

    const boxManager = BoxManager.getInstance();
    boxManager.addBox(box);

    console.log('Box created and added to the manager:', box);
    console.log('All boxes:', boxManager.getAllBoxes());
} catch (error) {
    console.error(error.message);
}
