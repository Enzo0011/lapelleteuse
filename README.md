
# LaPelleteuse.com

## Description

LaPelleteuse.com est une application de gestion de parc d'engins de chantier pour une entreprise spécialisée dans la location d'engins de chantier. Le projet vise à simplifier la gestion des engins en s'assurant que chaque box contient au maximum 8 engins, avec au moins un engin de chaque type (Pelleteuse, Tractopelle, Nacelle, Bulldozer, Rouleau compresseur).

## Fonctionnalités

-   **Gestion des types d'engins** : Chaque engin est de l'un des cinq types définis.
-   **Création d'engins** : Utilisation d'une factory pour créer des instances d'engins en fonction de leur type.
-   **Construction de boxes** : Chaque box peut contenir jusqu'à 8 engins avec au moins un engin de chaque type.
-   **Gestion de boxes** : Ajout et gestion des boxes à travers un singleton pour assurer une gestion centralisée et unique du parc.

## Design Patterns Utilisés

1.  **Factory Pattern** : Utilisé pour la création des instances d'engins en fonction de leur type, encapsulant ainsi la logique de création.

    ```js
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
    ```

2.  **Builder Pattern** : Utilisé pour la construction de boxes, permettant d'ajouter les engins requis et additionnels avant de finaliser la création du box.

    ```js
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
    ```

3.  **Singleton Pattern** : Utilisé pour la gestion centralisée des boxes, assurant qu'il n'y a qu'une seule instance de `BoxManager`.
    
    ```js
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
    ```
    
## Installation et Exécution

1.  Clonez ce dépôt :
    
    ```bash
    git clone https://github.com/Enzo0011/lapelleteuse.git
    ```
2.  Naviguez dans le répertoire du projet :

    ```bash
    cd lapelleteuse
    ```
3.  Exécutez le script :
    
    ```bash
    node main.js 
    ```
## Test

Un script de test (`test.js`) est inclus pour vérifier que les fonctionnalités et les contraintes sont respectées.

Pour exécuter les tests :

```bash
cd test
node test.js
```

## Auteurs

-  **GALIEGUE Enzo**