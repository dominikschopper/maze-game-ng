import BoardMap from './board.map';
export class BoardFogCalculator {

    protected mapWrapper: BoardMap;
    protected heroPosition: { row: number, column: number };

    protected fogDistance: number = 2;

    protected rowClearBelowHere: number;
    protected rowClearAboveHere: number;
    protected columnClearBelowHere: number;
    protected columnClearAboveHere: number;

    protected sightBlockedUp: number;
    protected sightBlockedDown: number;
    protected sightBlockedLeft: number;
    protected sightBlockedRight: number;

    constructor(fogDistance: number, mapWrapper) {
        this.setFogDistance(fogDistance);
        this.mapWrapper = mapWrapper;
    }

    public setHeroPosition(pos: { column: number, row: number }) {
        this.heroPosition = pos;
        this.rowClearAboveHere = this.heroPosition.row - this.fogDistance;
        this.rowClearBelowHere = this.heroPosition.row + this.fogDistance;
        this.columnClearAboveHere = this.heroPosition.column - this.fogDistance;
        this.columnClearBelowHere = this.heroPosition.column + this.fogDistance;
        this.sightBlockedDown = undefined;
        this.sightBlockedUp = undefined;
        this.sightBlockedLeft = undefined;
        this.sightBlockedRight = undefined;
    }

    public setFogDistance(num: number) {
        this.fogDistance = num;
    }

    public isPosClear(pos: { column: number, row: number }): boolean {
        console.log('call isPosClear');
        if (pos.row >= this.rowClearAboveHere &&
            pos.row <= this.rowClearBelowHere &&
            pos.column <= this.columnClearBelowHere &&
            pos.column >= this.columnClearAboveHere) {
            
            // here we are in the lighted zone
            console.log('hero(%o)', this.heroPosition);
            console.log('lighted pos(%o)', pos)

            if (this.heroPosition.row < pos.row && this.mapWrapper.isPositionWall(pos)) {
                    this.sightBlockedUp = pos.row;
            }
            if (this.heroPosition.row > pos.row && this.mapWrapper.isPositionWall(pos)) {
                    this.sightBlockedDown = pos.row;
            }

            if (this.heroPosition.column < pos.column && this.mapWrapper.isPositionWall(pos)) {
                    this.sightBlockedRight = pos.column;
            }
            if (this.heroPosition.column > pos.column && this.mapWrapper.isPositionWall(pos)) {
                    this.sightBlockedLeft = pos.column;
            }

            if (pos.row > this.sightBlockedUp || 
                pos.row < this.sightBlockedDown || 
                pos.column > this.sightBlockedRight || 
                pos.column < this.sightBlockedLeft) {
                return false;
            }

            return true;
        }
        return false;
    }
}