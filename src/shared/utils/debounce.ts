
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => Promise<any>>(fn: F, delay: number): (...args: Parameters<F>) => ReturnType<F> {
    let timeout: ReturnType<typeof setTimeout> | null = null
    let controller: AbortController|null = null

    return (...args: Parameters<F>) => {
        const executor = async (
            resolve: (value: ReturnType<F>) => void,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reject: (reason?: any) => void
        ): Promise<void> => {
            controller = new AbortController()

            try { resolve(await fn(...args, controller.signal)) }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (err: any) { if (err && err.name !== 'AbortError') reject(err) }
        }

        controller && controller.abort()

        if (!timeout) {
            timeout = setTimeout(() => {timeout = null}, delay);
            return new Promise<ReturnType<F>>(executor) as ReturnType<F>;
        }

        clearTimeout(timeout);
        return new Promise<ReturnType<F>>((resolve, reject) => {
            timeout = setTimeout(() => {
                timeout = null
                executor(resolve, reject)
            }, delay);
        })as ReturnType<F>;
    }
}

