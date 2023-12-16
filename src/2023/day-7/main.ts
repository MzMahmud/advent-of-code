import { readLines } from "../../util/string";
import {
    CardInfo,
    GameHand,
    compareCard,
    compareCardWithJoker,
    findHandType,
    findHandTypeWithJoker,
} from "./types";

// const partOneAnswer = getPartOneAnswer("example.txt");
// // const partOneAnswer = getPartOneAnswer("input.txt");
// console.warn({ partOneAnswer });

// const partTwoAnswer = getPartTwoAnswer("example.txt");
const partTwoAnswer = getPartTwoAnswer("input.txt");
console.warn({ partTwoAnswer });

function getPartOneAnswer(fileName: string) {
    const gameHands = readLines(fileName).map((line) => {
        const [hand, bid] = line.split(" ");
        const cardInfo: CardInfo = {
            hand,
            handType: findHandType(hand),
        };
        return { cardInfo, bid: Number(bid) };
    });
    return gameHands
        .sort((a, b) => compareCard(a.cardInfo, b.cardInfo))
        .reduce((score, gameHand, i) => score + gameHand.bid * (i + 1), 0);
}

function getPartTwoAnswer(fileName: string) {
    const gameHands = readLines(fileName).map((line) => {
        const [hand, bid] = line.split(" ");
        const cardInfo: CardInfo = {
            hand,
            handType: findHandTypeWithJoker(hand),
        };
        return { cardInfo, bid: Number(bid) };
    });
    return gameHands
        .sort((a, b) => compareCardWithJoker(a.cardInfo, b.cardInfo))
        .reduce((score, gameHand, i) => score + gameHand.bid * (i + 1), 0);
}
