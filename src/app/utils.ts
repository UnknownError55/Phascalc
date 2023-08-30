export function classNames(classes: { [k: string]: boolean }) {
    return Object.entries(classes)
        .filter(([_key, value]) => value)
        .map(([key, _value]) => key)
        .join(' ');
}

export function set_diff<T>(superset: T[], subset: T[]): T[] {
    return superset.filter(x => !subset.includes(x));
}
