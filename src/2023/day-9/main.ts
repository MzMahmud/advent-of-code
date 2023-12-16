import { readLines } from "../../util/string";
import { summing } from "../../util/functions";

// const sequences = parseInput("example.txt");
// const sequences = parseInput("input.txt");
// const partOneAnswer = getPartOneAnswer(sequences);
// console.warn({ partOneAnswer });

// const sequences = parseInput("example.txt");
const sequences = parseInput("input.txt");
const partTwoAnswer = getPartTwoAnswer(sequences);
console.warn({ partTwoAnswer });

function getPartOneAnswer(sequences: number[][]) {
    return sequences.map(calculateNextvalue).reduce(...summing());
}

function calculateNextvalue(sequence: number[]): number {
    const set = new Set(sequence);
    if (set.size === 1) {
        return sequence[0];
    }
    const diffSequence = Array.from(
        { length: sequence.length - 1 },
        (_, i) => sequence[i + 1] - sequence[i]
    );
    return sequence.at(-1)! + calculateNextvalue(diffSequence);
}

function calculatePrevValue(sequence: number[]): number {
    const set = new Set(sequence);
    if (set.size === 1) {
        return sequence[0];
    }
    const diffSequence = Array.from(
        { length: sequence.length - 1 },
        (_, i) => sequence[i + 1] - sequence[i]
    );
    return sequence.at(0)! - calculatePrevValue(diffSequence);
}

function getPartTwoAnswer(sequences: number[][]) {
    return sequences.map(calculatePrevValue).reduce(...summing());
}

function parseInput(fileName: string) {
    return readLines(fileName).map((line) => line.split(" ").map(Number));
}
