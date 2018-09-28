const HERO_SYMBOL = 'h';
const WALL_SYMBOL = 'w';
const EXIT_SYMBOL = 'e';
const MONSTER_SYMBOL = 'm';
const VILLAIN_SYMBOL = 'v';
const SPACE_SYMBOL = 's';
export class BoardMap {
    /**
     * [ 
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     *  [ 'w', 'm', '-', '-', '-', '-', 'w' ]
     *  [ 'w', '-', 'h', '-', 'v', '-', 'w' ]
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     * ]
     */
    protected map: Array<Array<string>>;

    protected readonly directionCalculator = {
        ArrowUp: (pos) => {
            return { ...pos, row: pos.row - 1 };
        },
        ArrowDown: (pos) => {
            return { ...pos, row: pos.row + 1 };
        },
        ArrowLeft: (pos) => {
            return { ...pos, column: pos.column - 1 };
        },
        ArrowRight: (pos) => {
            return { ...pos, column: pos.column + 1 };
        }
    }

    protected positions: Map<String, { row: Number, column: Number }>;

    public setMap(map) {
        this.map = map;
        this.walkTheBoard(this.findHeroPositionCb);
        return this;
    }

    protected findHeroPositionCb(value, pos) {
        if (value === HERO_SYMBOL) {
            this.positions.set(HERO_SYMBOL, pos);
        }
    }

    /**
     * 
     * @param symb {Enum<string>}
     * @param pos {{column: number, row: number}}
     */
    protected setCharacterPosition(symb, pos) {
        this.positions[symb] = pos;
        this.map[pos.row][pos.column] = symb;
    }

    public getCharacterPositionOf(who: String) {
        return this.positions.get(who);
    }

    public isPositionThis(pos, symb) {
        return this.map[pos.row][pos.column] === symb;
    }
    public isPositionWall(pos) {
        return this.isPositionThis(pos, WALL_SYMBOL);
    }
    public isPositionSpace(pos) {
        return this.isPositionThis(pos, SPACE_SYMBOL);
    }

    public moveHero(dir) {
        if (!this.directionCalculator.hasOwnProperty(dir)) {
            return false;
        }

        const nextPos = this.directionCalculator[dir](this.getCharacterPositionOf(HERO_SYMBOL));

        if (this.isPositionSpace(nextPos)) {
            this.map[this.positions[HERO_SYMBOL].row][this.positions[HERO_SYMBOL].column] = SPACE_SYMBOL;
            this.map[nextPos.row][nextPos.column] = HERO_SYMBOL;
            this.setCharacterPosition(HERO_SYMBOL, nextPos);
            return true;
        }

        return false;
    }

    /**
     * 
     * @param callbacks {Function} an array of callbacks, that will be called for each tile in the map
     */
    walkTheBoard(...callbacks) {
        for (let r = 0; r < this.map.length; r += 1) {
            for (let c = 0; c < this.map.length; c += 1) {
                callbacks.forEach((cb) => {
                    cb(this.map[r][c], { row: r, column: c });
                });
            }
        }
    }
}