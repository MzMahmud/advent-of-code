import { readLines } from "../../util/string";

type Game = {
    gameId: number;
    cubes: Map<string, number>[];
};

const gamesStrings = readLines("input.txt");
const games = gamesStrings.map(getGameData);

const partOneAnswer = getPartOneAnswer(games);
console.warn({ partOneAnswer });

const partTwoAnswer = getPartTwoAnswer(games);
console.warn({ partTwoAnswer });

function getPartOneAnswer(games: Game[]): number {
    const totalCubes = new Map([
        ["red", 12],
        ["green", 13],
        ["blue", 14],
    ]);
    return games
        .filter((game) => isGameValid(game, totalCubes))
        .reduce((a, b) => a + b.gameId, 0);
}

function getPartTwoAnswer(games: Game[]): number {
    return games
        .map(getMinimumTotalCubes)
        .map(getPowerOfCubes)
        .reduce((a, b) => a + b, 0);
}

function getPowerOfCubes(cubes: Map<string, number>): number {
    return [...cubes.values()].reduce((a, b) => a * b, 1);
}

function getMinimumTotalCubes(game: Game) {
    return game.cubes.reduce((totalCubes, cubes) => {
        for (const [color, count] of cubes) {
            const totlaCount = totalCubes.get(color) ?? 0;
            totalCubes.set(color, Math.max(totlaCount, count));
        }
        return totalCubes;
    }, new Map<string, number>());
}

function isGameValid(game: Game, totalCubes: Map<string, number>): boolean {
    return game.cubes.every((cubes) => {
        for (const [color, count] of cubes) {
            const totalCount = totalCubes.get(color) ?? 0;
            const isCountInvalid = count < 0 || count > totalCount;
            if (isCountInvalid) return false;
        }
        return true;
    });
}

function getGameData(gameString: string): Game {
    const [gameWithId, states] = gameString.split(":");
    const gameId = parseInt(gameWithId.match(/\d+/g)![0]);
    const cubes = states.split(";").map(getCubeCountMap);
    return { gameId, cubes };
}

function getCubeCountMap(gameStateString: string) {
    const countColorPairs = gameStateString.split(",").map((s) => {
        const count = parseInt(s.match(/\d+/g)![0]);
        const color = s.match(/[a-z]+/g)![0];
        return [color, count] as const;
    });
    return new Map<string, number>(countColorPairs);
}
