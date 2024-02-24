const { Utils } = require('./utils.js');
const data = require('./data.js');
const { SearchProcessor, SearchResultType } = require('./searchprocessor.js');

class SelectModes {
    static ELEMENT = 'element';
    static FAMILY  = 'family';
    static SHELL   = 'shell';
    static SEARCH  = 'search';
}

class DisplayModes {
    static STANDARD          = { name: 'standard'                                                   };
    static FAMILIES          = { name: 'families'                                                   };
    static SHELLS            = { name: 'shells'                                                     };
    static STATES            = { name: 'states',            key: 'standardState'                    };
    static ATOMIC_MASS       = { name: 'atomicMass',        key: 'atomicMass',        isMeter: true };
    static PROTONS           = { name: 'protons',           key: 'numberOfProtons',   isMeter: true };
    static NEUTRONS          = { name: 'neutrons',          key: 'numberOfNeutrons',  isMeter: true };
    static ELECTRONS         = { name: 'electrons',         key: 'numberOfElectrons', isMeter: true };
    static VALENCE_ELECTRONS = { name: 'numberOfValence',   key: 'numberOfValence'                  };
    static VALENCY           = { name: 'valency',           key: 'valency'                          };
    static ATOMIC_RADIUS     = { name: 'atomicRadius',      key: 'atomicRadius',      isMeter: true };
    static DENSITY           = { name: 'density',           key: 'density',           isMeter: true };
    static ELECTRONEGATIVITY = { name: 'electronegativity', key: 'electronegativity', isMeter: true };
    static IONIZATION_ENERGY = { name: 'ionizationEnergy',  key: 'ionizationEnergy',  isMeter: true };
    static ELECTRON_AFFINITY = { name: 'electronAffinity',  key: 'electronAffinity',  isMeter: true };
    static MELTING_POINT     = { name: 'meltingPoint',      key: 'meltingPoint',      isMeter: true };
    static BOILING_POINT     = { name: 'boilingPoint',      key: 'boilingPoint',      isMeter: true };
    static SPECIFIC_HEAT     = { name: 'specificHeat',      key: 'specificHeat',      isMeter: true };
    static RADIOACTIVE       = { name: 'radioactive',       key: 'radioactive'                      };
    static OCCURRENCE        = { name: 'occurrence',        key: 'occurrence'                       };
    static YEAR              = { name: 'yearDiscovered',    key: 'yearDiscovered',    isMeter: true };
}

class Layout {

    static PeriodicTable = [
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

    static FamiliesTable = [ 
        { key: 'Alkali metal', index: 0 }, { key: 'Alkaline earth metal', index: 1 }, { key: 'Transition metal', index: 2 }, { key: 'Post-transition metal', index: 3 },
        { key: 'Metalloid',    index: 4 }, { key: 'Nonmetal',             index: 5 }, { key: 'Halogen',          index: 6 }, { key: 'Noble gas',             index: 7 },
        { key: 'Lanthanide',   index: 8 }, { key: 'Actinide',             index: 9 },
    ];

    static ShellsTable = [
        { key: 's-shell', index: 0 }, { key: 'p-shell', index: 1 }, { key: 'd-shell', index: 2 }, { key: 'f-shell', index: 3 },
    ];

    static PanelData = [
        { key: 'atomicNumber',          name: 'Atomic Number'     },
        { key: 'symbol',                name: 'Symbol'            },
        { key: 'standardState',         name: 'State'             },
        { key: 'atomicMass',            name: 'Atomic Mass'       },
        { key: 'numberOfProtons',       name: 'Protons'           },
        { key: 'numberOfNeutrons',      name: 'Neutrons'          },
        { key: 'numberOfElectrons',     name: 'Electrons'         },
        { key: 'numberOfValence',       name: 'Valence Electrons' },
        { key: 'valency',               name: 'Valency'           },
        { key: 'atomicRadius',          name: 'Atomic Radius'     },
        { key: 'density',               name: 'Density'           },
        { key: 'electronegativity',     name: 'Electronegativity' },
        { key: 'ionizationEnergy',      name: 'Ionization Energy' },
        { key: 'electronAffinity',      name: 'Electron Affinity' },
        { key: 'meltingPoint',          name: 'Melting Point'     },
        { key: 'boilingPoint',          name: 'Boiling Point'     },
        { key: 'specificHeat',          name: 'Specific Heat'     },
        { key: 'radioactive',           name: 'Radioactive'       },
        { key: 'occurrence',            name: 'Occurrence'        },
        { key: 'yearDiscovered',        name: 'Year'              },
        { key: 'electronConfiguration', name: 'Electron Config'   },
        { key: 'oxidationStates',       name: 'Oxidation States'  },
    ];

    static SearchConfig = {
        MAX_SEARCH_LENGTH:  36,
        MAX_SEARCH_RESULTS: 23,
    };

}

class StateController {

    displayModeOrder = [
        DisplayModes.STANDARD,
        DisplayModes.FAMILIES,
        DisplayModes.SHELLS,
        DisplayModes.STATES,
        DisplayModes.ATOMIC_MASS,
        DisplayModes.PROTONS,
        DisplayModes.NEUTRONS,
        DisplayModes.ELECTRONS,
        DisplayModes.VALENCE_ELECTRONS,
        DisplayModes.VALENCY,
        DisplayModes.ATOMIC_RADIUS,
        DisplayModes.DENSITY,
        DisplayModes.ELECTRONEGATIVITY,
        DisplayModes.IONIZATION_ENERGY,
        DisplayModes.ELECTRON_AFFINITY,
        DisplayModes.MELTING_POINT,
        DisplayModes.BOILING_POINT,
        DisplayModes.SPECIFIC_HEAT,
        DisplayModes.RADIOACTIVE,
        DisplayModes.OCCURRENCE,
        DisplayModes.YEAR,
    ];

    constructor(config) {
        if (config && Utils.isValidAtomicNumber(config.atomicNumber)) {
            this.currentFocus = { type: SelectModes.ELEMENT, id: config.atomicNumber };
        } else if (config && Utils.isValidElementSymbol(config.symbol, data.elements)) {
            this.currentFocus = { type: SelectModes.ELEMENT, id: Utils.getElementBySymbol(config.symbol, data.elements).atomicNumber };
        } else if (config && Utils.isValidElementName(config.name, data.elements)) {
            this.currentFocus = { type: SelectModes.ELEMENT, id: Utils.getElementByName(config.name, data.elements).atomicNumber };
        } else {
            this.currentFocus = { type: SelectModes.ELEMENT, id: 1 };
        }
        this.elements = Utils.getElements(data.elements);
        this.currentDisplayMode = DisplayModes.STANDARD;

        this.previousFocus = undefined;
        this.searchProcessor = new SearchProcessor();
        this.searchState = {};

        this.initMeterConfig();
    }

    initMeterConfig() {
        const fieldFormatters = {
            'atomicMass':        (v) => Utils.parseNumber(v, ' u'.length),
            'numberOfProtons':   (v) => Utils.parseNumber(v),
            'numberOfNeutrons':  (v) => Utils.parseNumber(v),
            'numberOfElectrons': (v) => Utils.parseNumber(v),
            'numberOfValence':   (v) => Utils.parseNumber(v),
            'valency':           (v) => Utils.parseNumber(v),
            'atomicRadius':      (v) => Utils.parseNumber(v, ' pm'.length),
            'density':           (v) => Utils.parseNumber(v, ' g/cm³'.length),
            'electronegativity': (v) => Utils.parseNumber(v),
            'ionizationEnergy':  (v) => Utils.parseNumber(v, ' eV'.length),
            'electronAffinity':  (v) => Utils.parseNumber(v, ' eV'.length),
            'meltingPoint':      (v) => Utils.parseNumber(v, ' K'.length),
            'boilingPoint':      (v) => Utils.parseNumber(v, ' K'.length),
            'specificHeat':      (v) => Utils.parseNumber(v, ' J/g K'.length),
            'yearDiscovered':    (v) => Utils.parseNumber(v),
        };

        const fieldConfigs = {};

        for (const mode of this.displayModeOrder) {
            if (mode.isMeter) {
                const fieldList = Utils.getValuesForElementField(Object.values(this.elements), mode.key, fieldFormatters[mode.key]);
                fieldConfigs[mode.key] = { minValue: Utils.getMinValue(fieldList), maxValue: Utils.getMaxValue(fieldList) };
            }
        }

        for (let atomicNumber in this.elements) {
            const element = this.elements[atomicNumber];
            element.meterConfig = {};

            for (const mode of this.displayModeOrder) {
                if (mode.isMeter) {
                    const fieldValue = element[mode.key];
                    element.meterConfig[mode.key] = Utils.getMeterValue(fieldFormatters[mode.key](fieldValue), fieldConfigs[mode.key]);
                }
            }
        }
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
        } else if (this.currentFocus.type === SelectModes.SEARCH) {
            this.currentFocus = this.previousFocus;
            this.previousFocus = undefined;
            this.searchState = {};
            return true;
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
                const nextAtomicNumber = Layout.PeriodicTable[currentPos.row - 1][currentPos.column];
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
        } else if (this.currentFocus.type === SelectModes.SHELL) {
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
        } else if (this.currentFocus.type === SelectModes.SEARCH) {
            if (this.searchState && this.searchState.results && this.searchState.results.length > 0 && 
                this.searchState.index !== undefined && this.searchState.index > 0) {
                this.searchState.index--;
                return true;
            }
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
                    this.currentFocus.id = Layout.PeriodicTable[currentPos.row + 1][currentPos.column];
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
        } else if (this.currentFocus.type === SelectModes.SEARCH) {
            if (this.searchState && this.searchState.results && this.searchState.results.length > 0 && 
                this.searchState.index !== undefined && this.searchState.index + 1 < this.searchState.results.length) {
                this.searchState.index++;
                return true;
            }
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

    processBackspace() {
        if (this.currentFocus.type === SelectModes.SEARCH) {
            if (this.searchState && this.searchState.query && this.searchState.query.length > 0) {
                this.searchState.query = this.searchState.query.substring(0, this.searchState.query.length - 1);
                if (this.searchState.query.length === 0) {
                    this.currentFocus = this.previousFocus;
                    this.previousFocus = undefined;
                    this.searchState = {};
                    return true;
                }
                this.searchState.results = this.searchProcessor.query(this.searchState.query, Layout.SearchConfig.MAX_SEARCH_RESULTS);
                this.searchState.index = 0;
            }
            return true;
        }
        return false;
    }

    processEnter() {
        if (this.currentFocus.type === SelectModes.SEARCH) {
            if (this.searchState && this.searchState.results && this.searchState.results.length > 0 && this.searchState.index < this.searchState.results.length) {
                const selectedItem = this.searchState.results[this.searchState.index];
                if (selectedItem.type === SearchResultType.ELEMENT) {
                    this.currentFocus = { type: SelectModes.ELEMENT, id: selectedItem.id };
                } else if (selectedItem.type === SearchResultType.FAMILY) {
                    const familyIndex = this._findFamily(selectedItem.id);
                    this.currentFocus = { type: SelectModes.FAMILY, id: familyIndex };
                } else if (selectedItem.type === SearchResultType.SHELL) {
                    const shellIndex = this._findShell(selectedItem.id);
                    this.currentFocus = { type: SelectModes.SHELL, id: shellIndex };
                } else {
                    this.currentFocus = this.previousFocus;
                }
            } else {
                this.currentFocus = this.previousFocus;
            }
            this.previousFocus = undefined;
            this.searchState = {};
            return true;
        }
        return false;
    }

    processSearchInput(key) {
        if (this.currentFocus.type !== SelectModes.SEARCH) {
            // Don't start query with space or dash
            if (key === ' ' || key === '-') {
                return false;
            }
            this.previousFocus = this.currentFocus;
            this.currentFocus = { type: SelectModes.SEARCH };
            this.searchState.query = '';
        }

        if (this.searchState.query && this.searchState.query.length >= Layout.SearchConfig.MAX_SEARCH_LENGTH) {
            return false;
        }

        // Don't allow appending multiple spaces or dashes
        if (this.searchState.query && this.searchState.query.length > 0 && 
            ((this.searchState.query.charAt(this.searchState.query.length - 1) === ' ' && key === ' ') || 
            (this.searchState.query.charAt(this.searchState.query.length - 1) === '-' && key === '-'))) {
            return false;
        }

        this.searchState.query += key.toUpperCase();
        this.searchState.results = this.searchProcessor.query(this.searchState.query, Layout.SearchConfig.MAX_SEARCH_RESULTS);
        this.searchState.index = 0;
        return true;
    }

    getRenderConfig() {
        const board = {};
        const families = {};
        const shells = {};
        var group;
        var period;
        var panel = {};
        for (let r = 0; r < Layout.PeriodicTable.length; r++) {
            for (let c = 0; c < Layout.PeriodicTable[r].length; c++) {
                if (Layout.PeriodicTable[r][c] > 0) {
                    const config = { atomicNumber: Layout.PeriodicTable[r][c] };
                    if (this.currentFocus.type == SelectModes.ELEMENT && this.currentFocus.id === Layout.PeriodicTable[r][c]) {
                        config.selected = {
                            type: SelectModes.ELEMENT,
                        };
                    } else if (this.currentFocus.type == SelectModes.FAMILY && this.elements[Layout.PeriodicTable[r][c]].family === Layout.FamiliesTable[this.currentFocus.id].key) {
                        config.selected = {
                            type: SelectModes.FAMILY,
                        };
                    } else if (this.currentFocus.type == SelectModes.SHELL && this.elements[Layout.PeriodicTable[r][c]].shell === Layout.ShellsTable[this.currentFocus.id].key) {
                        config.selected = {
                            type: SelectModes.SHELL,
                        };
                    }
                    if (this.currentDisplayMode === DisplayModes.FAMILIES) {
                        config.display = { family: this.elements[Layout.PeriodicTable[r][c]].family };
                    } else if (this.currentDisplayMode === DisplayModes.SHELLS) {
                        config.display = { shell: this.elements[Layout.PeriodicTable[r][c]].shell };
                    } else if (this.currentDisplayMode === DisplayModes.STATES) {
                        config.display = { state: this.elements[Layout.PeriodicTable[r][c]].standardState };
                    } else if (this.currentDisplayMode === DisplayModes.VALENCE_ELECTRONS) {
                        config.display = { valenceElectrons: this.elements[Layout.PeriodicTable[r][c]].numberOfValence };
                    } else if (this.currentDisplayMode === DisplayModes.VALENCY) {
                        config.display = { valency: this.elements[Layout.PeriodicTable[r][c]].valency };
                    } else if (this.currentDisplayMode === DisplayModes.RADIOACTIVE) {
                        config.display = { radioactive: this.elements[Layout.PeriodicTable[r][c]].radioactive };
                    } else if (this.currentDisplayMode === DisplayModes.OCCURRENCE) {
                        config.display = { occurrence: this.elements[Layout.PeriodicTable[r][c]].occurrence };
                    } else if (this.currentDisplayMode && this.currentDisplayMode.isMeter) {
                        config.display = { meter: this.elements[Layout.PeriodicTable[r][c]].meterConfig[this.currentDisplayMode.key] };
                        if (this.currentDisplayMode === DisplayModes.YEAR) {
                            config.display.isAncient = this.elements[Layout.PeriodicTable[r][c]][this.currentDisplayMode.key] === 'Ancient' ? true : undefined;
                        }
                    }
                    board[Layout.PeriodicTable[r][c]] = config;
                }
            }
        }

        if (this.currentFocus.type === SelectModes.ELEMENT) {
            families.indicated = this.elements[this.currentFocus.id].family;
            shells.indicated = this.elements[this.currentFocus.id].shell;
            group = this.elements[this.currentFocus.id].group;
            period = this.elements[this.currentFocus.id].period;
            panel.top = this.elements[this.currentFocus.id].name;
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            families.selected = Layout.FamiliesTable[this.currentFocus.id].key;
            panel.top = data.families[Layout.FamiliesTable[this.currentFocus.id].key].name;
        } else if (this.currentFocus.type === SelectModes.SHELL) {
            shells.selected = Layout.ShellsTable[this.currentFocus.id].key;
            panel.top = data.shells[Layout.ShellsTable[this.currentFocus.id].key].name;
        }

        var panel = {};
        if (this.currentFocus.type === SelectModes.ELEMENT) {
            panel.top = { 
                element: this.elements[this.currentFocus.id].name,
                id: this.currentFocus.id,
            };
            panel.bottom = { list: [] };
            for (const keyConfig of Layout.PanelData) {
                const value = this.elements[this.currentFocus.id][keyConfig.key];
                panel.bottom.list.push({ key: keyConfig.name, value: value });
            }
        } else if (this.currentFocus.type === SelectModes.FAMILY) {
            panel.top = { 
                family: data.families[Layout.FamiliesTable[this.currentFocus.id].key].name,
                id: Layout.FamiliesTable[this.currentFocus.id].key,
            };
            panel.bottom = { description: data.families[Layout.FamiliesTable[this.currentFocus.id].key].description };
        } else if (this.currentFocus.type === SelectModes.SHELL) {
            panel.top = { 
                shell: data.shells[Layout.ShellsTable[this.currentFocus.id].key].name,
                id: Layout.ShellsTable[this.currentFocus.id].key,
            };
            panel.bottom = { description: data.shells[Layout.ShellsTable[this.currentFocus.id].key].description };
        } else if (this.currentFocus.type === SelectModes.SEARCH) {
            panel.top = { 
                query: this.searchState.query,
            };
            panel.bottom = {
                results: this.searchState.results,
                index: this.searchState.index,
            };
        }

        return {
            elements: board,
            families: families,
            shells: shells,
            group: group,
            period: period,
            displayMode: this.currentDisplayMode,
            panel: panel,
            mode: this.currentFocus.type,
        };
    }

    _findElement(atomicNumber) {
        for (var row = 0; row < Layout.PeriodicTable.length; row++) {
            for (var column = 0; column < Layout.PeriodicTable[row].length; column++) {
                if (Layout.PeriodicTable[row][column] === atomicNumber) {
                    return { row: row, column: column };
                }
            }
        }
        return undefined;
    }

    _findFamily(familyKey) {
        for (var i = 0; i < Layout.FamiliesTable.length; i++) {
            if (Layout.FamiliesTable[i].key === familyKey) {
                return Layout.FamiliesTable[i].index;
            }
        }
        return undefined;
    }

    _findShell(shellKey) {
        for (var i = 0; i < Layout.ShellsTable.length; i++) {
            if (Layout.ShellsTable[i].key === shellKey) {
                return Layout.ShellsTable[i].index;
            }
        }
        return undefined;
    }

}

module.exports = {
    StateController: StateController,
    SelectModes: SelectModes,
    DisplayModes: DisplayModes,
    Layout: Layout,
}