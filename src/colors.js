class Colors {
    static BLACK       = { FG: '\u001b[38;5;0m',   BG: '\u001b[48;5;0m'   };
    static WHITE       = { FG: '\u001b[38;5;255m', BG: '\u001b[48;5;255m' };
    static GRAY        = { FG: '\u001b[38;5;244m', BG: '\u001b[48;5;244m' };
    static LIGHT_GRAY  = { FG: '\u001b[38;5;250m', BG: '\u001b[48;5;250m' };
    static FOCUS_GOLD  = { FG: '\u001b[38;5;214m', BG: '\u001b[48;5;214m' };
    static FOCUS_BLUE  = { FG: '\u001b[38;5;33m',  BG: '\u001b[48;5;33m'  };

    static RED         = { FG: '\u001b[38;5;196m', BG: '\u001b[48;5;196m' };
    static DARK_RED    = { FG: '\u001b[38;5;88m',  BG: '\u001b[48;5;88m'  };
    static ORANGE      = { FG: '\u001b[38;5;208m', BG: '\u001b[48;5;208m' };
    static YELLOW      = { FG: '\u001b[38;5;226m', BG: '\u001b[48;5;226m' };
    static DARK_YELLOW = { FG: '\u001b[38;5;136m', BG: '\u001b[48;5;136m' };
    static GREEN       = { FG: '\u001b[38;5;40m',  BG: '\u001b[48;5;40m'  };
    static MID_GREEN   = { FG: '\u001b[38;5;34m',  BG: '\u001b[48;5;34m'  };
    static DARK_GREEN  = { FG: '\u001b[38;5;28m',  BG: '\u001b[48;5;28m'  };
    static SKY_BLUE    = { FG: '\u001b[38;5;51m',  BG: '\u001b[48;5;51m'  };
    static BLUE        = { FG: '\u001b[38;5;27m',  BG: '\u001b[48;5;27m'  };
    static MAGENTA     = { FG: '\u001b[38;5;207m', BG: '\u001b[48;5;207m' };
    static PURPLE      = { FG: '\u001b[38;5;93m',  BG: '\u001b[48;5;93m'  };

    static METER_COLORS = [
        { FG: '\u001b[38;5;51m',  BG: '\u001b[48;5;51m'  },
        { FG: '\u001b[38;5;50m',  BG: '\u001b[48;5;50m'  },
        { FG: '\u001b[38;5;49m',  BG: '\u001b[48;5;49m'  },
        { FG: '\u001b[38;5;48m',  BG: '\u001b[48;5;48m'  },
        { FG: '\u001b[38;5;47m',  BG: '\u001b[48;5;47m'  },
        { FG: '\u001b[38;5;46m',  BG: '\u001b[48;5;46m'  },
        { FG: '\u001b[38;5;82m',  BG: '\u001b[48;5;82m'  },
        { FG: '\u001b[38;5;118m', BG: '\u001b[48;5;118m' },
        { FG: '\u001b[38;5;154m', BG: '\u001b[48;5;154m' },
        { FG: '\u001b[38;5;190m', BG: '\u001b[48;5;190m' },
        { FG: '\u001b[38;5;226m', BG: '\u001b[48;5;226m' },
        { FG: '\u001b[38;5;220m', BG: '\u001b[48;5;220m' },
        { FG: '\u001b[38;5;214m', BG: '\u001b[48;5;214m' },
        { FG: '\u001b[38;5;208m', BG: '\u001b[48;5;208m' },
        { FG: '\u001b[38;5;202m', BG: '\u001b[48;5;202m' },
        { FG: '\u001b[38;5;196m', BG: '\u001b[48;5;196m' },
    ];
}

module.exports = {
    Colors: Colors,
}