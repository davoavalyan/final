
class Amenaker {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;

    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //qayluma
    move() {

        //yntruma vandak
        var newCells1 = this.chooseCell(0);
        var newCells2 = this.chooseCell(1);
        var newCells = newCells1.concat(newCells2);
        var newCell = random(newCells)
        if (newCell) {
            console.log(newCell)
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 1;
                matrix[newY][newX] = 5;
            }
            else if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 5;
            }
            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }

    eat() {
        
        var eatCells1 = this.chooseCell(2);
        var eatCells2 = this.chooseCell(3);
        var eatCells3 = this.chooseCell(4);
        var eatCells = eatCells1.concat(eatCells2, eatCells3);
        var eatCell = random(eatCells);
        if (eatCell) {
            let newX = eatCell[0];
            let newY = eatCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.y = newY;
            this.x = newX;
            this.energy += 2;

            for (var i in PeopleArr) {
                if (this.x == PeopleArr[i].x && this.y == PeopleArr[i].y) {
                    PeopleArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in WolfArr) {
                if (this.x == WolfArr[i].x && this.y == WolfArr[i].y) {
                    WolfArr.splice(i, 1);
                    break;
                }
            }


        }
        else this.move();
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 15 && newCell) {
            AmenakerCount++;
            var newAmenaker = new Amenaker(newCell[0], newCell[1], this.index);
            AmenakerArr.push(newAmenaker);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 12;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in AmenakerArr) {
                if (this.x == AmenakerArr[i].x && this.y == AmenakerArr[i].y) {
                    AmenakerArr.splice(i, 1);
                    break;
                }

            }
        }
    }
}





