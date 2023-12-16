import { minNumber } from "../../util/functions";
import { readFile } from "../../util/string";

// const { seeds, mapsSortedBySrc } = parseInput("example.txt");
const { seeds, mapsSortedBySrc } = parseInput("input.txt");

const partOneAnswer = getPartOneAnswer(seeds, mapsSortedBySrc);
console.warn({ partOneAnswer }); // 600279879

// Note current implementation of part 2 is very slow. Need to optimize it.
// Hint: Interval intersection.
// const partTwoAnswer = getPartTwoAnswer(seeds, mapsSortedBySrc);
// console.warn({ partTwoAnswer }); // 20191102

function getPartOneAnswer(seeds: number[], mapsSortedBySrc: MapRange[][]) {
    return seeds
        .map((seed) => findLocation(seed, mapsSortedBySrc))
        .reduce(...minNumber());
}

function findLocation(src: number, mapsSortedBySrc: MapRange[][]) {
    return mapsSortedBySrc.reduce(findDestination, src);
}

function findDestination(src: number, mapsSortedBySrc: MapRange[]) {
    for (const mapRange of mapsSortedBySrc) {
        const start = mapRange.src;
        const end = mapRange.src + mapRange.len - 1;
        if (start <= src && src <= end) {
            return mapRange.dst + src - start;
        }
    }
    return src;
}

function getPartTwoAnswer(seeds: number[], mapsSortedBySrc: MapRange[][]) {
    let minLocation = Infinity;
    for (let i = 0; i < seeds.length; i += 2) {
        const start = seeds[i];
        const end = start + seeds[i + 1] - 1;
        for (let seed = start; seed <= end; seed++) {
            const location = findLocation(seed, mapsSortedBySrc);
            if (location < minLocation) {
                minLocation = location;
            }
        }
    }
    return minLocation;
}

type MapRange = {
    dst: number;
    src: number;
    len: number;
};

function parseMapRanges(input: string): MapRange[] {
    return input
        .split(":\n")[1]
        .split("\n")
        .map((line): MapRange => {
            const [dst, src, len] = line.split(" ").map(Number);
            return { dst, src, len };
        })
        .sort((a, b) => a.src - b.src);
}

function parseInput(fileName: string) {
    const fileContent = readFile(fileName).replace(/\r/g, "").split("\n\n");
    const seeds = fileContent[0].split(": ")[1].split(" ").map(Number);
    const mapsSortedBySrc = fileContent.splice(1).map(parseMapRanges);
    return { seeds, mapsSortedBySrc };
}
