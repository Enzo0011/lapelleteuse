const assert = require('assert');
const {
    MachineType,
    MachineFactory,
    Box,
    BoxBuilder,
    BoxManager
} = require('./index_test');

(() => {
    // Test 1: On créer et ajoute plusieurs boxes
    BoxManager.resetInstance(); // Reset de BoxManager

    const boxManager = BoxManager.getInstance();
    
    // On créer et ajoute la première box
    const boxBuilder1 = new BoxBuilder();
    const box1 = boxBuilder1.addRequiredMachines().addAdditionalMachines(3).build();
    assert.strictEqual(box1.getMachineCount(), 8, 'Box 1 should contain 8 machines');
    assert.strictEqual(box1.hasMinimumOneOfEachType(), true, 'Box 1 should have at least one of each type');
    boxManager.addBox(box1);

    // On créer et ajoute la deuxième box
    const boxBuilder2 = new BoxBuilder();
    const box2 = boxBuilder2.addRequiredMachines().addAdditionalMachines(2).build();
    assert.strictEqual(box2.getMachineCount(), 7, 'Box 2 should contain 7 machines');
    assert.strictEqual(box2.hasMinimumOneOfEachType(), true, 'Box 2 should have at least one of each type');
    boxManager.addBox(box2);

    assert.strictEqual(boxManager.getAllBoxes().length, 2, 'BoxManager should contain 2 boxes');

    // Test 2: On vérifie que chaque box contient bien un minimum de chaque type d'engin
    boxManager.getAllBoxes().forEach(box => {
        assert.strictEqual(box.hasMinimumOneOfEachType(), true, 'Each box should have at least one of each type');
    });

    // Test 3: On vérifie qu'une box ne peut pas contenir plus de 8 engins
    const overfilledBoxBuilder = new BoxBuilder();
    overfilledBoxBuilder.addRequiredMachines().addAdditionalMachines(3);
    try {
        overfilledBoxBuilder.addAdditionalMachines(1).build();
        assert.fail('Box should not be able to contain more than 8 machines');
    } catch (error) {
        assert.strictEqual(error.message, 'Box is full', 'Error message should be "Box is full"');
    }

    console.log('All tests passed successfully.');
})();
