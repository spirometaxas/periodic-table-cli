#!/usr/bin/env node
const periodic_table = require('./index.js');

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    if (params[0] === '--small' || params[0] === '-s') {
        console.log(periodic_table.table_small);
    } else if (params[0] === '--help') {
        console.log('\nUsage:\n' + '  $ periodic-table-cli\n' + '  $ periodic-table-cli --small\n');
    } else {
        console.log(periodic_table.table);
    }
} else {
    console.log(periodic_table.table);
}