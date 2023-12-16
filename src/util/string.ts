import { readFileSync } from "fs";

export function readLines(path: string): string[] {
    return readFileSync(path, "utf8").split("\n");
}

export function readFile(path: string): string {
    return readFileSync(path, "utf8");
}

export function charCode(char: string) {
    return char.charCodeAt(0);
}

export function isDigit(char: string) {
    return /[0-9]/.test(char);
}

export function isEmpty(s: string) {
    return s.length === 0;
}

export function isNonEmpty(s: string) {
    return s.length > 0;
}
