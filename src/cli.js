#!/usr/bin/env node
const periodic_table = require('./index.js');
const { App } = require('./app.js');
const { Utils } = require('./utils.js');

const printUsage = function() {
    console.log('\n' + 
                ' An interactive Periodic Table of Elements for the console!\n' +
                '\n' +
                ' Usage:\n' + 
                '   $ periodic-table-cli\n' + 
                '   $ periodic-table-cli [options]\n' + 
                '\n' +
                ' Options:\n' + 
                '   --chart, -c    Print the Periodic Table Chart only (non-interactive)\n' +
                '   --small, -s    A smaller chart version of the Periodic Table of Elements\n');
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

const isChart = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '-c' || flags[i].toLowerCase() === '--chart')) {
            return true;
        }
    }
    return false;
}

const isHelp = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase() === '--help') {
            return true;
        }
    }
    return false;
}

const getAtomicNumber = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--atomic-number=')) {
            const atomicNumberString = flags[i].substring(16);
            if (atomicNumberString !== undefined && !isNaN(atomicNumberString)) {
                const atomicNumber = parseInt(atomicNumberString);
                if (Utils.isValidAtomicNumber(atomicNumber)) {
                    return atomicNumber;
                }
            }
        }
    }
    return 1;
}

// TODO: Check if isTTY

var small = false;
var atomicNumber = 1;
if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    small = isSmall(params);
    atomicNumber = getAtomicNumber(params);
    if (isHelp(params)) {
        printUsage();
        process.exit();
    } else if (isChart(params)) {
        console.log(small ? periodic_table.table_small : periodic_table.table);
        process.exit();
    }
}


new App().start({ atomicNumber: atomicNumber });