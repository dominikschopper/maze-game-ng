
export class BoardMap {
    /**
     * [ 
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     *  [ 'w', 'm', '-', '-', '-', '-', 'w' ]
     *  [ 'w', '-', 'h', '-', 'v', '-', 'w' ]
     *  [ 'w', 'w', 'w', 'w', 'w', 'w', 'w' ]
     * ]
     */
    protected map: Array<Array<String>>;

    protected readonly ttypes = {
        WALL: 'w',
        HERO: 'h',
        EXIT: 'e',
        MONSTER: 'm',
        VILLAIN: 'v',
        SPACE: 's'
    }

    protected positions: Object;

    setMap(map) {
        this.map = map;
    }

    findHeroPositionCb(value, pos) {
        if (value === this.ttypes.HERO) {
            
        }
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