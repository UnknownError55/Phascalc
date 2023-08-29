export function classNames(classes: { [k: string]: boolean }) {
    return Object.entries(classes)
        .filter(([_key, value]) => value)
        .map(([key, _value]) => key)
        .join(' ');
}