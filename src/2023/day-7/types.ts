const HAND_TYPE_POINTS = {
    HIGH_CARD: 1,
    ONE_PAIR: 2,
    TWO_PAIR: 3,
    THREE_OF_A_KIND: 4,
    FULL_HOUSE: 5,
    FOUR_OF_A_KIND: 6,
    FIVE_OF_A_KIND: 7,
} as const;

export type HandType = keyof typeof HAND_TYPE_POINTS;

const CARD_TYPE_POINTS = {
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13,
} as const;

const CARD_TYPE_POINTS_JOKER = {
    J: 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    T: 9,
    Q: 11,
    K: 12,
    A: 13,
} as const;

export type CardType = keyof typeof CARD_TYPE_POINTS;

export type CardInfo = {
    hand: string;
    handType: HandType;
};

export type GameHand = {
    cardInfo: CardInfo;
    bid: number;
};

export function compareCard(a: CardInfo, b: CardInfo): number {
    if (a.hand === b.hand) return 0;
    if (a.handType !== b.handType) {
        return Math.sign(
            HAND_TYPE_POINTS[a.handType] - HAND_TYPE_POINTS[b.handType]
        );
    }
    for (let i = 0; i < a.hand.length; i++) {
        const cmp = Math.sign(
            CARD_TYPE_POINTS[a.hand[i] as CardType] -
                CARD_TYPE_POINTS[b.hand[i] as CardType]
        );
        if (cmp !== 0) return cmp;
    }
    return 0;
}

export function compareCardWithJoker(a: CardInfo, b: CardInfo): number {
    if (a.hand === b.hand) return 0;
    if (a.handType !== b.handType) {
        return Math.sign(
            HAND_TYPE_POINTS[a.handType] - HAND_TYPE_POINTS[b.handType]
        );
    }
    for (let i = 0; i < a.hand.length; i++) {
        const cmp = Math.sign(
            CARD_TYPE_POINTS_JOKER[a.hand[i] as CardType] -
                CARD_TYPE_POINTS_JOKER[b.hand[i] as CardType]
        );
        if (cmp !== 0) return cmp;
    }
    return 0;
}

export function findHandType(hand: string): HandType {
    const cardCount = new Map<string, number>();
    for (const card of hand) {
        cardCount.set(card, (cardCount.get(card) ?? 0) + 1);
    }
    return findhandTypeBasedOnCounts(cardCount);
}

function findhandTypeBasedOnCounts(cardCount: Map<string, number>) {
    const countToCards = [...cardCount.entries()].reduce(
        (map, [card, count]) => {
            const group = map.get(count) ?? [];
            group.push(card);
            map.set(count, group);
            return map;
        },
        new Map<number, string[]>()
    );
    if (countToCards.has(5)) {
        return "FIVE_OF_A_KIND";
    }
    if (countToCards.has(4)) {
        return "FOUR_OF_A_KIND";
    }
    if (countToCards.has(3)) {
        return countToCards.has(2) ? "FULL_HOUSE" : "THREE_OF_A_KIND";
    }
    if (countToCards.has(2)) {
        return countToCards.get(2)!.length === 2 ? "TWO_PAIR" : "ONE_PAIR";
    }
    return "HIGH_CARD";
}

export function findHandTypeWithJoker(hand: string): HandType {
    const cardCount = new Map<string, number>();
    for (const card of hand) {
        const count = (cardCount.get(card) ?? 0) + 1;
        cardCount.set(card, count);
    }
    if (!cardCount.has("J")) return findhandTypeBasedOnCounts(cardCount);

    const cardCounts = [...cardCount.entries()].sort((a, b) => b[1] - a[1]);
    let maxCard: string | null = null;
    for (const [card, count] of cardCounts) {
        if (card !== "J") {
            maxCard = card;
            break;
        }
    }
    if (maxCard != null) {
        cardCount.set(maxCard, cardCount.get(maxCard)! + cardCount.get("J")!);
        cardCount.delete("J");
    }
    return findhandTypeBasedOnCounts(cardCount);
}
