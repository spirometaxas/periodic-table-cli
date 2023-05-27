const { Dashboard } = require('./dashboard.js');
const { StateController } = require('./statecontroller.js');

const KeyMap = {
    CTRL_C: '\u0003',
    ESC: '\u001B',
    UP: '\u001b[A',
    DOWN: '\u001b[B',
    RIGHT: '\u001b[C',
    LEFT: '\u001b[D',
    SLASH: '\u002F',
    BACKSLASH: '\u005C',
    BACKSPACE: '\u0008',
    DELETE: '\u007F',
    ENTER: '\u000D',
    LETTERS: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ],
    NUMBERS: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
    SPECIAL_CHARACTERS: [ '-', ' ' ],
}

const DEGUG_MODE = true;  // TODO: Make false

class App {

    start(config) {
        this.stateController = new StateController(config);
        this.dashboard = new Dashboard();

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdout.write('\u001b[?1049h');  // Enter alternate screen mode
        process.stdout.write('\u001B[?25l');    // Hise cursor
        this._initHandlers();
        this._draw(true);
    }

    _draw(full) {
        const renderConfig = this.stateController.getRenderConfig();
        this._clearScreen(full);
        process.stdout.write(this.dashboard.render(renderConfig));
    }

    _clearScreen(full) {
        if (full) {
            process.stdout.write('\u001b[2J');  // Clear screen
        }
        process.stdout.write('\u001b[H');   // Move cursor to home position
    }

    _initHandlers() {
        process.stdin.on('data', key => {
            try {
                var handled = false;
                if (key === KeyMap.CTRL_C || key === KeyMap.ESC) {
                    this.exit();
                } else if (key === KeyMap.UP) {
                    handled = this.stateController.processUp();
                } else if (key === KeyMap.DOWN) {
                    handled = this.stateController.processDown();
                } else if (key === KeyMap.LEFT) {
                    handled = this.stateController.processLeft();
                } else if (key === KeyMap.RIGHT) {
                    handled = this.stateController.processRight();
                } else if (key === KeyMap.SLASH) {
                    handled = this.stateController.processSlash();
                } else if (key === KeyMap.BACKSLASH) {
                    handled = this.stateController.processBackslash();
                } else if (key === KeyMap.ENTER) {
                    handled = this.stateController.processEnter();
                } else if (key === KeyMap.BACKSPACE || key === KeyMap.DELETE) {
                    handled = this.stateController.processBackspace();
                } else if (KeyMap.LETTERS.includes(key) || KeyMap.NUMBERS.includes(key) || KeyMap.SPECIAL_CHARACTERS.includes(key)) {
                    handled = this.stateController.processSearchInput(key);
                }

                if (handled) {
                    this._draw(false);
                }
            } catch(e) {
                if (DEGUG_MODE) {
                    this.exit(e.stack);
                } else {
                    this.exit('An error occurred, exiting.');
                }
            }
        });

        // On terminal resize
        process.on("SIGWINCH", () => {
            try {
                this._draw(true);
                process.stdout.write('\u001B[?25l');  // Hise cursor
            } catch(e) {
                if (DEGUG_MODE) {
                    this.exit(e.stack);
                } else {
                    this.exit('An error occurred, exiting.');
                }
            }
        });
    }

    exit(message) {
        process.stdout.write('\u001b[?1049l');  // Exit altername screen mode
        process.stdout.write('\u001B[?25h');    // Show cursor
        if (message) {
            console.log(message);
        }
        process.exit();
    }

}

module.exports = {
    App: App,
}