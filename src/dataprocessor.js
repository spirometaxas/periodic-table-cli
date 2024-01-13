const data = require('./data.js');
const { Utils } = require('./utils.js');

class DataProcessor {

    static BOX_CHARACTERS = {
        VERTICAL:   '│',
        HORIZONTAL: '─',
        CROSS:      '┼',
    }

    static COLUMN_CONFIG = [
        { key: 'atomicNumber',          title: 'Atomic Number',          titleParts: [ '', 'Atomic', 'Number' ]           },
        { key: 'symbol',                title: 'Symbol',                 titleParts: [ '', '', 'Symbol' ]                 },
        { key: 'name',                  title: 'Name',                   titleParts: [ '', '', 'Name' ]                   },
        { key: 'family',                title: 'Family',                 titleParts: [ '', '', 'Family' ]                 },
        { key: 'standardState',         title: 'State',                  titleParts: [ '', '', 'State' ]                  },
        { key: 'atomicMass',            title: 'Atomic Mass',            titleParts: [ '', 'Atomic Mass', '(u)' ]         },
        { key: 'numberOfProtons',       title: 'Protons',                titleParts: [ '', 'Pro-', 'tons' ]               },
        { key: 'numberOfNeutrons',      title: 'Neutrons',               titleParts: [ '', 'Neut-', 'rons' ]              },
        { key: 'numberOfElectrons',     title: 'Electrons',              titleParts: [ '', 'Elect-', 'rons' ]             },
        { key: 'numberOfValence',       title: 'Valence Electrons',      titleParts: [ 'Valence', 'Elect-', 'rons' ]      },
        { key: 'valency',               title: 'Valency',                titleParts: [ '', '', 'Valency' ]                },
        { key: 'atomicRadius',          title: 'Atomic Radius',          titleParts: [ 'Atomic', 'Radius', '(pm)' ]       },
        { key: 'density',               title: 'Density',                titleParts: [ '', 'Density', '(g/cm^3)' ]        },
        { key: 'electronegativity',     title: 'Electronegativity',      titleParts: [ '', 'Electro-', 'negativity' ]     },
        { key: 'ionizationEnergy',      title: 'Ioization Energy',       titleParts: [ 'Ionization', 'Energy', '(eV)' ]   },
        { key: 'electronAffinity',      title: 'Electron Affinity',      titleParts: [ 'Electron', 'Affinity', '(eV)' ]   },
        { key: 'meltingPoint',          title: 'Melting Point',          titleParts: [ 'Melting', 'Point', '(K)' ]        },
        { key: 'boilingPoint',          title: 'Boiling Point',          titleParts: [ 'Boiling', 'Point', '(K)' ]        },
        { key: 'specificHeat',          title: 'Specific Heat',          titleParts: [ 'Specific', 'Heat', '(J/g K)' ]    },
        { key: 'radioactive',           title: 'Radioactive',            titleParts: [ '', 'Radio-', 'active' ]           },
        { key: 'occurrence',            title: 'Occurrence',             titleParts: [ '', '', 'Occurrence' ]             },
        { key: 'yearDiscovered',        title: 'Year',                   titleParts: [ '', '', 'Year' ]                   },
        { key: 'period',                title: 'Period',                 titleParts: [ '', '', 'Period' ]                 },
        { key: 'group',                 title: 'Group',                  titleParts: [ '', '', 'Group' ]                  },
        { key: 'shell',                 title: 'Shell',                  titleParts: [ '', '', 'Shell' ]                  },
        { key: 'electronConfiguration', title: 'Electron Configuration', titleParts: [ '', '', 'Electron Configuration' ] },
        { key: 'oxidationStates',       title: 'Oxidation States',       titleParts: [ '', '', 'Oxidation States' ]       },
    ];

    static _createGrid(x, y) {
        const grid = [];
        for (let i = 0; i < y; i++) {
            const row = [];
            for (let j = 0; j < x; j++) {
                row.push(' ');
            }
            grid.push(row);
        }
        return grid;
    }

    static _getTitleLength(title) {
        let size = 0;
        for (const t of title) {
            if (size < t.length) {
                size = t.length;
            }
        }
        return size;
    }

    static _getColumnDataLength(grid, c) {
        let size = 0;
        for (let i = 0; i < grid.length; i++) {
            if (size < grid[i][c].length) {
                size = grid[i][c].length;
            }
        }
        return size;
    }

    static _getStringWithPadding(text, length, alignment='left') {
        if (alignment === 'left') {
            if (text.length < length) {
                const paddingLength = length - text.length;
                return text + ' '.repeat(paddingLength);
            } else {
                return text;
            }
        } else if (alignment === 'center') {
            if (text.length < length) {
                const paddingLength = length - text.length;
                const buffer = parseInt(paddingLength / 2);
                return ' '.repeat(buffer) + text + ' '.repeat(paddingLength - buffer);
            } else {
                return text;
            }
        } else if (alignment === 'right') {
            if (text.length < length) {
                const paddingLength = length - text.length;
                return ' '.repeat(paddingLength) + text;
            } else {
                return text;
            }
        }
    }

    static _renderGrid(grid, fullColumnConfig, verbose, width) {
        const sizes = [];
        for (let i = 0; i < fullColumnConfig.length; i++) {
            const titleLength = this._getTitleLength(fullColumnConfig[i].titleParts);
            const dataLength = this._getColumnDataLength(grid, i);
            sizes.push(Math.max(titleLength, dataLength));
        }

        // Omit columns that do not fit on the screen
        let columnConfig = fullColumnConfig;
        if (width !== undefined && width > 0) {
            let currentColumn = 0;
            let currentWidth = 1 + sizes[0];
            while (currentColumn + 1 < sizes.length && currentWidth < width) {
                if (currentWidth + 3 < width) {
                    currentWidth += 3;
                } else {
                    break;
                }
                if (currentWidth + sizes[currentColumn + 1] < width) {
                    currentWidth += sizes[currentColumn + 1];
                    currentColumn++;
                } else {
                    break;
                }
            }

            columnConfig = fullColumnConfig.slice(0, currentColumn + 1);
        }

        let response = '\n';
        
        // Titles
        for (let j = 0; j < columnConfig[0].titleParts.length; j++) {
            response += ' ';  // Left buffer
            for (let i = 0; i < columnConfig.length; i++) {
                const entry = this._getStringWithPadding(columnConfig[i].titleParts[j], sizes[i], 'center');
                response += entry;
                if (i < columnConfig.length - 1) {
                    response += ' ' + this.BOX_CHARACTERS.VERTICAL + ' ';  // Column buffer
                }
            }
            response += '\n';
        }

        // Border
        for (let i = 0; i < columnConfig.length; i++) {
            response += this.BOX_CHARACTERS.HORIZONTAL.repeat(sizes[i] + 2);
            if (i < columnConfig.length - 1) {
                response += this.BOX_CHARACTERS.CROSS;
            }
        }
        response += '\n';

        // Data
        for (let i = 0; i < grid.length; i++) {
            response += ' ';
            for (let j = 0; j < columnConfig.length; j++) {
                response += this._getStringWithPadding(grid[i][j], sizes[j]);
                if (j < columnConfig.length - 1) {
                    response += ' ' + this.BOX_CHARACTERS.VERTICAL + ' ';  // Column buffer
                }
            }
            response += '\n';
        }

        if (verbose) {
            response += '\n ** Expected';
        } else {
            response += '\n Run with --verbose (-v) for more data.';
        }

        if (columnConfig.length < fullColumnConfig.length) {
            response += '\n\n ' + (fullColumnConfig.length - columnConfig.length) + ' columns omitted due to screen size constraints.  Specify an element to see full data.';
        }

        response += '\n';

        return response;
    }

    static _getColumnDisplayValues(key, element, families, shells) {
        if (key === 'family') {
            return families[element[key]].name;
        } else if (key === 'shell') {
            return shells[element[key]].name;
        } else {
            const value = element[key];
            if (value === undefined) {
                return '-';
            } else if (key === 'atomicMass') {
                return value.replace(' u', '');
            } else if (key === 'atomicRadius') {
                return value.replace(' pm', '');
            } else if (key === 'density') {
                return value.replace(' g/cm^3', '');
            } else if (key === 'ionizationEnergy' || key === 'electronAffinity') {
                return value.replace(' eV', '');
            } else if (key === 'meltingPoint' || key === 'boilingPoint') {
                return value.replace(' K', '');
            } else if (key === 'radioactive') {
                return value === true ? 'Yes' : 'No';
            }
            return String(value);
        }
    }

    static _getListDisplayValues(key, element, families, shells) {
        if (key === 'family') {
            return families[element[key]].name;
        } else if (key === 'shell') {
            return shells[element[key]].name;
        } else {
            const value = element[key];
            if (value === undefined) {
                return '-';
            } else if (key === 'radioactive') {
                return value === true ? 'Yes' : 'No';
            }
            return String(value);
        }
    }

    static _formatAllElements(verbose, width) {
        const elements = data.elements.sort((o1, o2) => {
            return o1.atomicNumber - o2.atomicNumber;
        });

        const columnConfig = verbose ? this.COLUMN_CONFIG : this.COLUMN_CONFIG.slice(0, 3);
        const grid = this._createGrid(columnConfig.length, elements.length);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            for (let j = 0; j < columnConfig.length; j++) {
                grid[i][j] = this._getColumnDisplayValues(columnConfig[j].key, element, data.families, data.shells);
            }
        }

        return this._renderGrid(grid, columnConfig, verbose, width);
    }

    static _formatSpecificElement(element) {
        let response = '\n';
        for (let item of this.COLUMN_CONFIG) {
            response += ' ' + item.title + ': ' + this._getListDisplayValues(item.key, element, data.families, data.shells) + '\n';
        }
        response += '\n';
        return response;
    }

    static formatData(config) {
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
                return this._formatSpecificElement(element);
            } else {
                return '\n Specified element not found.\n';
            }
        }

        // Element was not specified, so display the full chart
        let width = undefined;
        if (process.stdout.isTTY) {
            width = process.stdout.columns;
        }

        const verbose = config !== undefined ? config.verbose : false;
        return this._formatAllElements(verbose, width);
    }

}

module.exports = {
    DataProcessor: DataProcessor,
}