const { Utils } = require('./utils.js');
const data = require('./data.js');

class SelectModes {
    static ELEMENT = 'element';
    static FAMILY = 'family';
    static SHELL = 'shell';
}

class DisplayModes {
    static STANDARD = 'standard';
    static FAMILIES = 'families';
    static SHELLS = 'shells';
    static STATES = 'states';
}

class PeriodicTable {

    static LAYOUT = [
        [   1,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   2 ],
        [   3,   4,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   5,   6,   7,   8,   9,  10 ],
        [  11,  12,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  13,  14,  15,  16,  17,  18 ],
        [  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36 ],
        [  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,  52,  53,  54 ],
        [  55,  56,   0,  72,  73,  74,  75,  76,  77,  78,  79,  80,  81,  82,  83,  84,  85,  86 ],
        [  87,  88,   0, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118 ],
        [   0,   0,  57,  58,  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,   0 ],
        [   0,   0,  89,  90,  91,  92,  93,  94,  95,  96,  97,  98,  99, 100, 101, 102, 103,   0 ],
    ];

}

class StateController {

    familiesTable = [
        [  0,  1,  2,  3 ],
        [  4,  5,  6,  7 ],
        [  8,  9,  0,  0 ],
    ];

    shellsTable = [
        [  0,  1,  2,  3 ],
    ];

    familyNames = [ 
        'Alkali metal', 'Alkaline earth metal', 'Transition metal', 'Post-transition metal',
        'Metalloid',    'Nonmetal',             'Halogen',          'Noble gas',
        'Lanthanide',   'Actinide',
    ];

    shellNames = [
        's-shell', 'p-shell', 'd-shell', 'f-shell',
    ];

    displayModeOrder = [
        DisplayModes.STANDARD,
        DisplayModes.FAMILIES,
        DisplayModes.SHELLS,
        DisplayModes.STATES,
    ];

    panelKeyNames = [
        { key: "atomicNumber",          name: "Atomic Number"     },
        { key: "symbol",                name: "Symbol"            },
        { key: "atomicMass",            name: "Atomic Mass"       },
        { key: "numberofProtons",       name: "Protons"           },
        { key: "numberOfNeutrons",      name: "Neutrons"          },
        { key: "numberofElectrons",     name: "Electrons"         },
        { key: "numberofValence",       name: "Valence Electrons" },
        { key: "valency",               name: "Valency"           },
        { key: "atomicRadius",          name: "Atomic Radius"     },
        { key: "density",               name: "Density"           },
        { key: "electronegativity",     name: "Electronegativity" },
        { key: "ionizationEnergy",      name: "Ionization Energy" },
        { key: "electronAffinity",      name: "Electron Affinity" },
        { key: "standardState",         name: "State"             },
        { key: "meltingPoint",          name: "Melting Point"     },
        { key: "boilingPoint",          name: "Boiling Point"     },
        { key: "specificHeat",          name: "Specific Heat"     },
        { key: "yearDiscovered",        name: "Year"              },
        { key: "electronConfiguration", name: "Electron Config"   },
        { key: "oxidationStates",       name: "Oxidation States"  },
    ];

    constructor(config) {
        if (config && Utils.isValidAtomicNumber(config.atomicNumber)) {
            this.currentFocus = { type: SelectModes.ELEMENT, id: config.atomicNumber };
        } else {
            this.currentFocus = { type: SelectModes.ELEMENT, id: 1 };
        }
        this.elements = Utils.getElements(data.elements);
        this.currentDisplayMode = DisplayModes.STANDARD;
    }

    processLeft() {
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            if (this.currentFocus.id > 1) {
                this.currentFocus.id = this.currentFocus.id - 1;
                return true;
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY || this.currentFocus.type === SelectModes.SHELL) {
            if (this.currentFocus.id > 0) {
                this.currentFocus.id = this.currentFocus.id - 1;
                return true;
            }
        }
        return false;
    }

    processRight() {
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            if (this.currentFocus.id < 118) {
                this.currentFocus.id = this.currentFocus.id + 1;
                return true;
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            if (this.currentFocus.id < 9) {
                this.currentFocus.id = this.currentFocus.id + 1;
                return true;
            }
        } else if (this.currentFocus.type === SelectModes.SHELL) {
            if (this.currentFocus.id < 3) {
                this.currentFocus.id = this.currentFocus.id + 1;
                return true;
            }
        }
        return false;
    }

    processUp() {
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            const currentPos = this._findElement(this.currentFocus.id);
            if (this.currentFocus.id === 57) {
                this.currentFocus.id = 39;
                return true;
            } else if (currentPos.row > 0) {
                const nextAtomicNumber = PeriodicTable.LAYOUT[currentPos.row - 1][currentPos.column];
                if (nextAtomicNumber !== 0) {
                    this.currentFocus.id = nextAtomicNumber;
                    return true;
                }
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            if (this.currentFocus.id >= 4 && this.currentFocus.id <= 9) {
                this.currentFocus.id -= 4;
            } else if (this.currentFocus.id === 0) {
                this.currentFocus = { type: SelectModes.ELEMENT, id: 89 };
            } else if (this.currentFocus.id === 1) {
                this.currentFocus = { type: SelectModes.ELEMENT, id: 91 };
            } else if (this.currentFocus.id === 2) {
                this.currentFocus = { type: SelectModes.ELEMENT, id: 95 };
            } else {
                this.currentFocus = { type: SelectModes.ELEMENT, id: 99 };
            }
            return true;
        }  else if (this.currentFocus.type === SelectModes.SHELL) {
            if (this.currentFocus.id === 0) {
                this.currentFocus = { type: SelectModes.FAMILY, id: 8 };
            } else if (this.currentFocus.id === 1) {
                this.currentFocus = { type: SelectModes.FAMILY, id: 9 };
            } else if (this.currentFocus.id === 2) {
                this.currentFocus = { type: SelectModes.FAMILY, id: 6 };
            } else {
                this.currentFocus = { type: SelectModes.FAMILY, id: 7 };
            }
            return true;
        }
        return false;
    }

    processDown() {
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            const currentPos = this._findElement(this.currentFocus.id);
            if (this.currentFocus.id === 39 || this.currentFocus.id === 87 || this.currentFocus.id === 88) {
                this.currentFocus.id = 57;
                return true;
            } else if (this.currentFocus.id === 118) {
                this.currentFocus.id = 71;
                return true;
            } else {
                if (currentPos.row < 8) {
                    this.currentFocus.id = PeriodicTable.LAYOUT[currentPos.row + 1][currentPos.column];
                } else {
                    if (this.currentFocus.id === 89 || this.currentFocus.id === 90) {
                        this.currentFocus = { type: SelectModes.FAMILY, id: 0 };
                    } else if (this.currentFocus.id === 91 || this.currentFocus.id === 92 || this.currentFocus.id === 93 || this.currentFocus.id === 94) {
                        this.currentFocus = { type: SelectModes.FAMILY, id: 1 };
                    } else if (this.currentFocus.id === 95 || this.currentFocus.id === 96 || this.currentFocus.id === 97 || this.currentFocus.id === 98) {
                        this.currentFocus = { type: SelectModes.FAMILY, id: 2 };
                    } else {
                        this.currentFocus = { type: SelectModes.FAMILY, id: 3 };
                    }
                }
                return true;
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            if (this.currentFocus.id >= 0 && this.currentFocus.id <= 5) {
                this.currentFocus.id += 4;
            } else if (this.currentFocus.id === 6) {
                this.currentFocus = { type: SelectModes.SHELL, id: 2 };
            } else if (this.currentFocus.id === 7) {
                this.currentFocus = { type: SelectModes.SHELL, id: 3 };
            } else if (this.currentFocus.id === 8) {
                this.currentFocus = { type: SelectModes.SHELL, id: 0 };
            } else {
                this.currentFocus = { type: SelectModes.SHELL, id: 1 };
            }
            return true;
        }
        return false;
    }

    processSlash() {
        const currentIndex = this.displayModeOrder.findIndex((e) => e === this.currentDisplayMode);
        if (currentIndex === this.displayModeOrder.length - 1) {
            this.currentDisplayMode = this.displayModeOrder[0];
        } else {
            this.currentDisplayMode = this.displayModeOrder[currentIndex + 1];
        }
        return true;
    }

    processBackslash() {
        const currentIndex = this.displayModeOrder.findIndex((e) => e === this.currentDisplayMode);
        if (currentIndex === 0) {
            this.currentDisplayMode = this.displayModeOrder[this.displayModeOrder.length - 1];
        } else {
            this.currentDisplayMode = this.displayModeOrder[currentIndex - 1];
        }
        return true;
    }

    getRenderConfig() {
        const board = [];
        const families = {};
        const shells = {};
        var group;
        var period;
        var panel = {};
        for (let r = 0; r < PeriodicTable.LAYOUT.length; r++) {
            const row = [];
            for (let c = 0; c < PeriodicTable.LAYOUT[r].length; c++) {
                if (PeriodicTable.LAYOUT[r][c] > 0) {
                    const config = { atomicNumber: PeriodicTable.LAYOUT[r][c] };
                    if (this.currentFocus.type == SelectModes.ELEMENT && this.currentFocus.id === PeriodicTable.LAYOUT[r][c]) {
                        config.selected = {
                            type: SelectModes.ELEMENT,
                        };
                    } else if (this.currentFocus.type == SelectModes.FAMILY && this.elements[PeriodicTable.LAYOUT[r][c]].family === this.familyNames[this.currentFocus.id]) {
                        config.selected = {
                            type: SelectModes.FAMILY,
                        };
                    } else if (this.currentFocus.type == SelectModes.SHELL && this.elements[PeriodicTable.LAYOUT[r][c]].shell === this.shellNames[this.currentFocus.id]) {
                        config.selected = {
                            type: SelectModes.SHELL,
                        };
                    }
                    if (this.currentDisplayMode === DisplayModes.FAMILIES) {
                        config.display = { family: this.elements[PeriodicTable.LAYOUT[r][c]].family };
                    } else if (this.currentDisplayMode === DisplayModes.SHELLS) {
                        config.display = { shell: this.elements[PeriodicTable.LAYOUT[r][c]].shell };
                    } else if (this.currentDisplayMode === DisplayModes.STATES) {
                        config.display = { state: this.elements[PeriodicTable.LAYOUT[r][c]].standardState };
                    }
                    row.push(config);
                } else {
                    row.push(undefined);
                }
            }
            board.push(row);
        }

        if (this.currentFocus.type === SelectModes.ELEMENT) {
            families.indicated = this.elements[this.currentFocus.id].family;
            shells.indicated = this.elements[this.currentFocus.id].shell;
            group = this.elements[this.currentFocus.id].group;
            period = this.elements[this.currentFocus.id].period;
            panel.top = this.elements[this.currentFocus.id].name;
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            families.selected = this.familyNames[this.currentFocus.id];
            panel.top = data.families[this.familyNames[this.currentFocus.id]].name;
        } else if (this.currentFocus.type === SelectModes.SHELL) {
            shells.selected = this.shellNames[this.currentFocus.id];
            panel.top = data.shells[this.shellNames[this.currentFocus.id]].name;
        }

        var panel = {};
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            panel.top = { 
                element: this.elements[this.currentFocus.id].name,
                id: this.currentFocus.id,
            };
            panel.bottom = { list: [] };
            for (const keyConfig of this.panelKeyNames) {
                const value = this.elements[this.currentFocus.id][keyConfig.key];
                if (value !== undefined) {
                    panel.bottom.list.push({ key: keyConfig.name, value: String(value) });
                } else {
                    panel.bottom.list.push({ key: keyConfig.name, value: '-', empty: true });
                }
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            panel.top = { 
                family: data.families[this.familyNames[this.currentFocus.id]].name,
                id: this.familyNames[this.currentFocus.id],
            };
            panel.bottom = { description: data.families[this.familyNames[this.currentFocus.id]].description };
        } else if (this.currentFocus.type === SelectModes.SHELL) {
            panel.top = { 
                shell: data.shells[this.shellNames[this.currentFocus.id]].name,
                id: this.shellNames[this.currentFocus.id],
            };
            panel.bottom = { description: data.shells[this.shellNames[this.currentFocus.id]].description };
        }

        return {
            elements: board,
            families: families,
            shells: shells,
            group: group,
            period: period,
            displayMode: this.currentDisplayMode,
            panel: panel,
        };
    }

    _findElement(atomicNumber) {
        for (var row = 0; row < PeriodicTable.LAYOUT.length; row++) {
            for (var column = 0; column < PeriodicTable.LAYOUT[row].length; column++) {
                if (PeriodicTable.LAYOUT[row][column] === atomicNumber) {
                    return { row: row, column: column };
                }
            }
        }
    }

}

module.exports = {
    StateController: StateController,
    SelectModes: SelectModes,
    DisplayModes: DisplayModes,
    PeriodicTable: PeriodicTable,
}