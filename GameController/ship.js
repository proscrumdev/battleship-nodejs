class Ship {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.positions = [];
    }

    addPosition(position) {
        this.positions.push(position);
    }
  
    isContinous() {
      var counter = 0 
      this.positions.forEach(_shipPosition => {
        if (this.hasNeighbour(_shipPosition)) {
          counter++
        }  
      });
      return this.positions.length == counter
    }
  
    hasNeighbour(oldPosition) {   
      const upPos = this.includes(oldPosition.column.value, oldPosition.row - 1)
      const downPos = this.includes(oldPosition.column.value, oldPosition.row + 1)
      const leftPos = this.includes(oldPosition.column.value - 1, oldPosition.row)
      const rightPos = this.includes(oldPosition.column.value + 1, oldPosition.row)
      return upPos || downPos || leftPos || rightPos
    }
  
    includes(x,y) {
      var retVal = false
      this.positions.forEach(_shipPosition => {
          if(y == _shipPosition.row && x == _shipPosition.column.value) {
            retVal = true
          }
      });
      return retVal
    }
}

module.exports = Ship;