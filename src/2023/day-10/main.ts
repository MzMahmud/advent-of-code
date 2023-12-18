import { readLines } from "../../util/string";

type Position = [number, number];
const NORTH: Position = [-1, 0],
    EAST: Position = [0, 1],
    SOUTH: Position = [1, 0],
    WEST: Position = [0, -1];

const directionMap = {
    "|": [NORTH, SOUTH],
    "-": [EAST, WEST],
    L: [NORTH, EAST],
    J: [NORTH, WEST],
    "7": [SOUTH, WEST],
    F: [SOUTH, EAST],
    ".": [],
    S: [NORTH, EAST, SOUTH, WEST],
} as Record<string, Position[]>;

// const grid = parseInput("example.txt");
const grid = readLines("input.txt");
console.warn("part one answer", getPartOneAnswer(grid));

// const grid = parseInput("example.txt");
// const grid = parseInput("input.txt");
// console.warn("part two answer", getPartOneAnswer(grid));

function getPartOneAnswer(grid: string[]) {
    let startPosition: Position = findChar(grid, "S")!;
    const { cycleLen } = dfs(startPosition, grid, { cycleLen: 1 });
    return Math.floor(cycleLen / 2);
}

function dfs(start: Position, grid: string[], shared: { cycleLen: number }) {
    const stack = [
        {
            node: start,
            parent: [-1, -1] as Position,
            pathLen: 0,
            childIndex: -1,
        },
    ];
    const doneVisiting = new Map<string, boolean>([[`${start}`, false]]);
    while (stack.length > 0) {
        const { node, parent, pathLen, childIndex } = stack.pop()!;
        const [i, j] = node;
        doneVisiting.set(`${node}`, false);
        const nextPathLen = pathLen + 1;
        let neighIndex = 0;
        for (const [di, dj] of directionMap[grid[i][j]]) {
            const neigh: Position = [i + di, j + dj];
            const outsideOrParent =
                grid[neigh[0]]?.[neigh[1]] == null ||
                `${neigh}` === `${parent}`;
            if (outsideOrParent) continue;
            const done = doneVisiting.get(`${neigh}`);
            if (done == null) {
                stack.push({
                    node: neigh,
                    parent: node,
                    pathLen: nextPathLen,
                    childIndex: neighIndex++,
                });
            } else if (done === false) {
                shared.cycleLen = Math.max(shared.cycleLen, nextPathLen);
                break;
            }
        }
        if (childIndex === 0) {
            doneVisiting.set(`${parent}`, true);
        }
    }
    return shared;
}

function findChar(grid: string[], char: string) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === char) {
                return [i, j] as Position;
            }
        }
    }
    return null;
}

function getPartTwoAnswer(grid: string[]) {}
