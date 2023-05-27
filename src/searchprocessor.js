const data = require('./data.js');
const { Utils } = require('./utils.js');

class SearchResultType {
    static ELEMENT = 'element';
    static FAMILY  = 'family';
    static SHELL   = 'shell';
}

class SearchProcessor {

    _isAtomicNumberSearch(text) {
        return text !== undefined && text.length > 0 && !isNaN(parseInt(text[0]));
    }

    _getAtomicNumberMatches(text) {
        const results = [];
        for (let i = 0; i < data.elements.length; i++) {
            const atomicNumberString = String(data.elements[i].atomicNumber);
            const indexValue = atomicNumberString.indexOf(text);
            if (indexValue >= 0) {
                results.push({
                    type: SearchResultType.ELEMENT,
                    id: data.elements[i].atomicNumber,
                    atomicNumber: {
                        text: atomicNumberString,
                        index: indexValue,
                    },
                    name: {
                        text: data.elements[i].name,
                    },
                });
            }
        }
        return results.sort((o1, o2) => Utils.chainSort(o1, o2, [
                (o1, o2) => o1.atomicNumber.index - o2.atomicNumber.index,
                (o1, o2) => o1.id - o2.id,
            ]));
    }

    _getAtomicSymbolAndNameMatches(text) {
        const results = [];
        for (let i = 0; i < data.elements.length; i++) {
            const atomicSymbol = data.elements[i].symbol;
            const symbolIndexValue = atomicSymbol.toLowerCase().indexOf(text.toLowerCase());
            const atomicName = data.elements[i].name;
            const nameIndexValue = atomicName.toLowerCase().indexOf(text.toLowerCase());
            if (symbolIndexValue >= 0 || nameIndexValue >= 0) {
                results.push({
                    type: SearchResultType.ELEMENT,
                    id: data.elements[i].atomicNumber,
                    atomicSymbol: {
                        text: atomicSymbol,
                        index: symbolIndexValue >= 0 ? symbolIndexValue : undefined,
                    },
                    name: {
                        text: data.elements[i].name,
                        index: nameIndexValue >= 0 ? nameIndexValue : undefined,
                    },
                });
            }
        }
        return results.sort((o1, o2) => Utils.chainSort(o1, o2, [
                (o1, o2) => {
                    const o1IndexMin = this._getIndexMin(o1.atomicSymbol.index, o1.name.index);
                    const o2IndexMin = this._getIndexMin(o2.atomicSymbol.index, o2.name.index);
                    return o1IndexMin - o2IndexMin;
                },
                (o1, o2) => {
                    if (o1.atomicSymbol.index !== undefined && o1.name.index !== undefined && 
                        (o2.atomicSymbol.index === undefined || o2.name.index === undefined)) {
                        return -1;
                    } else if (o2.atomicSymbol.index !== undefined && o2.name.index !== undefined && 
                        (o1.atomicSymbol.index === undefined || o1.name.index === undefined)) {
                        return 1;
                    } else if (o1.atomicSymbol.index !== undefined && o2.atomicSymbol.index === undefined) {
                        return -1;
                    } else if (o2.atomicSymbol.index !== undefined && o1.atomicSymbol.index === undefined) {
                        return 1;
                    } else if (o1.name.index !== undefined && o2.name.index === undefined) {
                        return -1;
                    } else if (o2.name.index !== undefined && o1.name.index === undefined) {
                        return 1;
                    }
                    return 0;
                },
                (o1, o2) => {
                    return o1.atomicSymbol.index !== undefined && o2.atomicSymbol.index !== undefined ? o1.atomicSymbol.text.length - o2.atomicSymbol.text.length : 0;
                },
                (o1, o2) => {
                    const o1IndexMax = this._getIndexMax(o1.atomicSymbol.index, o1.name.index);
                    const o2IndexMax = this._getIndexMax(o2.atomicSymbol.index, o2.name.index);
                    return o1IndexMax - o2IndexMax;
                },
                (o1, o2) => o1.id - o2.id,
            ]));
    }

    _getElementFamilyNameMatches(text) {
        const results = [];
        for (let keyName in data.families) {
            const familyName = data.families[keyName].name;
            const nameIndexValue = familyName.toLowerCase().indexOf(text.toLowerCase());
            if (nameIndexValue >= 0) {
                results.push({
                    type: SearchResultType.FAMILY,
                    id: keyName,
                    name: {
                        text: familyName,
                        index: nameIndexValue >= 0 ? nameIndexValue : undefined,
                    },
                });
            }
        }
        return results.sort((o1, o2) => Utils.chainSort(o1, o2, [
                (o1, o2) => o1.name.index - o2.name.index,
            ]));
    }

    _getShellNameMatches(text) {
        const results = [];
        for (let keyName in data.shells) {
            const shellName = data.shells[keyName].name;
            const nameIndexValue = shellName.toLowerCase().indexOf(text.toLowerCase());
            if (nameIndexValue >= 0) {
                results.push({
                    type: SearchResultType.SHELL,
                    id: keyName,
                    name: {
                        text: shellName,
                        index: nameIndexValue >= 0 ? nameIndexValue : undefined,
                    },
                });
            }
        }
        return results.sort((o1, o2) => Utils.chainSort(o1, o2, [
                (o1, o2) => o1.name.index - o2.name.index,
            ]));
    }

    _getIndexMin(index1, index2) {
        if (index1 !== undefined && index2 !== undefined) {
            return Math.min(index1, index2);
        } else if (index1 !== undefined) {
            return index1;
        } else {
            return index2;
        }
    }

    _getIndexMax(index1, index2) {
        if (index1 !== undefined && index2 !== undefined) {
            return Math.max(index1, index2);
        } else if (index1 !== undefined) {
            return index1;
        } else {
            return index2;
        }
    }

    query(text, maxResults) {
        let results = [];
        if (this._isAtomicNumberSearch(text)) {
            results.push(...this._getAtomicNumberMatches(text));
        } else {
            const atomicSymbolNameMatches = this._getAtomicSymbolAndNameMatches(text);
            const elementFamilyNameMatches = this._getElementFamilyNameMatches(text);
            const shellNameMatches = this._getShellNameMatches(text);
            results.push(...atomicSymbolNameMatches);
            results.push(...elementFamilyNameMatches);
            results.push(...shellNameMatches);
        }
        
        return results.slice(0, maxResults);
    }

}

module.exports = {
    SearchProcessor: SearchProcessor,
    SearchResultType: SearchResultType,
}