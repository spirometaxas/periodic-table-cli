# periodic-table-cli
Print the Periodic Table of Elements to the console!

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/periodic-table-banner.png)

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

## Options
### Standard Periodic Table
```
$ periodic-table-cli
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/periodic-table.png)

Minimum terminal width: 113 characters

### Smaller Periodic Table
To render a more compact version of the Periodic Table of Elements, add the `--small` or `-s` flag.
```
$ periodic-table-cli --small
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/periodic-table-small.png)

Minimum terminal width: 76 characters