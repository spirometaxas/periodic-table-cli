const periodic_table = require('./index.js');
const { SelectModes, DisplayModes, Layout } = require('./statecontroller.js');
const data = require('./data.js');
const { Utils } = require('./utils.js');
const { SearchResultType } = require('./searchprocessor.js');

class Colors {
    static BLACK       = { FG: '\u001b[38;5;0m',   BG: '\u001b[48;5;0m'   };
    static WHITE       = { FG: '\u001b[38;5;255m', BG: '\u001b[48;5;255m' };
    static GRAY        = { FG: '\u001b[38;5;244m', BG: '\u001b[48;5;244m' };
    static LIGHT_GRAY  = { FG: '\u001b[38;5;250m', BG: '\u001b[48;5;250m' };
    static FOCUS_GOLD  = { FG: '\u001b[38;5;214m', BG: '\u001b[48;5;214m' };
    static FOCUS_BLUE  = { FG: '\u001b[38;5;33m',  BG: '\u001b[48;5;33m'  };

    static RED         = { FG: '\u001b[38;5;196m', BG: '\u001b[48;5;196m' };
    static DARK_RED    = { FG: '\u001b[38;5;88m',  BG: '\u001b[48;5;88m'  };
    static ORANGE      = { FG: '\u001b[38;5;208m', BG: '\u001b[48;5;208m' };
    static YELLOW      = { FG: '\u001b[38;5;226m', BG: '\u001b[48;5;226m' };
    static DARK_YELLOW = { FG: '\u001b[38;5;136m', BG: '\u001b[48;5;136m' };
    static GREEN       = { FG: '\u001b[38;5;40m',  BG: '\u001b[48;5;40m'  };
    static MID_GREEN   = { FG: '\u001b[38;5;34m',  BG: '\u001b[48;5;34m'  };
    static DARK_GREEN  = { FG: '\u001b[38;5;28m',  BG: '\u001b[48;5;28m'  };
    static SKY_BLUE    = { FG: '\u001b[38;5;51m',  BG: '\u001b[48;5;51m'  };
    static BLUE        = { FG: '\u001b[38;5;27m',  BG: '\u001b[48;5;27m'  };
    static MAGENTA     = { FG: '\u001b[38;5;207m', BG: '\u001b[48;5;207m' };
    static PURPLE      = { FG: '\u001b[38;5;93m',  BG: '\u001b[48;5;93m'  };

    static METER_COLORS = [
        { FG: '\u001b[38;5;51m',  BG: '\u001b[48;5;51m'  },
        { FG: '\u001b[38;5;50m',  BG: '\u001b[48;5;50m'  },
        { FG: '\u001b[38;5;49m',  BG: '\u001b[48;5;49m'  },
        { FG: '\u001b[38;5;48m',  BG: '\u001b[48;5;48m'  },
        { FG: '\u001b[38;5;47m',  BG: '\u001b[48;5;47m'  },
        { FG: '\u001b[38;5;46m',  BG: '\u001b[48;5;46m'  },
        { FG: '\u001b[38;5;82m',  BG: '\u001b[48;5;82m'  },
        { FG: '\u001b[38;5;118m', BG: '\u001b[48;5;118m' },
        { FG: '\u001b[38;5;154m', BG: '\u001b[48;5;154m' },
        { FG: '\u001b[38;5;190m', BG: '\u001b[48;5;190m' },
        { FG: '\u001b[38;5;226m', BG: '\u001b[48;5;226m' },
        { FG: '\u001b[38;5;220m', BG: '\u001b[48;5;220m' },
        { FG: '\u001b[38;5;214m', BG: '\u001b[48;5;214m' },
        { FG: '\u001b[38;5;208m', BG: '\u001b[48;5;208m' },
        { FG: '\u001b[38;5;202m', BG: '\u001b[48;5;202m' },
        { FG: '\u001b[38;5;196m', BG: '\u001b[48;5;196m' },
    ];
}

class Dashboard {

    HORIZONTAL_RATIO = 0.5;
    VERTICAL_RATIO = 0.333;

    ELEMENTS_POS = { x: 3, y: 2 };
    ELEMENT_WIDTH = 6;
    ELEMENT_HEIGHT = 3;

    BG_COLOR = Colors.BLACK;

    DISPLAY_CONFIG = { x: 117, y: 36, length: 36 };

    CONNECTORS_POS = [
        { y: 18, x: 16 }, { y: 18, x: 17 }, { y: 18, x: 18 }, { y: 18, x: 19 }, { y: 18, x: 20 },
        { y: 19, x: 18 }, { y: 20, x: 18 }, { y: 21, x: 16 }, { y: 21, x: 17 }, { y: 21, x: 18 },
        { y: 21, x: 19 }, { y: 21, x: 20 }, { y: 22, x: 18 }, { y: 23, x: 18 }, { y: 24, x: 18 },
        { y: 24, x: 17 }, { y: 24, x: 16 }, { y: 24, x: 15 }, { y: 24, x: 14 }, { y: 24, x: 13 },
        { y: 25, x: 13 }, { y: 26, x: 13 }, { y: 27, x: 13 }, { y: 28, x: 13 }, { y: 29, x: 13 },
        { y: 26, x: 14 }, { y: 29, x: 14 },
    ];

    FAMILIES_CONFIG = {
        // Row 1
        'Alkali metal':          { x:  7, y: 36, length: 19, color: Colors.RED         },
        'Alkaline earth metal':  { x: 27, y: 36, length: 27, color: Colors.ORANGE      },
        'Transition metal':      { x: 55, y: 36, length: 23, color: Colors.YELLOW      },
        'Post-transition metal': { x: 79, y: 36, length: 28, color: Colors.DARK_YELLOW },

        // Row 2
        'Metalloid': { x:  7, y: 37, length: 19, color: Colors.GREEN      },
        'Nonmetal':  { x: 27, y: 37, length: 27, color: Colors.DARK_GREEN },
        'Halogen':   { x: 55, y: 37, length: 23, color: Colors.SKY_BLUE   },
        'Noble gas': { x: 79, y: 37, length: 28, color: Colors.BLUE       },
        
        // Row 3
        'Lanthanide': { x:  7, y: 38, length: 19, color: Colors.MAGENTA },
        'Actinide':   { x: 27, y: 38, length: 27, color: Colors.PURPLE  },
    };

    SHELLS_CONFIG = {
        's-shell': { x: 16, y: 43, length: 13, color: Colors.RED    },
        'p-shell': { x: 39, y: 43, length: 13, color: Colors.YELLOW },
        'd-shell': { x: 62, y: 43, length: 13, color: Colors.GREEN  },
        'f-shell': { x: 85, y: 43, length: 13, color: Colors.BLUE   },
    };

    STATES_CONFIG = {
        'Solid':     { color: Colors.WHITE    },
        'Solid **':  { color: Colors.GRAY     },
        'Liquid':    { color: Colors.RED      },
        'Liquid **': { color: Colors.DARK_RED },
        'Gas':       { color: Colors.SKY_BLUE },
        'Gas **':    { color: Colors.BLUE     },
    };

    VALENCE_ELECTRON_CONFIG = {
        colors: {
            1: { color: Colors.PURPLE   },
            2: { color: Colors.MAGENTA  },
            3: { color: Colors.BLUE     },
            4: { color: Colors.SKY_BLUE },
            5: { color: Colors.GREEN    },
            6: { color: Colors.YELLOW   },
            7: { color: Colors.ORANGE   },
            8: { color: Colors.RED      },
        },
        minValue: 1,
        maxValue: 8,
    };

    VALENCY_CONFIG = {
        colors: {
            0: { color: Colors.SKY_BLUE },
            1: { color: Colors.GREEN    },
            2: { color: Colors.YELLOW   },
            3: { color: Colors.ORANGE   },
            4: { color: Colors.RED      },
        },
        minValue: 0,
        maxValue: 4,
    };

    RADIOACTIVE_CONFIG = {
        true:  { color: Colors.RED   },
        false: { color: Colors.GREEN },
    };

    OCCURRENCE_CONFIG = {
        'Natural':   { color: Colors.SKY_BLUE },
        'Rare':      { color: Colors.YELLOW   },
        'Synthetic': { color: Colors.ORANGE   },
    };

    YEAR_CONFIG = {
        minValue: 1669,
        maxValue: 2010,
        colors: {
            ANCIENT: Colors.WHITE,
        },
    };

    PERIOD_POS = {
        1: { x: 1, y:  3, length: 1 },
        2: { x: 1, y:  6, length: 1 },
        3: { x: 1, y:  9, length: 1 },
        4: { x: 1, y: 12, length: 1 },
        5: { x: 1, y: 15, length: 1 },
        6: { x: 1, y: 18, length: 1 },
        7: { x: 1, y: 21, length: 1 },
    };

    GROUP_POS = {
        1:  { x:   6, y:  1, length: 1 },
        2:  { x:  12, y:  4, length: 1 },
        3:  { x:  18, y: 10, length: 1 },
        4:  { x:  24, y: 10, length: 1 },
        5:  { x:  30, y: 10, length: 1 },
        6:  { x:  36, y: 10, length: 1 },
        7:  { x:  42, y: 10, length: 1 },
        8:  { x:  48, y: 10, length: 1 },
        9:  { x:  54, y: 10, length: 1 },
        10: { x:  59, y: 10, length: 2 },
        11: { x:  65, y: 10, length: 2 },
        12: { x:  71, y: 10, length: 2 },
        13: { x:  77, y:  4, length: 2 },
        14: { x:  83, y:  4, length: 2 },
        15: { x:  89, y:  4, length: 2 },
        16: { x:  95, y:  4, length: 2 },
        17: { x: 101, y:  4, length: 2 },
        18: { x: 107, y:  1, length: 2 },
    };

    PANEL_CONFIG = {
        TOP_POS:  { x: 117, y: 3 },
        LIST_POS: { x: 117, y: 5 },
        WIDTH: 36,
        HEIGHT: 26,
    };

    TITLES = {
        THE_PERIODIC_TABLE_OF_ELEMENTS: { x:  30, y:  2, length: 30 },  // The Periodic Table of Elements
        ELEMENT_FAMILIES:               { x:  49, y: 34, length: 16 },  // Element Families
        ELEMENT_CONFIGURATIONS:         { x:  46, y: 41, length: 23 },  // Element Configurations
        DISPLAY_MODES:                  { x: 129, y: 34, length: 12 },  // Display Mode
        CONTROLS:                       { x: 131, y: 39, length:  8 },  // Controls
    };

    SEARCH_CONFIG = {
        colors: {
            RESULTS:         Colors.GREEN,
            RESULTS_FOCUSED: Colors.MID_GREEN,
            NO_RESULTS:      Colors.RED,
        },
    };

    constructor() {
        this.board = this._parseBoard();
        this._initDataOnBoard();
        this._saveBoard();

    }

    _initDataOnBoard() {
        const elements = Utils.getElements(data.elements);
        for (var r = 0; r < Layout.PeriodicTable.length; r++) {
            for (var c = 0; c < Layout.PeriodicTable[r].length; c++) {
                if (Layout.PeriodicTable[r][c] !== undefined && Layout.PeriodicTable[r][c] > 0) {
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(Layout.PeriodicTable[r][c])) {
                        yOffset += 2;
                    }
                    // Atomic number
                    if (Layout.PeriodicTable[r][c] < 10) {
                        this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 3, yOffset + (r * this.ELEMENT_HEIGHT) + 1, elements[Layout.PeriodicTable[r][c]]['atomicNumber'].toString());
                    } else {
                        this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 2, yOffset + (r * this.ELEMENT_HEIGHT) + 1, elements[Layout.PeriodicTable[r][c]]['atomicNumber'].toString());
                    }
                    // Symbol
                    this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 3, yOffset + (r * this.ELEMENT_HEIGHT) + 2, elements[Layout.PeriodicTable[r][c]]['symbol']);
                }
            }
        }

        for (const family in this.FAMILIES_CONFIG) {
            const familyConfig = this.FAMILIES_CONFIG[family];
            this._setText(familyConfig.x + 3, familyConfig.y, data.families[family].name, familyConfig.length - 3, 'left');
        }

        for (const shell in this.SHELLS_CONFIG) {
            const shellConfig = this.SHELLS_CONFIG[shell];
            this._setText(shellConfig.x + 3, shellConfig.y, data.shells[shell].name, shellConfig.length - 3, 'left');
        }
    }

    getNumberOfLines() {
        return this.board.length;
    }

    _parseBoard() {
        const parts = periodic_table.dashboard.split('\n');
        const board = [];
        for (const part of parts) {
            const row = [];
            for (var i = 0; i < part.length; i++) {
                row.push({ character: part.charAt(i) });
            }
            board.push(row);
        }
        return board;
    }

    _saveBoard() {
        for (var r = 0; r < this.board.length; r++) {
            for (var c = 0; c < this.board[r].length; c++) {
                this.board[r][c].initCharacter = this.board[r][c].character;
            }
        }
    }

    _resetBoard() {
        for (var r = 0; r < this.board.length; r++) {
            for (var c = 0; c < this.board[r].length; c++) {
                this.board[r][c].character = this.board[r][c].initCharacter;
                this.board[r][c].config = {};
            }
        }
    }

    _setBackground() {
        for (var r = 0; r < this.board.length; r++) {
            for (var c = 0; c < this.board[r].length; c++) {
                this.board[r][c].config.backgroundColor = this.BG_COLOR.BG;
                this.board[r][c].config.foregroundColor = Colors.WHITE.FG;
            }
        }
    }

    _makeBold(x, y, length) {
        for (var c = 0; c < length; c++) {
            this.board[y][x + c].config.bold = true;
        }
    }

    _setTextColor(x, y, length, color, bold) {
        for (var c = 0; c < length; c++) {
            this.board[y][x + c].config.foregroundColor = color.FG;
            this.board[y][x + c].config.bold = bold;
        }
    }

    _setHighlightColor(x, y, length, color) {
        for (var c = 0; c < length; c++) {
            this.board[y][x + c].config.backgroundColor = color.BG;
            this.board[y][x + c].config.foregroundColor = Colors.BLACK.FG;
        }
    }

    _setText(x, y, text, maxLength=undefined, type=undefined) {
        var offset = 0;
        if (maxLength !== undefined && type !== undefined) {
            if (type === 'center') {
                offset = Math.max(parseInt((maxLength - text.length) / 2), 0);
            } else if (type === 'right') {
                offset = Math.max(maxLength - text.length, 0);
            }
        }
        for (var i = 0; i < text.length; i++) {
            this.board[y][x + offset + i].character = '' + text[i];
        }
    }

    _decorateTitles() {
        for (const title in this.TITLES) {
            this._makeBold(this.TITLES[title].x, this.TITLES[title].y, this.TITLES[title].length);
        }
    }

    _getElementFillColor(element, displayMode) {
        if (displayMode === DisplayModes.STANDARD) {
            return undefined;
        } else if (displayMode === DisplayModes.FAMILIES) {
            return this.FAMILIES_CONFIG[element.display.family].color;
        } else if (displayMode === DisplayModes.SHELLS) {
            return this.SHELLS_CONFIG[element.display.shell].color;
        } else if (displayMode === DisplayModes.STATES) {
            return this.STATES_CONFIG[element.display.state].color;
        } else if (displayMode === DisplayModes.VALENCE_ELECTRONS) {
            const config = this.VALENCE_ELECTRON_CONFIG.colors[element.display.valenceElectrons];
            return config ? config.color : undefined;
        } else if (displayMode === DisplayModes.VALENCY) {
            const config = this.VALENCY_CONFIG.colors[element.display.valency];
            return config ? config.color : undefined;
        } else if (displayMode === DisplayModes.RADIOACTIVE) {
            const config = this.RADIOACTIVE_CONFIG[element.display.radioactive];
            return config ? config.color : undefined;
        } else if (displayMode === DisplayModes.OCCURRENCE) {
            const config = this.OCCURRENCE_CONFIG[element.display.occurrence];
            return config ? config.color : undefined;
        } else if (element.display.meter !== undefined) {
            const colorIndex = Utils.getBucketValue(element.display.meter, Colors.METER_COLORS.length);
            return Colors.METER_COLORS[colorIndex];
        } else if (element.display.isAncient) {
            return this.YEAR_CONFIG.colors.ANCIENT;
        }
    }

    _decorateElement(x, y, color, fillColor, focused, displayMode) {
        // Lines
        this.board[y][x].config.foregroundColor = color.FG;
        this.board[y + 1][x].config.foregroundColor = color.FG;
        this.board[y + 2][x].config.foregroundColor = color.FG;
        this.board[y + 3][x].config.foregroundColor = color.FG;

        this.board[y][x + 1].config.foregroundColor = color.FG;
        this.board[y][x + 2].config.foregroundColor = color.FG;
        this.board[y][x + 3].config.foregroundColor = color.FG;
        this.board[y][x + 4].config.foregroundColor = color.FG;
        this.board[y][x + 5].config.foregroundColor = color.FG;
        this.board[y][x + 6].config.foregroundColor = color.FG;

        this.board[y + 1][x + 6].config.foregroundColor = color.FG;
        this.board[y + 2][x + 6].config.foregroundColor = color.FG;
        this.board[y + 3][x + 6].config.foregroundColor = color.FG;

        this.board[y + 3][x + 1].config.foregroundColor = color.FG;
        this.board[y + 3][x + 2].config.foregroundColor = color.FG;
        this.board[y + 3][x + 3].config.foregroundColor = color.FG;
        this.board[y + 3][x + 4].config.foregroundColor = color.FG;
        this.board[y + 3][x + 5].config.foregroundColor = color.FG;

        // Text
        if (focused) {
            // Atomic number
            this.board[y + 1][x + 2].config.foregroundColor = color.FG;
            this.board[y + 1][x + 3].config.foregroundColor = color.FG;
            this.board[y + 1][x + 4].config.foregroundColor = color.FG;

            this.board[y + 1][x + 2].config.bold = true;
            this.board[y + 1][x + 3].config.bold = true;
            this.board[y + 1][x + 4].config.bold = true;

            // Element
            var elementColor = Colors.WHITE;
            if (displayMode !== DisplayModes.STANDARD && fillColor !== undefined) {
                elementColor = Colors.BLACK;
            }
            this.board[y + 2][x + 2].config.foregroundColor = elementColor.FG;
            this.board[y + 2][x + 3].config.foregroundColor = elementColor.FG;
            this.board[y + 2][x + 4].config.foregroundColor = elementColor.FG;

            this.board[y + 2][x + 2].config.bold = true;
            this.board[y + 2][x + 3].config.bold = true;
            this.board[y + 2][x + 4].config.bold = true;
        } else {
            if (displayMode !== DisplayModes.STANDARD && fillColor !== undefined) {
                // Atomic number
                this.board[y + 1][x + 2].config.foregroundColor = Colors.BLACK.FG;
                this.board[y + 1][x + 3].config.foregroundColor = Colors.BLACK.FG;
                this.board[y + 1][x + 4].config.foregroundColor = Colors.BLACK.FG;

                // Element
                this.board[y + 2][x + 2].config.foregroundColor = Colors.BLACK.FG;
                this.board[y + 2][x + 3].config.foregroundColor = Colors.BLACK.FG;
                this.board[y + 2][x + 4].config.foregroundColor = Colors.BLACK.FG;
            } else {
                // Atomic number
                this.board[y + 1][x + 2].config.foregroundColor = Colors.GRAY.FG;
                this.board[y + 1][x + 3].config.foregroundColor = Colors.GRAY.FG;
                this.board[y + 1][x + 4].config.foregroundColor = Colors.GRAY.FG;

                // Element
                this.board[y + 2][x + 2].config.foregroundColor = Colors.WHITE.FG;
                this.board[y + 2][x + 3].config.foregroundColor = Colors.WHITE.FG;
                this.board[y + 2][x + 4].config.foregroundColor = Colors.WHITE.FG;
            }
        }

        // Fill color
        var topColor = this.BG_COLOR;
        if (fillColor !== undefined && !focused) {
            topColor = fillColor;
        }
        this.board[y + 1][x + 1].config.backgroundColor = topColor.BG;
        this.board[y + 1][x + 2].config.backgroundColor = topColor.BG;
        this.board[y + 1][x + 3].config.backgroundColor = topColor.BG;
        this.board[y + 1][x + 4].config.backgroundColor = topColor.BG;
        this.board[y + 1][x + 5].config.backgroundColor = topColor.BG;

        if (fillColor !== undefined) {
            this.board[y + 2][x + 1].config.backgroundColor = fillColor.BG;
            this.board[y + 2][x + 2].config.backgroundColor = fillColor.BG;
            this.board[y + 2][x + 3].config.backgroundColor = fillColor.BG;
            this.board[y + 2][x + 4].config.backgroundColor = fillColor.BG;
            this.board[y + 2][x + 5].config.backgroundColor = fillColor.BG;
        }
    }

    _applyConfigToElements(config) {
        // Lines
        for (var point of this.CONNECTORS_POS) {
            this.board[point.y][point.x].config.foregroundColor = Colors.GRAY.FG;
        }

        // Draw unselected
        for (var r = 0; r < Layout.PeriodicTable.length; r++) {
            for (var c = 0; c < Layout.PeriodicTable[r].length; c++) {
                if (Layout.PeriodicTable[r][c] !== undefined && Layout.PeriodicTable[r][c] > 0) {
                    const elementConfig = config.elements[Layout.PeriodicTable[r][c]];
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(elementConfig.atomicNumber)) {
                        yOffset += 2;
                    }

                    const fillColor = this._getElementFillColor(elementConfig, config.displayMode);
                    var focusColor = Colors.WHITE;

                    if (config.shells.selected === undefined && config.families.selected === undefined && config.displayMode === DisplayModes.STANDARD) {
                        focusColor = Colors.FOCUS_BLUE;
                    }

                    this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), focusColor, fillColor, false, config.displayMode);
                }
            }
        }

        for (const family in this.FAMILIES_CONFIG) {
            const familyConfig = this.FAMILIES_CONFIG[family];
            this._setTextColor(familyConfig.x, familyConfig.y, familyConfig.length, Colors.GRAY, false);
        }

        for (const shell in this.SHELLS_CONFIG) {
            const shellConfig = this.SHELLS_CONFIG[shell];
            this._setTextColor(shellConfig.x, shellConfig.y, shellConfig.length, Colors.GRAY, false);
        }

        // Draw selected
        for (var r = 0; r < Layout.PeriodicTable.length; r++) {
            for (var c = 0; c < Layout.PeriodicTable[r].length; c++) {
                if (Layout.PeriodicTable[r][c] > 0 && config.elements[Layout.PeriodicTable[r][c]] !== undefined && config.elements[Layout.PeriodicTable[r][c]].selected !== undefined) {
                    const elementConfig = config.elements[Layout.PeriodicTable[r][c]];
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(elementConfig.atomicNumber)) {
                        yOffset += 2;
                    }
                    const fillColor = this._getElementFillColor(elementConfig, config.displayMode);
                    if (elementConfig.selected.type === SelectModes.ELEMENT) {
                        this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), Colors.FOCUS_GOLD, fillColor, true, config.displayMode);
                    } else if (elementConfig.selected.type === SelectModes.FAMILY) {
                        const familyConfig = this.FAMILIES_CONFIG[config.families.selected];
                        this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), familyConfig.color, fillColor, true, config.displayMode);
                    } else if (elementConfig.selected.type === SelectModes.SHELL) {
                        const shellConfig = this.SHELLS_CONFIG[config.shells.selected];
                        this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), shellConfig.color, fillColor, true, config.displayMode);
                    }
                }
            }
        }

        if (config && config.families) {
            if (config.families.indicated && this.FAMILIES_CONFIG[config.families.indicated]) {
                const familyConfig = this.FAMILIES_CONFIG[config.families.indicated];
                this._setTextColor(familyConfig.x, familyConfig.y, familyConfig.length, Colors.FOCUS_GOLD, true);
            } else if (config.families.selected && this.FAMILIES_CONFIG[config.families.selected]) {
                const familyConfig = this.FAMILIES_CONFIG[config.families.selected];
                this._setHighlightColor(familyConfig.x, familyConfig.y, familyConfig.length, familyConfig.color);
            }
        }

        if (config.displayMode === DisplayModes.FAMILIES) {
            for (const familyName in this.FAMILIES_CONFIG) {
                const familyConfig = this.FAMILIES_CONFIG[familyName];
                this._setHighlightColor(familyConfig.x, familyConfig.y, 2, familyConfig.color);
            }
        }

        if (config && config.shells) {
            if (config.shells.indicated && this.SHELLS_CONFIG[config.shells.indicated]) {
                const shellConfig = this.SHELLS_CONFIG[config.shells.indicated];
                this._setTextColor(shellConfig.x, shellConfig.y, shellConfig.length, Colors.FOCUS_GOLD, true);
            } else if (config.shells.selected && this.SHELLS_CONFIG[config.shells.selected]) {
                const shellConfig = this.SHELLS_CONFIG[config.shells.selected];
                this._setHighlightColor(shellConfig.x, shellConfig.y, shellConfig.length, shellConfig.color);
            }
        }

        if (config.displayMode === DisplayModes.SHELLS) {
            for (const shellName in this.SHELLS_CONFIG) {
                const shellsConfig = this.SHELLS_CONFIG[shellName];
                this._setHighlightColor(shellsConfig.x, shellsConfig.y, 2, shellsConfig.color);
            }
        }

        if (config && config.period && this.PERIOD_POS[config.period]) {
            const periodConfig = this.PERIOD_POS[config.period];
            this._setTextColor(periodConfig.x, periodConfig.y, periodConfig.length, Colors.FOCUS_GOLD, false);
        }

        if (config && config.group && this.GROUP_POS[config.group]) {
            const groupConfig = this.GROUP_POS[config.group];
            this._setTextColor(groupConfig.x, groupConfig.y, groupConfig.length, Colors.FOCUS_GOLD, false);
        }
    }

    _setDisplayMode(config) {
        if (config.displayMode === DisplayModes.STANDARD) {
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'STANDARD', this.DISPLAY_CONFIG.length, 'center');
        } else if (config.displayMode === DisplayModes.FAMILIES) {
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'ELEMENT FAMILIES', this.DISPLAY_CONFIG.length, 'center');
            this._setHighlightColor(this.TITLES.ELEMENT_FAMILIES.x - 2, this.TITLES.ELEMENT_FAMILIES.y, this.TITLES.ELEMENT_FAMILIES.length + 4, Colors.WHITE);
        } else if (config.displayMode === DisplayModes.SHELLS) {
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'ELECTRON CONFIGURATIONS', this.DISPLAY_CONFIG.length, 'center');
            this._setHighlightColor(this.TITLES.ELEMENT_CONFIGURATIONS.x - 2, this.TITLES.ELEMENT_CONFIGURATIONS.y, this.TITLES.ELEMENT_CONFIGURATIONS.length + 4, Colors.WHITE);
        } else if (config.displayMode === DisplayModes.STATES) {
            const sectionLength = this.DISPLAY_CONFIG.length / 3;
            this._setHighlightColor(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, sectionLength - 1, this.STATES_CONFIG['Solid'].color);
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'SOLID', sectionLength - 1, 'center');
            
            this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, sectionLength, this.STATES_CONFIG['Liquid'].color);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, 'LIQUID', sectionLength, 'center');

            this._setHighlightColor(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, sectionLength - 1, this.STATES_CONFIG['Gas'].color);
            this._setText(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, 'GAS', sectionLength - 1, 'center');
        } else if (config.displayMode === DisplayModes.VALENCE_ELECTRONS) {
            const sectionLength = this.DISPLAY_CONFIG.length / 2;
            const partLength = 2;
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'VALENCE ELECTRONS', sectionLength, 'center');
            var count = 0;
            for (let i = this.VALENCE_ELECTRON_CONFIG.minValue; i <= this.VALENCE_ELECTRON_CONFIG.maxValue; i++) {
                this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength + (count * partLength) + 2, this.DISPLAY_CONFIG.y, partLength, this.VALENCE_ELECTRON_CONFIG.colors[i].color);
                this._setText(this.DISPLAY_CONFIG.x + sectionLength + (count * partLength) + 2, this.DISPLAY_CONFIG.y, ' ' + i, partLength, 'left');
                count++;
            }
        } else if (config.displayMode === DisplayModes.VALENCY) {
            const sectionLength = this.DISPLAY_CONFIG.length / 2;
            const partLength = 3;
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'VALENCY', sectionLength, 'center');
            var count = 0;
            for (let i = this.VALENCY_CONFIG.minValue; i <= this.VALENCY_CONFIG.maxValue; i++) {
                this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength + (count * partLength) + 3, this.DISPLAY_CONFIG.y, partLength, this.VALENCY_CONFIG.colors[i].color);
                this._setText(this.DISPLAY_CONFIG.x + sectionLength + (count * partLength) + 3, this.DISPLAY_CONFIG.y, String(i), partLength, 'center');
                count++;
            }
        } else if (config.displayMode === DisplayModes.RADIOACTIVE) {
            const sectionLength = this.DISPLAY_CONFIG.length / 2;
            this._setHighlightColor(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, sectionLength - 1, this.RADIOACTIVE_CONFIG[true].color);
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'RADIOACTIVE', sectionLength - 1, 'center');
            
            this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, sectionLength, this.RADIOACTIVE_CONFIG[false].color);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, 'STABLE', sectionLength, 'center');
        } else if (config.displayMode === DisplayModes.OCCURRENCE) {
            const sectionLength = this.DISPLAY_CONFIG.length / 3;
            this._setHighlightColor(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, sectionLength - 1, this.OCCURRENCE_CONFIG['Natural'].color);
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'NATURAL', sectionLength - 1, 'center');
            
            this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, sectionLength, this.OCCURRENCE_CONFIG['Rare'].color);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, 'RARE', sectionLength, 'center');

            this._setHighlightColor(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, sectionLength - 1, this.OCCURRENCE_CONFIG['Synthetic'].color);
            this._setText(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, 'SYNTHETIC', sectionLength - 1, 'center');
        } else if (config.displayMode === DisplayModes.YEAR) {
            const sectionLength = this.DISPLAY_CONFIG.length / 2;
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'YEAR', sectionLength - 9, 'center');

            this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength - 8, this.DISPLAY_CONFIG.y, 9, this.YEAR_CONFIG.colors.ANCIENT);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength - 8, this.DISPLAY_CONFIG.y, 'ANCIENT', 9, 'center');

            for (let i = 0; i < Colors.METER_COLORS.length; i++) {
                this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength + i + 2, this.DISPLAY_CONFIG.y, 1, Colors.METER_COLORS[i]);
            }
            this._setTextColor(this.DISPLAY_CONFIG.x + sectionLength + 3, this.DISPLAY_CONFIG.y, 4, Colors.BLACK, false);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength + 3, this.DISPLAY_CONFIG.y, String(this.YEAR_CONFIG.minValue), 4, 'left');

            this._setTextColor(this.DISPLAY_CONFIG.x + (2 * sectionLength) - 5, this.DISPLAY_CONFIG.y, 4, Colors.BLACK, false);
            this._setText(this.DISPLAY_CONFIG.x + (2 * sectionLength) - 5, this.DISPLAY_CONFIG.y, String(this.YEAR_CONFIG.maxValue), 4, 'left');
        } else if (config.displayMode && config.displayMode.isMeter) {
            const sectionLength = this.DISPLAY_CONFIG.length / 2;
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, this._getFieldName(config.displayMode.key).toUpperCase(), sectionLength, 'center');
            for (let i = 0; i < Colors.METER_COLORS.length; i++) {
                this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength + i + 2, this.DISPLAY_CONFIG.y, 1, Colors.METER_COLORS[i]);
            }
            this._setTextColor(this.DISPLAY_CONFIG.x + sectionLength + 3, this.DISPLAY_CONFIG.y, 3, Colors.BLACK, false);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength + 3, this.DISPLAY_CONFIG.y, 'MIN', 3, 'left');

            this._setTextColor(this.DISPLAY_CONFIG.x + (2 * sectionLength) - 4, this.DISPLAY_CONFIG.y, 3, Colors.BLACK, false);
            this._setText(this.DISPLAY_CONFIG.x + (2 * sectionLength) - 4, this.DISPLAY_CONFIG.y, 'MAX', 3, 'left');
        }
    }

    _getFieldName(key) {
        for (const data of Layout.PanelData)  {
            if (data.key === key) {
                return data.name;
            }
        }
        return undefined;
    }

    _getFieldIndex(key) {
        for (let i = 0; i < Layout.PanelData.length; i++)  {
            if (Layout.PanelData[i].key === key) {
                return i;
            }
        }
        return undefined;
    }

    _getLinesFromDescription(text) {
        const parts = text.split(' ');
        const lines = [];
        var line = '';
        for (const part of parts) {
            if (line.length + part.length <= this.PANEL_CONFIG.WIDTH) {
                line += part;
            } else {
                lines.push(line);
                line = new String(part);
            }
            if (line.length < this.PANEL_CONFIG.WIDTH) {
                line += ' ';
            }
        }
        lines.push(line);
        return lines;
    }

    _populatePanel(config) {
        if (config.mode === SelectModes.SEARCH) {
            this._populateSearchPanel(config);
        } else {
            this._populateDataPanel(config);
        }
    }

    _populateDataPanel(config) {
        // Top
        if (config.panel && config.panel.top) {
            if (config.panel.top.element) {
                this._setTextColor(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, this.PANEL_CONFIG.WIDTH, Colors.FOCUS_GOLD, true);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, config.panel.top.element, this.PANEL_CONFIG.WIDTH, 'center');
            } else if (config.panel.top.family) {
                const color = this.FAMILIES_CONFIG[config.panel.top.id].color;
                this._setTextColor(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, this.PANEL_CONFIG.WIDTH, color, true);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, config.panel.top.family, this.PANEL_CONFIG.WIDTH, 'center');
            } else if (config.panel.top.shell) {
                const color = this.SHELLS_CONFIG[config.panel.top.id].color;
                this._setTextColor(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, this.PANEL_CONFIG.WIDTH, color, true);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, config.panel.top.shell, this.PANEL_CONFIG.WIDTH, 'center');
            }
        }

        // List
        if (config.panel.bottom && config.panel.bottom.list) {
            var currentY = this.PANEL_CONFIG.LIST_POS.y;
            var hasExpected = false;
            for (const pair of config.panel.bottom.list) {
                this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, currentY, this.PANEL_CONFIG.WIDTH / 2, Colors.GRAY, false);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, currentY, pair.key + ':', this.PANEL_CONFIG.WIDTH / 2, 'right');

                const value = this._getPanelValue(pair.value);
                if (value.length + 1 > this.PANEL_CONFIG.WIDTH / 2) {
                    currentY++;
                    this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, currentY, this.PANEL_CONFIG.WIDTH, Colors.WHITE, false);
                    this._setText(this.PANEL_CONFIG.TOP_POS.x, currentY, ' ' + value, this.PANEL_CONFIG.WIDTH, 'right');
                } else {
                    var color = Colors.WHITE;
                    if (pair.value === undefined) {
                        color = Colors.GRAY;
                    }

                    this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + (this.PANEL_CONFIG.WIDTH / 2), currentY, this.PANEL_CONFIG.WIDTH / 2, color, false);
                    this._setText(this.PANEL_CONFIG.TOP_POS.x + (this.PANEL_CONFIG.WIDTH / 2), currentY, ' ' + this._getPanelValue(pair.value), this.PANEL_CONFIG.WIDTH / 2, 'left');

                    if (value !== undefined && value.endsWith(' **')) {
                        hasExpected = true;
                    }
                }

                currentY++;
            }

            if (config.displayMode && config.displayMode.key) {
                const fieldIndex = this._getFieldIndex(config.displayMode.key);
                this._setHighlightColor(this.PANEL_CONFIG.LIST_POS.x - 1, this.PANEL_CONFIG.LIST_POS.y + fieldIndex, this.PANEL_CONFIG.WIDTH + 2, Colors.WHITE);
            }

            if (hasExpected) {
                this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 1, this.PANEL_CONFIG.WIDTH, Colors.GRAY, false);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 1, '** Expected', this.PANEL_CONFIG.WIDTH, 'right');
            }
        } else if (config.panel.bottom && config.panel.bottom.description) {
            const lines = this._getLinesFromDescription(config.panel.bottom.description);
            var currentY = this.PANEL_CONFIG.LIST_POS.y;
            for (const line of lines) {
                this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, currentY, this.PANEL_CONFIG.WIDTH, Colors.LIGHT_GRAY, false);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, currentY, line, this.PANEL_CONFIG.WIDTH, 'left');
                currentY++;
            }
        }
    }

    _populateSearchPanel(config) {
        const hasResults = config.panel.bottom && config.panel.bottom.results && config.panel.bottom.results.length > 0;
        // Top
        if (config.panel && config.panel.top) {
            if (config.panel.top.query) {
                const color = hasResults ? this.SEARCH_CONFIG.colors.RESULTS : this.SEARCH_CONFIG.colors.NO_RESULTS;
                this._setTextColor(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, this.PANEL_CONFIG.WIDTH, color, true);
                this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.TOP_POS.y, config.panel.top.query, this.PANEL_CONFIG.WIDTH, 'center');
            }
        }

        // Bottom
        if (hasResults) {
            const highlightLength = config.panel.top.query ? config.panel.top.query.length : 0;
            const nameOffset = 5;

            if (config.panel.bottom.index !== undefined) {
                this._setHighlightColor(this.PANEL_CONFIG.LIST_POS.x - 1, this.PANEL_CONFIG.LIST_POS.y + config.panel.bottom.index, this.PANEL_CONFIG.WIDTH + 2, Colors.WHITE);
            }

            for (let i = 0; i < config.panel.bottom.results.length; i++) {
                const item = config.panel.bottom.results[i];
                const isSelected = config.panel.bottom.index === i;
                const selectedColor = isSelected ? this.SEARCH_CONFIG.colors.RESULTS_FOCUSED : this.SEARCH_CONFIG.colors.RESULTS;

                if (item.type === SearchResultType.ELEMENT) {
                    if (item.atomicNumber !== undefined) {
                        this._setText(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + i, item.atomicNumber.text, 3, 'left');
                        if (item.atomicNumber.index !== undefined) {
                            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + item.atomicNumber.index, this.PANEL_CONFIG.LIST_POS.y + i, highlightLength, selectedColor, false);
                        }
                    } else if (item.atomicSymbol !== undefined) {
                        this._setText(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + i, item.atomicSymbol.text, 2, 'left');
                        if (item.atomicSymbol.index !== undefined) {
                            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + item.atomicSymbol.index, this.PANEL_CONFIG.LIST_POS.y + i, highlightLength, selectedColor, false);
                        }
                    }
                    if (item.name) {
                        this._setText(this.PANEL_CONFIG.LIST_POS.x + nameOffset, this.PANEL_CONFIG.LIST_POS.y + i, item.name.text, this.PANEL_CONFIG.WIDTH - nameOffset, 'left');
                        if (item.name.index !== undefined) {
                            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + item.name.index + nameOffset, this.PANEL_CONFIG.LIST_POS.y + i, highlightLength, selectedColor, false);
                        }
                    }
                } else {
                    if (item.name) {
                        this._setText(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + i, item.name.text, this.PANEL_CONFIG.WIDTH, 'left');
                        if (item.name.index !== undefined) {
                            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + item.name.index, this.PANEL_CONFIG.LIST_POS.y + i, highlightLength, selectedColor, false);
                        }
                    }
                }
            }

            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 2, this.PANEL_CONFIG.WIDTH, Colors.GRAY, false);
            this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 2, 'Navigation:<UP|DOWN>  Select:<ENTER>', this.PANEL_CONFIG.WIDTH, 'center');
        } else {
            this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y, this.PANEL_CONFIG.WIDTH, Colors.GRAY, false);
            this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.LIST_POS.y, 'NO RESULTS', this.PANEL_CONFIG.WIDTH, 'center');
        }

        this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 1, this.PANEL_CONFIG.WIDTH, Colors.GRAY, false);
        this._setText(this.PANEL_CONFIG.TOP_POS.x, this.PANEL_CONFIG.LIST_POS.y + this.PANEL_CONFIG.HEIGHT - 1, 'Exit Search:<LEFT>', this.PANEL_CONFIG.WIDTH, 'center');
    }

    _getPanelValue(value) {
        if (value !== undefined) {
            if (value === true) {
                return 'Yes';
            } else if (value === false) {
                return 'No';
            }
            return String(value);
        } else {
            return '-';
        }
    }

    _getFullScreenBoard() {
        const fullRows = process.stdout.rows;
        const fullColumns = process.stdout.columns;
        const fullBoard = [];
        for (var r = 0; r < fullRows; r++) {
            const row = [];
            for (var c = 0; c < fullColumns; c++) {
                row.push({ 
                    character: ' ',
                    config: { 
                        backgroundColor: this.BG_COLOR.BG,
                    },
                });
            }
            fullBoard.push(row);
        }

        const rowsToDraw = Math.min(fullRows, this.board.length);
        const columnsToDraw = Math.min(fullColumns, this.board[0].length);

        for (var r = 0; r < rowsToDraw; r++) {
            for (var c = 0; c < columnsToDraw; c++) {
                var cOffset = 0;
                if (fullColumns > this.board[r].length) {
                    cOffset = parseInt((fullColumns - this.board[r].length) * this.HORIZONTAL_RATIO);
                }

                var rOffset = 0;
                if (fullRows > this.board.length) {
                    rOffset = parseInt((fullRows - this.board.length) * this.VERTICAL_RATIO);
                }

                fullBoard[rOffset + r][cOffset + c] = this.board[r][c];
            }
        }

        return fullBoard;
    }

    _draw() {
        const fullBoard = this._getFullScreenBoard();
        var response = '';
        for (var r = 0; r < fullBoard.length; r++) {
            for (var c = 0; c < fullBoard[r].length; c++) {
                var block = '';
                var hasFormat = false;
                if (fullBoard[r][c].config.backgroundColor) {
                    block += fullBoard[r][c].config.backgroundColor;
                    hasFormat = true;
                }
                if (fullBoard[r][c].config.foregroundColor && fullBoard[r][c].character !== ' ') {
                    block += fullBoard[r][c].config.foregroundColor;
                    hasFormat = true;
                }
                if (fullBoard[r][c].config.bold && fullBoard[r][c].character !== ' ') {
                    block += '\u001b[1m';
                    hasFormat = true;
                }
                block += fullBoard[r][c].character;
                if (hasFormat) {
                    block += '\u001b[0m';  // End format
                }
                response += block;
            }
            if (r < fullBoard.length - 1) {
                response += '\n';
            }
        }
        return response;
    }

    render(config) {
        this._resetBoard();
        this._setBackground();
        this._decorateTitles();
        this._setDisplayMode(config);
        this._applyConfigToElements(config);
        this._populatePanel(config);
        return this._draw();
    }

}

module.exports = {
    Dashboard: Dashboard,
}