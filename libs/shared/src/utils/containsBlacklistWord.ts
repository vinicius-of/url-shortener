import blacklist from '../config/blacklist.json';

export function containsBlacklistWord(value: string): string | undefined {
    return blacklist.find(term => new RegExp(term, 'i').test(value));
}
