class Grid{
    constructor(arr){
        this.grid = [];
        if(arr !== undefined){
            this.grid = new Array(arr.length);
            for(let i = 0; i < arr.length; i++){
                this.grid[i] = arr[i].slice();
            }
        } else {
            var temp = new Array(6);
            for(let i = 0; i< temp.length; i++){
                temp[i] = new Array(6);
                for(let j = 0; j < temp.length; j++){
                    temp[i][j] = Math.round(Math.random());
                }
            }
            this.grid = temp;
        }
    }

    printArray(){
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                if(this.grid[i][j] === 0){
                    process.stdout.write("x ");
                }else{
                    process.stdout.write("o ");
                }
            }
            console.log('');
        }
    }
}

class MazeSolver extends Grid{
    constructor(_x,_y ,grid){
        super(grid);
        this.x = _x;
        this.y = _y;
    }

    canTraverse(x,y){
        if(x < 0 || y < 0){
            return false;
        }else if(x >= this.grid.length || y >= this.grid[x].length){
            return false;
        }else {
            return true;
        }

    }

    getNeighbors(){
        let neighbors = [];
        if(this.canTraverse(x+1,y)){
            neighbors.push([x+1,y]);
        }
        if(this.canTraverse(x-1,y)){
            neighbors.push([x-1,y]);
        }
        if(this.canTraverse(x,y+1)){
            neighbors.push([x,y+1]);
        }
        if(this.canTraverse(x,y-1)){
            neighbors.push([x,y-1]);
        }
        return neighbors;
    
    
    }
    checkVisited(x,y,visited){

        for(var i = 0; i < visited.length; i++){
            if(visited[i][0] === x && visited[i][1] ===y){
                return true;
            }
        }        
        return false;
    }
    solve(x1,y1, x2, y2){
        // solve from coordinates (x, y)
        var stack = []; // maintain coordinates
        var visited = [];
        // check if initial position can be traversed
        if(this.canTraverse(x1,y1)){
            visited.push([x1,y1]);
            stack.push([x1,y1]);
        }
        var solved = false;
        while(stack.length > 0){
            var currentPos = stack.pop();
            if(currentPos[0] === x2 && currentPos[1] === y2){
                solved = true;
                break;
            }
            
            var neighbours = this.getNeighbours(currentPos[0], currentPos[1]);
            for(var i = 0; i < neighbours.length; i++){
                if (!this.checkVisited(neighbours[i][0],neighbours[i][1],visited)){
                    visited.push([neighbours[i][0],neighbours[i][1]]);
                    stack.push([neighbours[i][0],neighbours[i][1]]);
                }
            }
        }
        return solved;
    }
}


new Grid([[0,1,0,1],[0,1,1,1],[0,1,0,1],[0,0,0,1]]);

