export function summing() {
    return [(a: number, b: number) => a + b, 0] as const;
}

export function multiplying() {
    return [(a: number, b: number) => a * b, 1] as const;
}

export function minNumber() {
    return [(a: number, b: number) => Math.min(a, b), Infinity] as const;
}
