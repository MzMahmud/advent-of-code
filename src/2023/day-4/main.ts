import { summing } from "../../util/functions";
import { isNonEmpty, readLines } from "../../util/string";
const cardInputs = readLines("input.txt").map((s) => s.trim());
// const cardInputs = readLines("example.txt").map((s) => s.trim());

const partOneAnswer = getPartOneAnswer(cardInputs);
console.warn({ partOneAnswer });

const partTwoAnswer = getPartTwoAnswer(cardInputs);
console.warn({ partTwoAnswer });

function getPartOneAnswer(cardInputs: string[]) {
    return cardInputs
        .map(parseInput)
        .map(({ winningCards, ownCards }) =>
            calculatePoints(winningCards, ownCards)
        )
        .reduce(...summing());
}

function calculatePoints(winningCards: Set<number>, ownCards: Set<number>) {
    const winningNumbers = setIntersection(winningCards, ownCards);
    if (winningNumbers.size === 0) return 0;
    return Math.pow(2, winningNumbers.size - 1);
}

function getPartTwoAnswer(cardInputs: string[]) {
    const cardCounts = Array.from({ length: cardInputs.length }, () => 1);
    for (let cardIndex = 0; cardIndex < cardCounts.length; cardIndex++) {
        const { winningCards, ownCards } = parseInput(cardInputs[cardIndex]);
        const winningNumbers = setIntersection(winningCards, ownCards);
        for (let i = 1; i <= winningNumbers.size; i++) {
            if (cardIndex + i < cardCounts.length) {
                cardCounts[cardIndex + i] += cardCounts[cardIndex];
            }
        }
    }
    return cardCounts.reduce(...summing());
}

function parseInput(cards: string) {
    const [winning, own] = cards.split(": ")[1].split(" | ");
    const winningCards = new Set(
        winning.split(/\s+/).filter(isNonEmpty).map(Number)
    );
    const ownCards = new Set(own.split(/\s+/).filter(isNonEmpty).map(Number));
    return { winningCards, ownCards };
}

function setIntersection(a: Set<number>, b: Set<number>) {
    const result = new Set<number>();
    for (const ai of a) {
        if (b.has(ai)) {
            result.add(ai);
        }
    }
    return result;
}
