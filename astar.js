function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function astar(start, goal, gridSize) {
    let openSet = [start];
    let cameFrom = {};

    let gScore = {};
    gScore[start.x + "," + start.y] = 0;

    while (openSet.length > 0) {
        let current = openSet.shift();

        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            while (cameFrom[current.x + "," + current.y]) {
                path.push(current);
                current = cameFrom[current.x + "," + current.y];
            }
            return path.reverse();
        }

        let directions = [
            {x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}
        ];

        for (let d of directions) {
            let neighbor = {x: current.x + d.x, y: current.y + d.y};

            if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x >= gridSize || neighbor.y >= gridSize)
                continue;

            let key = neighbor.x + "," + neighbor.y;
            let tempG = gScore[current.x + "," + current.y] + 1;

            if (!(key in gScore) || tempG < gScore[key]) {
                gScore[key] = tempG;
                openSet.push(neighbor);
                cameFrom[key] = current;
            }
        }
    }

    return [];
}
