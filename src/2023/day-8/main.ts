import { readFile } from "../../util/string";

// const { instructions, nodes } = parseInput("example.txt");
// const { instructions, nodes } = parseInput("input.txt");
// const partOneAnswer = getPartOneAnswer(instructions, nodes);
// console.warn({ partOneAnswer });

// const { instructions, nodes } = parseInput("example.txt");
const { instructions, nodes } = parseInput("input.txt");
const partTwoAnswer = getPartTwoAnswer(instructions, nodes);
console.warn({ partTwoAnswer });

function getPartOneAnswer(
    instructions: string,
    nodes: Map<string, Record<string, string>>
) {
    return calculateSteps(instructions, nodes, "AAA", /ZZZ/);
}

function calculateSteps(
    instructions: string,
    nodes: Map<string, Record<string, string>>,
    startState: string,
    endRegex: RegExp
) {
    let start = startState;
    let steps = 0;
    for (; !endRegex.test(start); steps++) {
        const dir = instructions[steps % instructions.length];
        start = nodes.get(start)![dir];
    }
    return steps;
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
    return (a / gcd(a, b)) * b;
}

function getPartTwoAnswer(
    instructions: string,
    nodes: Map<string, Record<string, string>>
) {
    return [...nodes.keys()]
        .filter((src) => RegExp(".*A$").test(src))
        .map((src) => calculateSteps(instructions, nodes, src, RegExp(".*Z$")))
        .reduce(lcm);
}

function parseInput(fileName: string) {
    const [instructions, net] = readFile(fileName)
        .replace(/\r/g, "")
        .split("\n\n");
    const nodes = new Map(
        net.split("\n").map((line) => {
            const [src, dsts] = line.split(" = ");
            const ins = dsts.replace(/[()]/g, "").split(", ");
            return [src, { L: ins[0], R: ins[1] } as Record<string, string>];
        })
    );
    return { instructions, nodes };
}
