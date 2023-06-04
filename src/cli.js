#!/usr/bin/env node
const { App } = require('./app.js');
const { DataProcessor } = require('./dataprocessor.js');
const { ChartProcessor } = require('./chartprocessor.js');

const MODES = {
    APP:   'APP',
    DATA:  'DATA',
    CHART: 'CHART',
};

const printUsage = function() {
    console.log('\n' + 
                '           ╔═╗                               ╔═╗ \n' +
                '           ╠═╬═╗                   ╔═╦═╦═╦═╦═╬═╣ \n' +
                '           ╠═╬═╣                   ╠═╬═╬═╬═╬═╬═╣ \n' +
                '           ╠═╬═╬═╦═╦═╦═╦═╦═╦═╦═╦═╦═╬═╬═╬═╬═╬═╬═╣ \n' +
                '           ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣ \n' +
                '           ╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣ \n' +
                '           ╠═╬═╣:╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣ \n' +
                '           ╚═╩═╝ ╚═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╝ \n' +
                '               ╔═╦═╦═╦═╦═╦═╦═╦═╦═╦═╦═╦═╦═╦═╦═╗   \n' +
                '              :╠═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╬═╣   \n' +
                '               ╚═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╩═╝   \n' +
                '\n' +
                ' An interactive Periodic Table of Elements app for the console!\n' +
                '\n' +
                ' Interactive Controls:\n' + 
                '   - Navigation: Use <UP>|<DOWN>|<LEFT>|<RIGHT> arrows\n' + 
                '\n' +
                '   - Display Mode: Use Slash </> to toggle the display mode forwards\n' +
                '                   Use BackSlash <\\> to toggle the display mode in reverse\n' +
                '\n' +
                '   - Search: Query with letters or numbers\n' +
                '             Use <UP>|<DOWN> arrows to navigate results\n' +
                '             Press <ENTER> to select\n' +
                '             Press <LEFT> to exit search\n' +
                '\n' +
                '   - Quit: Press <ESC> or <CTRL+C>\n' +
                '\n' +
                ' Usage:\n' + 
                '   $ periodic-table-cli\n' + 
                '   $ periodic-table-cli [options]\n' + 
                '\n' +
                ' Options:\n' + 
                '   --mode=<mode>          Set the mode for the application.  Supports three values:\n' +
                '                            - app:    Run in interactive mode (default)\n' +
                '                            - data:   Display data for a specified element\n' +
                '                            - chart:  Prints a non-interactive table only\n' +
                '   --atomic-number=<int>  Initialize the Periodic Table at the specified atomic number (1-118)\n' +
                '   --symbol=<symbol>      Initialize the Periodic Table at the specified element symbol\n' +
                '   --name=<name>          Initialize the Periodic Table at the specified element name\n' +
                '   --small, -s            Print a smaller Periodic Table of Elements (include --mode=chart)\n' +
                '   --verbose, -v          Print a complete data chart with all elements (include --mode=data)\n' +
                '\n' +
                ' Full Docs: https://spirometaxas.com/projects/periodic-table-cli\n\n' +
                ' Last updated March 2023\n');
}

const getFlags = function(params) {
    let flags = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (params[i].startsWith('-')) {
                flags.push(params[i]);
            }
        }
    }
    return flags;
}

const isSmall = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '-s' || flags[i].toLowerCase() === '--small')) {
            return true;
        }
    }
    return false;
}

const isHelp = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '--help' || flags[i].toLowerCase() === '-h')) {
            return true;
        }
    }
    return false;
}

const isVerbose = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '--verbose' || flags[i].toLowerCase() === '-v')) {
            return true;
        }
    }
    return false;
}

const getMode = function(flags) {
    const prefix = '--mode=';
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith(prefix)) {
            const modeString = flags[i].substring(prefix.length);
            if (modeString !== undefined && MODES[modeString.toUpperCase()] !== undefined) {
                return MODES[modeString.toUpperCase()];
            }
        }
    }
    return MODES.APP;  // Default to APP
}

const getAtomicNumber = function(flags) {
    const prefix = '--atomic-number=';
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith(prefix)) {
            const atomicNumberString = flags[i].substring(prefix.length);
            if (atomicNumberString !== undefined && !isNaN(atomicNumberString)) {
                return parseInt(atomicNumberString);
            }
        }
    }
    return undefined;
}

const getName = function(flags) {
    const prefix = '--name=';
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith(prefix)) {
            const nameString = flags[i].substring(prefix.length);
            if (nameString !== undefined) {
                return nameString;
            }
        }
    }
    return undefined;
}

const getSymbol = function(flags) {
    const prefix = '--symbol=';
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith(prefix)) {
            const symbolString = flags[i].substring(prefix.length);
            if (symbolString !== undefined) {
                return symbolString;
            }
        }
    }
    return undefined;
}

var mode = MODES.APP;
var atomicNumber = undefined;
var name = undefined;
var symbol = undefined;
var small = false;
var verbose = false;

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    mode = getMode(params);
    atomicNumber = getAtomicNumber(params);
    name = getName(params);
    symbol = getSymbol(params);
    small = isSmall(params);
    verbose = isVerbose(params);

    if (isHelp(params)) {
        printUsage();
        process.exit();
    } else if (mode === MODES.DATA) {
        console.log(DataProcessor.formatData({ atomicNumber: atomicNumber, symbol: symbol, name: name, verbose: verbose }));
        process.exit();
    } else if (mode === MODES.CHART) {
        console.log(ChartProcessor.formatChart({ atomicNumber: atomicNumber, symbol: symbol, name: name, small: small }));
        process.exit();
    }
}

if (!process.stdout.isTTY) {
    console.log(' Error: Interactive mode is only supported within a terminal screen.');
    process.exit();
}

new App().start({ atomicNumber: atomicNumber, name: name, symbol: symbol });