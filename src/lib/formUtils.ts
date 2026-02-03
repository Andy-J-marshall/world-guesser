export function parseFormGuess(event: React.FormEvent<HTMLFormElement>): string {
    const target = event.target as typeof event.target & {
        0: { value: string };
    };
    return target[0].value.toLowerCase().trim();
}
