import { multiplying } from "../../util/functions";
import { isNonEmpty, readLines } from "../../util/string";

const raceInfos = parseInput("example.txt");

const partOneAnswer = getPartOneAnswer(raceInfos);
console.warn({ partOneAnswer });

function getPartOneAnswer(raceInfos: RaceInfo[]) {
    return raceInfos.map(calculateRaceWinWays).reduce(...multiplying());
}

function calculateRaceWinWays(raceInfo: RaceInfo) {
    let winWays = 0;
    for (let i = 0; i < raceInfo.time; i++) {
        const dist = i * (raceInfo.time - i);
        if (dist > raceInfo.bestDistance) {
            winWays++;
        }
    }
    return winWays;
}

type RaceInfo = {
    time: number;
    bestDistance: number;
};

function parseInput(fileName: string): RaceInfo[] {
    const [ts, ds] = readLines(fileName);
    const times = ts.split(": ")[1].split(/\s+/).filter(isNonEmpty).map(Number);
    const dists = ds.split(": ")[1].split(/\s+/).filter(isNonEmpty).map(Number);
    return Array.from({ length: times.length }, (_, i) => ({
        time: times[i],
        bestDistance: dists[i],
    }));
}
