import {Button, Div, Spacing, Textarea} from "@vkontakte/vkui";
import {Ref, useEffect, useRef, useState} from "react";
import {fetchFact} from "./api.ts";
import {LoadingState} from "./types.ts";
import {setCursorAfterFirstWord} from "./utils/setCursorAfterFirstWord.ts";

const GetFact = () => {
    const [fact, setFact] = useState<string>('')
    const [loadingState, setLoadingState] = useState<LoadingState>('idle')
    const textareaRef = useRef<HTMLTextAreaElement>()

    const handleGetFact = () => {
        setLoadingState('loading')
        fetchFact()
            .then(r => {
                setFact(r.fact)
                setLoadingState('ok')
            })
    }

    useEffect(() => {
        switch (loadingState) {
            case 'loading': setFact('Факт загружается ... '); break;
            case 'failed': setFact('Не удалось загрузить факт'); break;
        }
    }, [loadingState])

    useEffect(() => {
        if (loadingState === 'ok') {
            textareaRef.current && setCursorAfterFirstWord(textareaRef.current)
        }
    }, [fact, loadingState]);

    return (
        <Div>
            <Textarea placeholder="Hit the button to get fact" value={fact} getRef={textareaRef as Ref<HTMLTextAreaElement>}/>
            <Spacing size={10}></Spacing>
            <Button onClick={handleGetFact}>Получить факт</Button>
        </Div>
    )
}

export default GetFact