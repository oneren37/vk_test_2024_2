import {debounce, preventDuplicateFetch} from "../../shared";
import {IAge} from "./types.ts";

function AgeDTO(data:(IAge & {[key: string]: unknown})): IAge {
    return {
        age: data.age
    }
}

const fetchPrevented = preventDuplicateFetch()

export const fetchAge = debounce(async (name: string, signal?: AbortController['signal']): Promise<IAge> => {
    const url = new URL('https://api.agify.io/')
    url.searchParams.set('name', name);

    return fetchPrevented(url, {signal})
        .then(res => {
            if (res.status === 200) return res
            throw new Error()
        })
        .then(res => res.json())
        .then(res => AgeDTO(res))
}, 200)
