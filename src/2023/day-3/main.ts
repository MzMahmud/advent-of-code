import { multiplying, summing } from "../../util/functions";
import { isDigit, readLines } from "../../util/string";
const grid = readLines("input.txt").map((s) => s.trim());
// const grid = readLines("example.txt").map((s) => s.trim());

const partOneAnswer = getPartOneAnswer(grid);
console.warn({ partOneAnswer });

const partTwoAnswer = getPartTwoAnswer(grid);
console.warn({ partTwoAnswer });

function getPartOneAnswer(grid: string[]) {
    const symbolIndices = getSymbolIndices(grid, /[^0-9.]/);
    const partNumbersByLocation: Map<string, number> = new Map();
    for (const [i, j] of symbolIndices) {
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                const response = getPartNumberWithLocation(
                    i + di,
                    j + dj,
                    grid
                );
                if (response == null) continue;
                const { location, partNumber } = response;
                partNumbersByLocation.set(location, partNumber);
            }
        }
    }
    return [...partNumbersByLocation.values()].reduce((a, b) => a + b, 0);
}

function getPartTwoAnswer(grid: string[]) {
    const symbolIndices = getSymbolIndices(grid, /[*]/);
    let sumOfGearRatio = 0;
    for (const [i, j] of symbolIndices) {
        const partNumbersByLocation: Map<string, number> = new Map();
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                const response = getPartNumberWithLocation(
                    i + di,
                    j + dj,
                    grid
                );
                if (response == null) continue;
                const { location, partNumber } = response;
                partNumbersByLocation.set(location, partNumber);
            }
        }
        if (partNumbersByLocation.size !== 2) continue;
        const gearRatio = [...partNumbersByLocation.values()].reduce(
            ...multiplying()
        );
        sumOfGearRatio += gearRatio;
    }
    return sumOfGearRatio;
}

function getPartNumberWithLocation(i: number, j: number, grid: string[]) {
    const hasReachedEnd =
        i < 0 || i >= grid.length || j < 0 || j >= grid[0].length;
    if (hasReachedEnd) {
        return null;
    }
    if (!isDigit(grid[i][j])) return null;
    let start = j;
    while (start > 0 && isDigit(grid[i][start - 1])) start--;
    let end = j;
    const upperLimit = grid[i].length - 1;
    while (end < upperLimit && isDigit(grid[i][end + 1])) end++;
    const location = `${i}-${start}-${end}`;
    const partNumber = parseInt(grid[i].slice(start, end + 1));
    return { location, partNumber };
}

function getSymbolIndices(grid: string[], symbolRegex: RegExp) {
    const symbolIndices: [number, number][] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (symbolRegex.test(grid[i][j])) {
                symbolIndices.push([i, j]);
            }
        }
    }
    return symbolIndices;
}
