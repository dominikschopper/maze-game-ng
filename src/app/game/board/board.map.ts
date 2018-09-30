import { BoardFogCalculator } from "./board.fogcalculator";
const HERO_SYMBOL = 'h';
const WALL_SYMBOL = 'w';
const EXIT_SYMBOL = 'e';
const MONSTER_SYMBOL = 'm';
const VILLAIN_SYMBOL = 'v';
const SPACE_SYMBOL = '-';
export default class BoardMap {
    /**
     * [ 
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     *  [ 'w', 'm', '-', '-', '-', '-', 'w' ]
     *  [ 'w', '-', 'h', '-', 'v', '-', 'w' ]
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     * ]
     */
    public map: Array<Array<string>>;

    protected readonly directionCalculator = {
        up: (pos) => {
            return { ...pos, row: pos.row - 1 };
        },
        down: (pos) => {
            return { ...pos, row: pos.row + 1 };
        },
        left: (pos) => {
            return { ...pos, column: pos.column - 1 };
        },
        right: (pos) => {
            return { ...pos, column: pos.column + 1 };
        }
    }

    protected fogCalculator: BoardFogCalculator = new BoardFogCalculator(2, this);

    protected positions: Map<string, { row: number, column: number }> = new Map();

    public setMap(map) {
        this.map = map;
        this.walkTheBoard(this.findHeroPositionCb);
        const heroPos = this.getCharacterPositionOf(HERO_SYMBOL);
        this.setCharacterPosition(HERO_SYMBOL, heroPos);
        this.fogCalculator.setHeroPosition(heroPos);
        return this;
    }

    public getMap() {
        return [...this.map];
    }

    protected findHeroPositionCb = (value, pos) => {
        if (value === HERO_SYMBOL) {
            this.positions.set(HERO_SYMBOL, pos);
        }
    }

    protected setCharacterPosition(symb: string, pos: {column: number, row: number}) {
        this.positions.set(symb, pos)
        this.map[pos.row][pos.column] = symb;
    }

    public getCharacterPositionOf(who: string) {
        return this.positions.get(who);
    }

    public isPositionThis(pos: {column: number, row: number}, symb: string) {
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
        const oldPos = this.getCharacterPositionOf(HERO_SYMBOL);
        const nextPos = this.directionCalculator[dir](oldPos);
        console.log('direction:%o oldPos:%o -> nextPos:%o', dir, oldPos, nextPos);
        
        if (this.isPositionSpace(nextPos)) {
            this.map[oldPos.row][oldPos.column] = SPACE_SYMBOL;
            this.map[nextPos.row][nextPos.column] = HERO_SYMBOL;
            this.setCharacterPosition(HERO_SYMBOL, nextPos);
            this.fogCalculator.setHeroPosition(nextPos);
            return true;
        }

        return false;
    }

    public shouldElementBeClear(pos: {column: number, row: number}) {
        // debugger;
        return this.fogCalculator.isPosClear(pos);
    }

    /**
     * 
     * @param callbacks {Function} an array of callbacks, that will be called for each tile in the map
     */
    walkTheBoard(...callbacks) {
        for (let r = 0; r < this.map.length; r += 1) {
            for (let c = 0; c < this.map.length; c += 1) {
                for (let i = 0; i < callbacks.length; i += 1) {
                    callbacks[i](this.map[r][c], { row: r, column: c });
                }
            }
        }
    }
}