const periodic_table = require('./index.js');
const { SelectModes, DisplayModes, PeriodicTable } = require('./statecontroller.js');
const data = require('./data.js');
const { Utils } = require('./utils.js');

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
    static DARK_GREEN  = { FG: '\u001b[38;5;28m',  BG: '\u001b[48;5;28m'  };
    static SKY_BLUE    = { FG: '\u001b[38;5;51m',  BG: '\u001b[48;5;51m'  };
    static BLUE        = { FG: '\u001b[38;5;27m',  BG: '\u001b[48;5;27m'  };
    static MAGENTA     = { FG: '\u001b[38;5;207m', BG: '\u001b[48;5;207m' };
    static PURPLE      = { FG: '\u001b[38;5;93m',  BG: '\u001b[48;5;93m'  };
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

    constructor() {
        this.board = this._parseBoard();
        this._initDataOnBoard();
        this._saveBoard();

    }

    _initDataOnBoard() {
        const elements = Utils.getElements(data.elements);
        for (var r = 0; r < PeriodicTable.LAYOUT.length; r++) {
            for (var c = 0; c < PeriodicTable.LAYOUT[r].length; c++) {
                if (PeriodicTable.LAYOUT[r][c] !== undefined && PeriodicTable.LAYOUT[r][c] > 0) {
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(PeriodicTable.LAYOUT[r][c])) {
                        yOffset += 2;
                    }
                    // Atomic number
                    if (PeriodicTable.LAYOUT[r][c] < 10) {
                        this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 3, yOffset + (r * this.ELEMENT_HEIGHT) + 1, elements[PeriodicTable.LAYOUT[r][c]]['atomicNumber'].toString());
                    } else {
                        this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 2, yOffset + (r * this.ELEMENT_HEIGHT) + 1, elements[PeriodicTable.LAYOUT[r][c]]['atomicNumber'].toString());
                    }
                    // Symbol
                    this._setText(xOffset + (c * this.ELEMENT_WIDTH) + 3, yOffset + (r * this.ELEMENT_HEIGHT) + 2, elements[PeriodicTable.LAYOUT[r][c]]['symbol']);
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
        this._makeBold(30, 2, 30);    // The Periodic Table of Elements
        this._makeBold(49, 34, 16);   // Element Families
        this._makeBold(46, 41, 23);   // Element Configurations
        this._makeBold(129, 34, 12);  // Display Mode
        this._makeBold(131, 39, 8);   // Controls
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
        for (var r = 0; r < PeriodicTable.LAYOUT.length; r++) {
            for (var c = 0; c < PeriodicTable.LAYOUT[r].length; c++) {
                if (PeriodicTable.LAYOUT[r][c] !== undefined && PeriodicTable.LAYOUT[r][c] > 0) {
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(config.elements[r][c].atomicNumber)) {
                        yOffset += 2;
                    }

                    const fillColor = this._getElementFillColor(config.elements[r][c], config.displayMode);
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
        for (var r = 0; r < config.elements.length; r++) {
            for (var c = 0; c < config.elements[r].length; c++) {
                if (config.elements[r][c] !== undefined && config.elements[r][c].selected !== undefined) {
                    const xOffset = this.ELEMENTS_POS.x;
                    var yOffset = this.ELEMENTS_POS.y;
                    if (Utils.isBottomSection(config.elements[r][c].atomicNumber)) {
                        yOffset += 2;
                    }
                    const fillColor = this._getElementFillColor(config.elements[r][c], config.displayMode);
                    if (config.elements[r][c].selected.type === SelectModes.ELEMENT) {
                        this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), Colors.FOCUS_GOLD, fillColor, true, config.displayMode);
                    } else if (config.elements[r][c].selected.type === SelectModes.FAMILY) {
                        const familyConfig = this.FAMILIES_CONFIG[config.families.selected];
                        this._decorateElement(xOffset + (c * this.ELEMENT_WIDTH), yOffset + (r * this.ELEMENT_HEIGHT), familyConfig.color, fillColor, true, config.displayMode);
                    } else if (config.elements[r][c].selected.type === SelectModes.SHELL) {
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
        } else if (config.displayMode === DisplayModes.SHELLS) {
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'ELECTRON CONFIGURATIONS', this.DISPLAY_CONFIG.length, 'center');
        } else if (config.displayMode === DisplayModes.STATES) {
            const sectionLength = this.DISPLAY_CONFIG.length / 3;
            this._setHighlightColor(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, sectionLength - 1, this.STATES_CONFIG['Solid'].color);
            this._setText(this.DISPLAY_CONFIG.x, this.DISPLAY_CONFIG.y, 'SOLID', sectionLength - 1, 'center');
            
            this._setHighlightColor(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, sectionLength, this.STATES_CONFIG['Liquid'].color);
            this._setText(this.DISPLAY_CONFIG.x + sectionLength, this.DISPLAY_CONFIG.y, 'LIQUID', sectionLength, 'center');

            this._setHighlightColor(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, sectionLength - 1, this.STATES_CONFIG['Gas'].color);
            this._setText(this.DISPLAY_CONFIG.x + (2 * sectionLength) + 1, this.DISPLAY_CONFIG.y, 'GAS', sectionLength - 1, 'center');
        }
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

                if (pair.value.length + 1 > this.PANEL_CONFIG.WIDTH / 2) {
                    currentY++;
                    this._setTextColor(this.PANEL_CONFIG.LIST_POS.x, currentY, this.PANEL_CONFIG.WIDTH, Colors.WHITE, false);
                    this._setText(this.PANEL_CONFIG.TOP_POS.x, currentY, ' ' + pair.value, this.PANEL_CONFIG.WIDTH, 'right');
                } else {
                    var color = Colors.WHITE;
                    if (pair.empty) {
                        color = Colors.GRAY;
                    }
                    this._setTextColor(this.PANEL_CONFIG.LIST_POS.x + (this.PANEL_CONFIG.WIDTH / 2), currentY, this.PANEL_CONFIG.WIDTH / 2, color, false);
                    this._setText(this.PANEL_CONFIG.TOP_POS.x + (this.PANEL_CONFIG.WIDTH / 2), currentY, ' ' + pair.value, this.PANEL_CONFIG.WIDTH / 2, 'left');
                }

                if (pair.value.endsWith(' **')) {
                    hasExpected = true;
                }

                currentY++;
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