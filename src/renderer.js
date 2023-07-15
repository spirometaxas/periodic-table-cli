class Renderer {

    static generateStandard(fullBoard) {
        var response = '';
        for (var r = 0; r < fullBoard.length; r++) {
            for (var c = 0; c < fullBoard[r].length; c++) {
                var block = '';
                var hasFormat = false;
                if (fullBoard[r][c].config.backgroundColor) {
                    block += fullBoard[r][c].config.backgroundColor;
                    hasFormat = true;
                }
                if (fullBoard[r][c].config.foregroundColor && fullBoard[r][c].character !== ' ') {
                    block += fullBoard[r][c].config.foregroundColor;
                    hasFormat = true;
                }
                if (fullBoard[r][c].config.bold && fullBoard[r][c].character !== ' ') {
                    block += '\u001b[1m';
                    hasFormat = true;
                }
                block += fullBoard[r][c].character;
                if (hasFormat) {
                    block += '\u001b[0m';  // End format
                }
                response += block;
            }
            if (r < fullBoard.length - 1) {
                response += '\n';
            }
        }
        return response;
    }

    static generateOptimized(fullBoard) {
        var response = '';
        var currentFGColor = undefined;
        var currentBGColor = undefined;
        var currentBold = false;

        for (var r = 0; r < fullBoard.length; r++) {
            for (var c = 0; c < fullBoard[r].length; c++) {
                var block = '';
                var hasFormat = false;
                if (fullBoard[r][c].character !== ' ') {
                    if (fullBoard[r][c].config.bold && !currentBold) {
                        block += '\u001b[1m';  // Bold
                        currentBold = true;
                    } else if (currentBold && !fullBoard[r][c].config.bold) {
                        block += '\u001b[0m';  // End format
                        currentFGColor = undefined;
                        currentBGColor = undefined;
                        currentBold = false;
                    }
                } else if (fullBoard[r][c].character === ' ' && !fullBoard[r][c].config.bold && currentBold) {
                    block += '\u001b[0m';  // End format
                    currentFGColor = undefined;
                    currentBGColor = undefined;
                    currentBold = false;
                }

                if (fullBoard[r][c].config.backgroundColor && fullBoard[r][c].config.backgroundColor !== currentBGColor) {
                    block += fullBoard[r][c].config.backgroundColor;
                    currentBGColor = fullBoard[r][c].config.backgroundColor;
                }
                if (fullBoard[r][c].config.foregroundColor && fullBoard[r][c].config.foregroundColor !== currentFGColor && fullBoard[r][c].character !== ' ') {
                    block += fullBoard[r][c].config.foregroundColor;
                    currentFGColor = fullBoard[r][c].config.foregroundColor;
                }

                block += fullBoard[r][c].character;

                response += block;
            }
            if (r < fullBoard.length - 1) {
                currentFGColor = undefined;
                currentBGColor = undefined;
                currentBold = false;
                block += '\u001b[0m';  // End format
                response += '\n';
            }
        }
        return response;
    }  // 22235  22380  22434

}

module.exports = {
    Renderer: Renderer,
}