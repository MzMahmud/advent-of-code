export function summing() {
    return [(a: number, b: number) => a + b, 0] as const;
}

export function multiplying() {
    return [(a: number, b: number) => a * b, 1] as const;
}
