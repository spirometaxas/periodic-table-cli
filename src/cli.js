#!/usr/bin/env node
const periodic_table = require('./index.js');
const { App } = require('./app.js');
const { Utils } = require('./utils.js');

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
                '   - Display Mode: Use Slash </> to toggle the display mode forwards\n' +
                '                   Use BackSlash <\\> to toggle the display mode in reverse\n' +
                '   - Search:\n' +
                '   - Quit: Press <ESC> or <CTRL+C>\n' +
                '\n' +
                ' Usage:\n' + 
                '   $ periodic-table-cli\n' + 
                '   $ periodic-table-cli [options]\n' + 
                '\n' +
                ' Options:\n' + 
                '   --chart, -c            Print the Periodic Table of Elements Chart only (non-interactive)\n' +
                '   --small, -s            A smaller Periodic Table of Elements Chart (include --chart)\n' +
                '   --atomic-number=<int>  Initialize the Periodic Table at the provided atomic number (1-118)\n' +
                '\n' +
                ' Last updated March 2023');
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
        if (flags[i] && (flags[i].toLowerCase() === '--help' || flags[i].toLowerCase() === '-h')) {
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

if (!process.stdout.isTTY) {
    console.log(' Error: Interactive mode is only supported within a terminal screen.');
    process.exit();
}

new App().start({ atomicNumber: atomicNumber });