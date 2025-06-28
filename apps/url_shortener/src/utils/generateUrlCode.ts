import { nanoid } from 'nanoid';

export function generateUrlCode(): string {
    return nanoid(4);
}

export function generateSuffixCode(): string {
    return nanoid(3);
}
