class Utils {

    static getElements(elements) {
        const elementMap = {};
        for (const element of elements) {
            elementMap[element.atomicNumber] = element;
        }
        return elementMap;
    }

    static getFamilies(elements) {
        const families = {};
        for (const element of elements) {
            if (element.family !== undefined && element.family !== '') {
                if (families[element.family] === undefined) {
                    families[element.family] = [];
                }
                families[element.family].push(element);
            }
        }
        return families;
    }

    static getShells(elements) {
        const shells = {};
        for (const element of elements) {
            if (element.shell !== undefined && element.shell !== '') {
                if (shells[element.shell] === undefined) {
                    shells[element.shell] = [];
                }
                shells[element.shell].push(element);
            }
        }
        return shells;
    }

    static isValidAtomicNumber(atomicNumber) {
        return atomicNumber && atomicNumber >= 1 && atomicNumber <= 118;
    }

    static isBottomSection(atomicNumber) {
        // Lanthanide or Actinide
        return (atomicNumber >= 57 && atomicNumber <= 71) || (atomicNumber >= 89 && atomicNumber <= 103);
    }

}

module.exports = {
    Utils: Utils
};