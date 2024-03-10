export function preventDuplicateFetch(): typeof fetch{
    let prev: Parameters<typeof fetch>[0] | null = null

    return (...args: Parameters<typeof fetch>) => {
        return new Promise((resolve, reject) => {
            if (prev !== null && deepEqual(args[0], prev)) {
                reject(new Error('skipped'))
                return
            }

            prev = args[0]
            fetch(...args)
                .then(resolve)
                .catch(reject)
        }) as ReturnType<typeof fetch>
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj1);

    const protoProps1 = Object.getOwnPropertyNames(Object.getPrototypeOf(obj1))
    const protoProps2 = Object.getOwnPropertyNames(Object.getPrototypeOf(obj2))

    if (keysObj1.length !== keysObj2.length || protoProps1.length != protoProps2.length) {
        return false;
    }

    for (const key of [...keysObj1, ...protoProps1]) {
        if (!(keysObj2.includes(key) || protoProps2.includes(key)) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}