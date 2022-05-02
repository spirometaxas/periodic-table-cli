# periodic-table-cli
Print the Periodic Table of Elements to the console!

Minimum terminal width: 113 characters

## Usage
### Via `npx`:
```
$ npx periodic-table-cli
$ npx periodic-table-cli --small
```

### Via Global Install
```
$ npm install --global periodic-table-cli
$ periodic-table-cli
$ periodic-table-cli --small
```

### Via Import
```
$ npm install periodic-table-cli
```
then:
```
const periodic = require('periodic-table-cli');
console.log(periodic.table);
console.log(periodic.table_small);
```