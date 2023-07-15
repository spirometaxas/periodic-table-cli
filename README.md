# periodic-table-cli

![periodic-table-cli title](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/logo-banner.png) 

An interactive [Periodic Table of Elements](https://en.wikipedia.org/wiki/Periodic_table) app for the console!

Why the console?  Because it's the *cool* way.

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/animated.gif)

[![npm version](https://img.shields.io/npm/v/periodic-table-cli)](https://www.npmjs.com/package/periodic-table-cli)
[![bundle size](https://img.shields.io/bundlephobia/min/periodic-table-cli)](https://bundlephobia.com/package/periodic-table-cli)
[![downloads](https://img.shields.io/npm/dy/periodic-table-cli)](https://www.npmjs.com/package/periodic-table-cli)
[![license](https://img.shields.io/npm/l/periodic-table-cli)](https://github.com/spirometaxas/periodic-table-cli/blob/main/LICENSE)

[View Homepage](https://spirometaxas.com/projects/periodic-table-cli)

## Usage
### Run via `npx`:
```
$ npx periodic-table-cli
$ npx periodic-table-cli [options]
```

### Run via Global Install
```
$ npm install --global periodic-table-cli
$ periodic-table-cli
$ periodic-table-cli [options]
```
The config params are optional ([see below](https://github.com/spirometaxas/periodic-table-cli#options)).  

### Interactive Controls
- **Navigation**: Use `UP` / `DOWN` / `LEFT` / `RIGHT` arrows.
- **Display Mode**: Use `SLASH` (`/`) to toggle the display mode forwards.  Use `BACKSLASH` (` \ `) to toggle the display mode in reverse.
- **Search**: Use `UP` / `DOWN` arrows to navigate results.  Press `ENTER` to select.  Press `LEFT` to exit search.
- **Quit**: Press `ESC` or `CTRL+C`.

Add the `--help` flag for more info.

Note: Be sure to run in terminals that support 256 colors.

## Features
### Browse
Use arrow keys to navigate and browse across all 118 elements.  The selected element appears in gold on the Periodic Table on the left, and 22 data points for that element will display on the right.  Each element's family and electron configuration will appear in gold below the Periodic Table. 

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/browse_01.png) 

Move the cursor directly below the Periodic Table to browse all 10 element families.  The elements in that family will be focused on the Periodic Table, and a description of that family will appear on the right.  

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/browse_02.png) 

Move the cursor below the element families to browse all 4 electron configurations.  The elements with that electron configuration will be focused on the Periodic Table, and a description of that electron shell will appear on the right.  

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/browse_03.png)

### Search
Use letters or numbers to query for an element, family, or electron configuration.  Queries are matched on element names, symbols, and atomic numbers, along with family names and electron configuration names.  Just start typing to enter search mode.  Press the Enter to select a search item, or the Left arrow to exit search mode.

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/search_01.png)

### Display Mode
Use the SLASH (`/`) key to toggle different display modes.  Use BACKSLASH (` \ `) to toggle in reverse.  The following 20 display modes are supported:

#### Element Families

Display 10 color-coded element families:

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_01.png)

#### Electron Configurations

Display 4 color-coded electron shells:

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_02.png)

#### Standard State

Display whether an element is a solid (white), liquid (red), or gas (blue).  Expected states appear as a darker color (gray is expected solid, dark blue is expected gas):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_03.png)

#### Atomic Mass

Display a heat-map of atomic mass (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_04.png)

#### Protons

Display a heat-map of the number of protons (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_05.png)

#### Neutrons

Display a heat-map of the number of neutrons (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_06.png)

#### Electrons

Display a heat-map of the number of electrons (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_07.png)

#### Valence Electrons

Display a color-coded representation of the number of valence electrons:

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_08.png)

#### Valency

Display a color-coded representation of valency:

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_09.png)

#### Atomic Radius

Display a heat-map of atomic radius (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_10.png)

#### Density

Display a heat-map of density (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_11.png)

#### Electronegativity

Display a heat-map of electronegativity (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_12.png)

#### Ionization Energy

Display a heat-map of ionization energy (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_13.png)

#### Electron Affinity

Display a heat-map of electron affinity (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_14.png)

#### Melting Point

Display a heat-map of melting point (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_15.png)

#### Boiling Point

Display a heat-map of boiling point (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_16.png)

#### Specific Heat

Display a heat-map of specific heat (increasing from blue to red):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_17.png)

#### Radioactivity

Display which elements are radioactive (red) and stable (green):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_18.png)

#### Occurrence

Display which elements have a natural occurrence (blue), rare occurrence (orange), or artificial occurrence (yellow):

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_19.png)

#### Year

Display a heat-map of the year each element was discovered (increasing from blue to red).  Ancient elements appear in white:

![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/display_20.png)

## Options

### Data Mode
The `--mode=data` param displays a brief list of all the elements, including atomic number, element symbol, and element name:  
```
$ periodic-table-cli --mode=data
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/data.png)

#### Verbose
Add the optional `--verbose` flag (or shorthand `-v`) to display a detailed list of all elements with up to 27 data columns (limited by screen size):
```
$ periodic-table-cli --mode=data --verbose
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/data_verbose.png)

#### Specific Elements
Specify an element to view data for that element.  Elements can be specified using the `--atomic-number=<number>`, `--symbol=<symbol>`, or `--name=<name>` params:
```
$ periodic-table-cli --mode=data --atomic-number=<number>
$ periodic-table-cli --mode=data --symbol=<symbol>
$ periodic-table-cli --mode=data --name=<name>
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/data_element.png)

### Chart Mode
The `--mode=chart` param prints a non-interactive Periodic Table of Elements:  
```
$ periodic-table-cli --mode=chart
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/chart.png)

Minimum terminal width: 113 characters

#### Small
Add the optional `--small` flag (or shorthand `-s`) to print a smaller non-interactive version of the Periodic Table of Elements:
```
$ periodic-table-cli --mode=chart --small
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/chart_small.png)

Minimum terminal width: 76 characters

#### Specific Elements
Specify an element to view that element on the Periodic Table of Element.  Elements can be specified using the `--atomic-number=<number>`, `--symbol=<symbol>`, or `--name=<name>` params:
```
$ periodic-table-cli --mode=data --atomic-number=<number>
$ periodic-table-cli --mode=data --symbol=<symbol>
$ periodic-table-cli --mode=data --name=<name>
```
![What periodic-table-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/periodic-table-cli/main/img/chart_element.png)

### App Mode (default)

The `--mode=app` param runs the app in interactive mode (default).  
```
$ periodic-table-cli --mode=app
```

#### Specific Elements
Specify an element to launch the app on that element.  Elements can be specified using the `--atomic-number=<number>`, `--symbol=<symbol>`, or `--name=<name>` params:
```
$ periodic-table-cli --mode=app --atomic-number=<number>
$ periodic-table-cli --mode=app --symbol=<symbol>
$ periodic-table-cli --mode=app --name=<name>
```

## Data Sources
Data used in the app is stored in an easy to edit [data file](https://github.com/spirometaxas/periodic-table-cli/blob/main/src/data.js).  The data is mostly imported from [PubChem](https://pubchem.ncbi.nlm.nih.gov/periodic-table/). 

Last Updated July 2023

## License
- [MIT](https://github.com/spirometaxas/periodic-table-cli/blob/main/LICENSE) &copy; [Spiro Metaxas](https://spirometaxas.com)