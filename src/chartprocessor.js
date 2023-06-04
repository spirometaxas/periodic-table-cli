const data = require('./data.js');
const { Utils } = require('./utils.js');
const periodic_table = require('./index.js');
const { Layout } = require('./statecontroller.js');

class ChartProcessor {

    static HIGHLIGHT = '\u001b[7m';
    static OFF = '\u001b[0m';

    static DIMENSIONS = {
        SMALL: {
            START: {
                x: 4, y: 3,
            },
            VERTICAL_OFFSET: 3,
            HORIZONTAL_OFFSET: 4,
            WIDTH: 3,
        },
        STANDARD: {
            START: {
                x: 4, y: 3,
            },
            VERTICAL_OFFSET: 3,
            HORIZONTAL_OFFSET: 6,
            WIDTH: 5,
        },
    };

    static _formatSpecificElement(element, small) {
        const chart = small ? periodic_table.table_small : periodic_table.table;
        const dim = small ? this.DIMENSIONS.SMALL : this.DIMENSIONS.STANDARD;
        const lines = chart.split('\n');
        const pos = this._findElement(element.atomicNumber);

        let y = dim.START.y + (pos.row * dim.VERTICAL_OFFSET);
        const x = dim.START.x + (pos.column * dim.HORIZONTAL_OFFSET);

        if (Utils.isBottomSection(element.atomicNumber)) {
            y += 2;
        }

        lines[y] = lines[y].slice(0, x) + this.HIGHLIGHT + lines[y].slice(x, x + dim.WIDTH) + this.OFF + lines[y].slice(x + dim.WIDTH, lines[y].length);
        lines[y + 1] = lines[y + 1].slice(0, x) + this.HIGHLIGHT + lines[y + 1].slice(x, x + dim.WIDTH) + this.OFF + lines[y + 1].slice(x + dim.WIDTH, lines[y + 1].length);

        return lines.join('\n');
    }

    static _findElement(atomicNumber) {
        for (var row = 0; row < Layout.PeriodicTable.length; row++) {
            for (var column = 0; column < Layout.PeriodicTable[row].length; column++) {
                if (Layout.PeriodicTable[row][column] === atomicNumber) {
                    return { row: row, column: column };
                }
            }
        }
        return undefined;
    }

    static formatChart(config) {
        const small = config !== undefined ? config.small : false;
        let element = undefined;
        if (config.atomicNumber !== undefined || config.symbol !== undefined || config.name !== undefined) {
            if (config && Utils.isValidAtomicNumber(config.atomicNumber)) {
                element = Utils.getElementByAtomicNumber(config.atomicNumber, data.elements);
            } else if (config && Utils.isValidElementSymbol(config.symbol, data.elements)) {
                element = Utils.getElementBySymbol(config.symbol, data.elements);
            } else if (config && Utils.isValidElementName(config.name, data.elements)) {
                element = Utils.getElementByName(config.name, data.elements);
            }

            if (element !== undefined) {
                return this._formatSpecificElement(element, small);
            } else {
                return '\n Specified element not found.\n';
            }
        }

        // If no element was specified, display the regular chart
        return small ? periodic_table.table_small : periodic_table.table;
    }

}

module.exports = {
    ChartProcessor: ChartProcessor,
}
