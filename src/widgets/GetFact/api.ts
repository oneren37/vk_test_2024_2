import {IFact} from "./types.ts";
import {debounce} from "../../shared";

function FactDTO(data:(IFact & {[key: string]: unknown})): IFact {
    return {
        fact: data.fact
    }
}

export const fetchFact = debounce(async (signal?: AbortController['signal']): Promise<IFact> => {
    return fetch('https://catfact.ninja/fact', {signal})
        .then(res => {
            if (res.status === 200) return res
            throw new Error()
        })
        .then(res => res.json())
        .then(res => FactDTO(res))
}, 200)
