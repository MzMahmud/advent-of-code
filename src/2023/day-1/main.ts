import { summing } from "../../util/functions";
import { charCode, isDigit, readLines } from "../../util/string";

const digitsSpelled = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

const stringToDigit = new Map<string, number>([
    ...digitsSpelled.map((spelling, index) => [spelling, index] as const),
    ...Array.from({ length: 10 }, (_, i) => [`${i}`, i] as const),
]);

function getNumberPartOne(line: string): number {
    let first: number | null = null;
    let last = 0;
    for (const d of line) {
        if (!isDigit(d)) {
            continue;
        }
        last = charCode(d) - charCode("0");
        if (first === null) {
            first = last;
        }
    }
    return (first ?? 0) * 10 + last;
}

function getNumberPartTwo(line: string): number {
    let firstIndex: number | null = null,
        fistNumber: number = 0;
    let lastIndex: number | null = null,
        lastNumber: number = 0;
    for (const [str, digit] of stringToDigit) {
        const i = line.indexOf(str);
        if (i !== -1 && (firstIndex == null || i < firstIndex)) {
            firstIndex = i;
            fistNumber = digit;
        }
        const j = line.lastIndexOf(str);
        if (j !== -1 && (lastIndex == null || j > lastIndex)) {
            lastIndex = j;
            lastNumber = digit;
        }
    }
    // if (firstIndex == lastIndex) lastNumber = fistNumber;
    return fistNumber * 10 + lastNumber;
}

const partOneResult = readLines("input.txt")
    .map(getNumberPartOne)
    .reduce(...summing());

console.log({ partOneResult }); // 54644

const partTwoResult = readLines("input.txt")
    .map(getNumberPartTwo)
    .reduce(...summing());

console.log({ partTwoResult }); // 53348
